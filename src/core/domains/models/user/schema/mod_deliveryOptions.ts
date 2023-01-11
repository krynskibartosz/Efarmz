import { COUNTRY } from 'src/core/domains/logic/mod_language';
import * as yup from 'yup';

export const deliveryOptionsSchema = yup.object().shape({
    country: yup.string().oneOf(['Belgique', 'Luxembourg']).required(),
    zipCode: yup.string().when('country', {
        is: (value: COUNTRY) => ['Belgique', 'Luxembourg'].includes(value),
        then: yup.string().length(4).required('Le zip code est requis'),
    }),
});

interface CARRIER {
    id: number;
    carrier_id: number;
    name: string;
    address1?: string | null;
    address2?: string | null;
    availabilities?: unknown[]; // todo: check this
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

export type DELIVERY_OPTIONS_RESPONSE = {
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
