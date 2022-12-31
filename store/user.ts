import produce from 'immer';
import { StoreSlice } from './useRoot';

type LANGUAGE = 'fr' | 'nl';

type AUTHENTIFICATION = {
    token: string;
    refreshToken: string;
};

type ADRESS = {
    country: 'Belgique' | 'Luxembourg';
    zipCode: number | null;
    deliveryMode: 'home' | 'collection-point';
    deliveryDate: string;
};

type USER = {
    auth: AUTHENTIFICATION & { isAuthenticated: boolean };
    data: {
        adress: ADRESS;
        hasMinimalAdress: boolean;
    };
    language: LANGUAGE;
};

type USER_STORE = {
    user: USER;
    updateLanguage: (language: LANGUAGE) => void;
    updateMinimalAdress: (adress: ADRESS) => void;
    login: (reponse: AUTHENTIFICATION) => void;
    logout: () => void;
};

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
