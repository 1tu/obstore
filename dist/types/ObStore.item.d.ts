import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import { IObStoreOptions, IObStoreSchema, ObStoreStore } from './ObStore.types';
export declare class ObStoreItem<S extends IObStoreSchema, V = S[keyof S]['value'], P = S[keyof S]['params']> {
    name: keyof S;
    private _store;
    private _opts;
    value: V;
    obs: Observable<V | any[]>;
    params: P;
    obsParams: Observable<P>;
    private _subject;
    private _subjectParams;
    private _lastSetterId;
    private _transformer;
    constructor(name: keyof S, _store: ObStoreStore<S>, _opts?: IObStoreOptions<S>);
    subscribe(next?: (value: V) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    set(value: Partial<P | V>): Promise<void>;
    repeat(): void;
    updateOpts(opts: IObStoreOptions<S>): void;
    private _handleOpts();
}
