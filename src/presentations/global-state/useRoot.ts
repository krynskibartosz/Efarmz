import create, { GetState, State } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { userSlice } from './user';
import { shoppingCartSlice } from './shopping';

type SetState<T extends State> = {
    _(
        partial: T | Partial<T> | ((state: T) => T | Partial<T>),
        replace?: boolean | undefined
    ): void;
    actionName?: string;
}['_'];

export type StoreSlice<T extends object, E extends object = T> = (
    set: SetState<E extends T ? E : E & T>,
    get: GetState<E extends T ? E : E & T>
) => T;

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
    ...shoppingCartSlice(set, get),
    ...userSlice(set, get),
});

const useRootStore = create(
    devtools(persist(createRootSlice, { name: 'root' }))
);

export default useRootStore;
