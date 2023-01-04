import { COUNTRY, LANGUAGE } from 'src/core/logic/language';

export type DELIVERY_MODE = 'home' | 'collection-point';

export type AUTHENTIFICATION = {
    token: string;
    refreshToken: string;
};

export type ADRESS = {
    country: COUNTRY;
    zipCode: number | null;
    deliveryMode: DELIVERY_MODE;
    deliveryDate: string;
};

export type USER = {
    auth: AUTHENTIFICATION & { isAuthenticated: boolean };
    data: {
        adress: ADRESS;
        hasMinimalAdress: boolean;
    };
    language: LANGUAGE;
};
export type USER_STORE = {
    user: USER;
} & ACTIONS;

// todo: Action type should go to another folder
export type ACTIONS = {
    updateLanguage: (language: LANGUAGE) => void;
    updateMinimalAdress: (adress: ADRESS) => void;
    login: (reponse: AUTHENTIFICATION) => void;
    logout: () => void;
};
