import { IObStoreSchema, ObStoreSchema } from '../src/obstore.types'

export interface StoreSchema extends IObStoreSchema {
  number: { value: number }
  string: { value: string }
  stringArray: { value: string[] }
}

export const storeSchema: ObStoreSchema<StoreSchema> = {
  number: { default: 1 },
  string: { default: '' },
  stringArray: { default: [] }
}
