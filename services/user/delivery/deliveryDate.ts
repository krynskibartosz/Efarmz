export const belgiumZipCodeLength = 4;
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
export const fetchDeliveriesDate = ({
    zipCode,
    setLoading,
    setData,
    setError,
}: {
    zipCode: string;
    setLoading: any;
    setData: any;
    setError: any;
}) => {
    const canFetchData = zipCode?.length === belgiumZipCodeLength;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://dev.efarmz.be/api/v1/deliverydates/${+zipCode}`,
                {
                    headers: {
                        methods: 'GET',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();

            setError(false);
            setData(
                transformDateStringtoReadableDate(
                    data?.data?.startOrderableDate
                )
            );
        } catch (error) {
            console.log(
                '🚀 ~ file: deliveryDate.ts:58 ~ fetchData ~ error',
                error
            );
            setError('Fail to fetch');
        } finally {
            setLoading(false);
        }
    };

    if (canFetchData) {
        fetchData();
    }
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
