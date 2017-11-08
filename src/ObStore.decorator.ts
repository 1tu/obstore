import { IObStoreOptions, IObStoreSchema } from './ObStore.types'
import { ObStoreService } from './ObStore.service'
import { ObStoreItem } from './ObStore.item'

// косяк декоратора в том, что он парсится раньше, чем становится доступеным приложение
// сервисы ижектятся позже, поэтому нельзя полностью проинициализировать стор, т.к. он может зависить от сервисов

export function ObStoredDecoratorFabric<S extends IObStoreSchema>(
  ObStoreService: ObStoreService<S>
) {
  return function(propName?: keyof S, opts?: IObStoreOptions<S>) {
    return (target: any, key: string | keyof S) => {
      const prop = propName || key
      target[key] = ObStoreService.store[prop]
    }
  }
}
