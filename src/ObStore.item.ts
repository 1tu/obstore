import { Subscription } from 'rxjs'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/operator/debounceTime'

import { IObStoreOptions, IObStoreSchema, ObStoreStore } from './ObStore.types'

const LOCALSTORAGE_PREFIX = 'ObStore/'

export class ObStoreItem<
  S extends IObStoreSchema,
  V = S[keyof S]['value'],
  P = S[keyof S]['params']
> {
  public value: V
  public obs: Observable<V | any[]>

  public params: P
  public obsParams: Observable<P>

  private _subject: ReplaySubject<V>
  private _subjectParams: ReplaySubject<P>
  private _lastSetterId: number = 0
  private _transformer: (value: V | P) => Promise<V>

  constructor(
    public name: keyof S,
    private _store: ObStoreStore<S>,
    private _opts: IObStoreOptions<S> = {}
  ) {
    this._subject = new ReplaySubject<V>(this._opts.bufferSize || 1)
    this.obs = this._subject.asObservable()
    this._handleOpts()
    // this._store[name] = this;
  }

  public subscribe(
    next?: (value: V) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return this.obs.subscribe(next, error, complete)
  }

  public async set(value: Partial<P | V>) {
    if (!this._opts) return
    if (this._opts.depsOn) {
      return
    }
    const setterId = ++this._lastSetterId
    if (this._transformer) {
      this.params = { ...(this.params as any), ...(value as any) }
      this._subjectParams.next(this.params)
      try {
        value = await this._transformer(this.params)
      } catch (error) {
        return console.error(error)
      }
    }

    // устанавливаем новое только если это последний вызов (setterId) на момент исполнения (this._lastSetterId)
    if (setterId === this._lastSetterId) {
      if (this._opts.localstorage) {
        localStorage.setItem(
          LOCALSTORAGE_PREFIX + this.name,
          JSON.stringify(value)
        )
      }
      this.value = value as V
      this._subject.next(this.value)
      // TODO: сделать ленивый interval
      if (this._opts.interval) {
        setTimeout(() => {
          this.repeat()
        }, this._opts.interval)
      }
    }
  }

  public repeat(): void {
    this.set(this.params !== null ? this.params : this.value)
  }

  public updateOpts(opts: IObStoreOptions<S>): void {
    if (this._opts) {
      return
    }
    this._opts = opts
    this._handleOpts()
  }

  private _handleOpts(): void {
    if (!this._opts) {
      return
    }

    this._opts.transformer && (this._transformer = this._opts.transformer)

    if (this._opts.depsOn) {
      this.obs = Observable.combineLatest(
        this._opts.depsOn.map(
          prop =>
            Array.isArray(prop)
              ? this._store[prop[0]][prop[1]]
              : this._store[prop].obs
        )
      )
      this._subject = null as any
      if (this._transformer) {
        this.obs = this.obs.flatMap(async (data: any) =>
          this._transformer(data)
        )
      }
      return
    }
    if (this._opts.params) {
      this.params = this._opts.params
    }

    if (this._transformer && !this._subjectParams) {
      this._subjectParams = new ReplaySubject(this._opts.bufferSize || 1)
      this.obsParams = this._subjectParams.asObservable()
      if (this._opts.debounceTime) {
        this.obsParams = this.obsParams.debounceTime(this._opts.debounceTime)
      }
      if (this.params) {
        this._subjectParams.next(this.params)
      }
    }

    if (this._opts.debounceTime) {
      this.obs = this.obs.debounceTime(this._opts.debounceTime)
    }

    const storedValue = this._opts.localstorage
      ? JSON.parse(
          localStorage.getItem(LOCALSTORAGE_PREFIX + this.name) || 'null'
        )
      : null

    if (storedValue !== null) {
      this.set(storedValue)
    } else if (this._opts.default) {
      this.set(this._opts.default as any)
    }

    if (this._opts.interval) {
      setTimeout(() => {
        this.repeat()
      }, this._opts.interval)
    }
    if (this._opts.runOnInit) {
      this.repeat()
    }
  }
}
