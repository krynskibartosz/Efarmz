import { ACTIONS } from '../../../../presentations/global-state/actions/mod_user';
import { COUNTRY } from '../../logic/mod_language';

export type DELIVERY_MODE = 'home' | 'collection-point';

export type ADRESS = {
    country: COUNTRY;
    zipCode: number | null;
    deliveryMode: DELIVERY_MODE;
    deliveryDate: string;
};

export type USER_DATA = {
    adress: ADRESS;
    hasMinimalAdress: boolean;
};

export type USER = {
    data: USER_DATA;
};
export type USER_STORE = {
    user: USER;
} & ACTIONS;
