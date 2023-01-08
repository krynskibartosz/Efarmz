import { faker } from '@faker-js/faker';
import { USER_DATA } from 'src/core/domains/models/user/mod_user';

export const originalUserData: USER_DATA = {
    adress: {
        country: 'Belgique',
        zipCode: null,
        deliveryMode: 'home',
        deliveryDate: '',
    },
    hasMinimalAdress: false,
};

export const newAdress: USER_DATA = {
    adress: {
        country: faker.datatype.boolean() ? 'Belgique' : 'Luxembourg',
        zipCode: faker.datatype.number({
            min: 1000,
            max: 9999,
        }),
        deliveryMode: faker.datatype.boolean() ? 'home' : 'collection-point',
        deliveryDate: faker.date.future().toISOString(),
    },
    hasMinimalAdress: true,
};
