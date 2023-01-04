import { COUNTRY, LANGUAGE } from 'src/core/logic/language';
import { AUTHENTIFICATION } from '../auth/auth';

interface CARRIER {
    id: number;
    carrier_id: number;
    name: string;
    address1?: string | null;
    address2?: string | null;
    availabilities?: any[];
    city?: string | null;
    days: {
        d1: number;
        d2: number;
        d3: number;
        d4: number;
        d5: number;
        d6: number;
        d7: number;
    };
    delay: string;
    delivery_end: string;
    delivery_start: string;
    distance?: number | null;
    lat: string;
    lng: string;
    postcodes: string[];
}

type RESPONSE = {
    data: {
        carriers: CARRIER[];
        datesRange: [
            {
                start: string;
                end: string;
            }
        ];
        markers: CARRIER[];
        postCode: string;
        startOrderableDate: string;
    };
    success: boolean;
};

export type DELIVERY_MODE = 'home' | 'collection-point';

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
