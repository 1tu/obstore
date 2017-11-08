import { ObStoreService } from './ObStore.service'
import { IObStoreSchema, ObStoreStore, IObStoreOptions } from './ObStore.types'
import { ObStoredDecoratorFabric } from './ObStore.decorator'

export class ObStore<S extends IObStoreSchema> {
  public decorator: (propName?: keyof S, opts?: IObStoreOptions<S>) => any
  public store: ObStoreStore<S>

  private _service: ObStoreService<S>

  constructor(schema: S) {
    this._service = new ObStoreService<S>(schema)
    this.store = this._service.store
    this.decorator = ObStoredDecoratorFabric(this._service)
  }
}
