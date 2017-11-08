import { ObStore } from '../src/ObStore'
import { StoreSchema, storeSchema } from './schema'
import { ObStoreItem } from '../src/ObStore.item'
/**
 * Dummy test
 */
describe('ObStore test', () => {
  const { store } = new ObStore<StoreSchema>(storeSchema as any)
  const numberStore = store.number
  it('ObStore is instantiable', () => {
    expect(numberStore).toBeInstanceOf(ObStoreItem)
  })

  it("Options 'default' is working", () => {
    numberStore.subscribe(v => {
      expect(v).toEqual(1)
      expect(numberStore.value).toEqual(1)
    })
  })
})
