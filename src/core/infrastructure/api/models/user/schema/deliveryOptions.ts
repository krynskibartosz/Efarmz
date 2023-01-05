import { COUNTRY } from 'src/core/logic/language';
import * as yup from 'yup';

export const deliveryOptionsSchema = yup.object().shape({
    country: yup.string().oneOf(['Belgique', 'Luxembourg']).required(),
    zipCode: yup.string().when('country', {
        is: (value: COUNTRY) => ['Belgique', 'Luxembourg'].includes(value),
        then: yup.string().length(4).required('Le zip code est requis'),
    }),
});
