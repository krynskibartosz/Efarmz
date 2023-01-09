import produce from 'immer';
import { ADRESS, USER_DATA } from 'src/core/domains/models/user/mod_user';

export const updateUserAdress = (userData: USER_DATA, adress: ADRESS) =>
    produce(userData, (draft) => {
        draft.adress = adress;
        draft.hasMinimalAdress = true;
    });
