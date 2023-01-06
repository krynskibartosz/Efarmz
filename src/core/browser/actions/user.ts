import { LANGUAGE } from 'src/core/domains/logic/language';
import { ADRESS } from '../../domains/models/user/user';

export type ACTIONS = {
    updateLanguage: (language: LANGUAGE) => void;
    updateMinimalAdress: (adress: ADRESS) => void;
    logout: () => void;
};
