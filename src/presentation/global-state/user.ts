import produce from 'immer';
import { StoreSlice } from './useRoot';
import { USER, USER_STORE } from 'src/core/domains/models/user/mod_user';
import { updateUserAdress } from 'src/core/usecases/user/action';

export const initialUser: USER = {
    language: 'fr',
    data: {
        adress: {
            country: 'Belgique',
            deliveryMode: 'home',
            deliveryDate: '',
            zipCode: null,
        },
        hasMinimalAdress: false,
    },
};

export const userSlice: StoreSlice<USER_STORE> = (set) => ({
    user: initialUser,
    updateMinimalAdress: (adress) => {
        set((state) =>
            produce(state, (draft) => {
                updateUserAdress(draft.user.data, adress);
            })
        );
    },
});