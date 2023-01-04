import produce from 'immer';
import { StoreSlice } from './useRoot';
import { USER, USER_STORE } from 'src/core/infrastructure/api/models/user/user';

const initialUser: USER = {
    auth: {
        token: '',
        refreshToken: '',
        isAuthenticated: false,
    },
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
    updateLanguage: (language) => {
        set((state) =>
            produce(state, (draft) => {
                draft.user.language = language;
            })
        );
    },
    updateMinimalAdress: (adress) => {
        set((state) =>
            produce(state, (draft) => {
                draft.user.data.adress = adress;
                draft.user.data.hasMinimalAdress = true;
            })
        );
    },
    login: (response) => {
        set((state) =>
            produce(state, (draft) => {
                draft.user.auth = {
                    ...response,
                    isAuthenticated: true,
                };
            })
        );
    },
    logout: () => {
        set((state) =>
            produce(state, (draft) => {
                draft.user = initialUser;
            })
        );
    },
});
