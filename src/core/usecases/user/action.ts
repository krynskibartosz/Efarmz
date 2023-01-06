import { ADRESS } from 'src/core/domains/models/user/mod_user';

export const updateUserAdress = (
    draft: {
        adress: ADRESS;
        hasMinimalAdress: boolean;
    },
    adress: ADRESS
) => {
    draft.adress = adress;
    draft.hasMinimalAdress = true;
};
