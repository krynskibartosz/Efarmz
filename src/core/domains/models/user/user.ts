import { ACTIONS } from '../../../../presentation/global-state/actions/user';
import { COUNTRY, LANGUAGE } from '../../logic/language';

export type DELIVERY_MODE = 'home' | 'collection-point';

export type ADRESS = {
    country: COUNTRY;
    zipCode: number | null;
    deliveryMode: DELIVERY_MODE;
    deliveryDate: string;
};

export type USER = {
    data: {
        adress: ADRESS;
        hasMinimalAdress: boolean;
    };
    language: LANGUAGE;
};
export type USER_STORE = {
    user: USER;
} & ACTIONS;
