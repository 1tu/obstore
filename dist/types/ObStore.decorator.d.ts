import { IObStoreOptions, IObStoreSchema } from './ObStore.types';
import { ObStoreService } from './ObStore.service';
export declare function ObStoredDecoratorFabric<S extends IObStoreSchema>(ObStoreService: ObStoreService<S>): (propName?: (keyof S) | undefined, opts?: IObStoreOptions<S, S[keyof S]["value"], S[keyof S]["params"]> | undefined) => (target: any, key: string | (keyof S)) => void;
