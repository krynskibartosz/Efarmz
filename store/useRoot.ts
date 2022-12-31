import create, { SetState, GetState } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { shoppingCartSlice } from './shoppingCart';
import { userSlice } from './user';

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
