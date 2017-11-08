import { ObStoreSchema, IObStoreSchema, ObStoreStore } from './ObStore.types';
export declare class ObStoreService<S extends IObStoreSchema> {
    store: ObStoreStore<S>;
    private _isSettedFromData;
    constructor(schema: ObStoreSchema<S>);
}
