import { Subscription, Observable } from 'rxjs'
import { PartialObserver } from 'rxjs/Observer'
import { ObStoreItem } from './ObStore.item'

export interface IObStoreSchema {
  [prop: string]: { value: any; params?: any }
}

export interface IObStoreOptions<
  S extends IObStoreSchema,
  V = S[keyof S]['value'],
  P = S[keyof S]['params']
> {
  default?: V
  params?: P
  runOnInit?: boolean
  transformer?: (value: P | V) => Promise<V>

  depsOn?: Array<keyof S | [keyof S, 'obs' | 'obsParams']>
  localstorage?: boolean
  bufferSize?: number
  debounceTime?: number
  interval?: number
}
export type ObStoreSchema<S extends IObStoreSchema> = {
  [K in keyof S]: IObStoreOptions<S, S[K]['value'], S[K]['params']>
}

export type ObStoreStore<S extends IObStoreSchema> = {
  [K in keyof S]: ObStoreItem<S>
}
