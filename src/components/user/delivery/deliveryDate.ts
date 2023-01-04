// todo: this sould go to a config file
export const belgiumZipCodeLength = 4;
// todo: this sould go to lib folder
export const transformDateStringtoReadableDate = (
    dateString: string
): string => {
    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Use the toLocaleDateString method to get a readable date string
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: '2-digit',
    };
    // @ts-ignore
    const readableDate = date.toLocaleDateString('fr-FR', dateOptions);

    // Use the toLocaleTimeString method to get a readable time string
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    // @ts-ignore
    const readableTime = date.toLocaleTimeString('fr-FR', timeOptions);

    return `${readableDate}`;
};

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
