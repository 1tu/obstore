import {
  ObStoreSchema,
  IObStoreSchema,
  ObStoreStore,
  IObStoreOptions
} from './ObStore.types'
import { ObStoreItem } from './ObStore.item'

export class ObStoreService<S extends IObStoreSchema> {
  public store: ObStoreStore<S> = {} as any
  private _isSettedFromData: boolean = false

  constructor(schema: ObStoreSchema<S>) {
    Object.keys(schema).forEach(key => {
      const opts = schema[key]
      const ObStore = this.store[key]
      // tslint:disable-next-line:no-unused-expression
      this.store[key] = new ObStoreItem<S>(key, this.store, opts)
      // if (!ObStore) new ObStoreItem<S>(key, opts);
      // else ObStore.updateOpts(opts);
    })
  }

  // public setSchema(schema: ObStoreSchema<S>) {
  //   if (this._isSettedFromData) { return; }
  //   Object.keys(schema).forEach(key => {
  //     const opts = schema[key];
  //     const ObStore = this.store[key];
  //     // tslint:disable-next-line:no-unused-expression
  //     if (!ObStore) new ObStoreItem<S>(key, opts);
  //     else ObStore.updateOpts(opts);
  //   });
  //   this._isSettedFromData = true;
  // }

  // public getObStore(key: keyof S, opts?: IObStoreOptions<S>): ObStoreItem<S> {
  //   // tslint:disable-next-line:no-unused-expression
  //   if (!this.store[key]) new ObStoreItem<S>(key, opts);
  //   return this.store[key];
  // }
}
