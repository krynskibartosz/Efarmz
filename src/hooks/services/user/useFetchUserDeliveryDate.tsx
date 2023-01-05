import { useState, useEffect } from 'react';
import { ApiAdapter } from 'src/adapters/api-adapter';
import { UserService } from 'src/core/infrastructure/api/client/user/users';
import { belgiumZipCodeLength } from 'src/core/logic/user';
import { transformDateStringtoReadableDate } from 'src/lib/date';
import { ApiPort } from 'src/ports/api';

const api: ApiPort = new ApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const userService = new UserService(api);

export const useFetchUserDeliveryDate = ({
    watchZipCode,
    isDirty,
}: {
    watchZipCode: string;
    isDirty: boolean;
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [deliveryDatesByZipCode, setDeliveryDatesByZipCode] = useState('');

    const zipCodeHasRequirementToBeFetched =
        watchZipCode.length === belgiumZipCodeLength;

    const fetchUserDeliveryDate = async () => {
        try {
            if (zipCodeHasRequirementToBeFetched && isDirty) {
                setLoading(true);
                const deliveryDatesByZipCode =
                    await userService.getUserDeliveryDates(watchZipCode);
                setError('');
                setDeliveryDatesByZipCode(
                    transformDateStringtoReadableDate(
                        deliveryDatesByZipCode?.startOrderableDate
                    )
                );
            }
        } catch (error) {
            console.error(error);
            setError(
                'An error occurred while fetching the delivery dates. Please try again later.'
            );
            setDeliveryDatesByZipCode('');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDeliveryDate();
    }, [zipCodeHasRequirementToBeFetched]);

    return { loading, error, deliveryDatesByZipCode };
};
