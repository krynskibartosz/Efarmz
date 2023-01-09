import produce from 'immer';
import { StoreSlice } from './useRoot';
import { USER, USER_STORE } from 'src/core/domains/models/user/mod_user';
import { updateUserAdress } from 'src/core/usecases/user/user-action';

export const initialUser: USER = {
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
        set(
            produce((state) => {
                state.user.data = updateUserAdress(state.user.data, adress);
            })
        );
    },
});
