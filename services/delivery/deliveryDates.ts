export const belgiumZipCodeLength = 4;
export const fetchDeliveriesDate = ({
    zipCodeLength,
    setLoading,
    setData,
}: {
    zipCodeLength: number;
    setLoading: any;
    setData: any;
}) => {
    const canFetchData = zipCodeLength === belgiumZipCodeLength;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                'https://efarmz.be/api/v1/deliverydates/1000',
                {
                    headers: {
                        methods: 'GET',
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
        } catch (error) {
            console.log(
                '🚀 ~ file: DeliverySlotsModal.tsx:42 ~ useEffect ~ error',
                error
            );
        } finally {
            setLoading(false);
        }
    };

    if (canFetchData) {
        fetchData();
    }
};
