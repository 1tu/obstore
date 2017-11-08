import { IObStoreSchema, ObStoreStore, IObStoreOptions } from "./ObStore.types";
export declare class ObStore<S extends IObStoreSchema> {
    decorator: (propName?: keyof S, opts?: IObStoreOptions<S>) => any;
    store: ObStoreStore<S>;
    private _service;
    constructor(schema: S);
}
