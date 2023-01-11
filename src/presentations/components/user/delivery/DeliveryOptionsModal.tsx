import { XCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import {
    CardModalOverlay,
    Column,
    Row,
    SelectInput,
    TextInput,
} from 'src/presentations/ui';
import { useKeyPress, useUpdateEffect } from 'src/presentations/hooks';
import { useForm, Controller } from 'react-hook-form';
import { COUNTRY } from 'src/core/domains/logic/mod_language';
import { belgiumZipCodeLength, countries } from 'src/core/domains/logic/user';
import { deliveryOptionsSchema } from 'src/core/domains/models/user/schema/mod_deliveryOptions';
import { useFetchUserDeliveryDate } from 'src/presentations/hooks/services/user/useFetchUserDeliveryDate';
import { CircleSpinner } from 'src/presentations/ui/feedbacks/Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import useRootStore from 'src/presentations/global-state/useRoot';
import { MODAL } from 'src/presentations/hooks/event/useModal';

type DELIVERY_OPTIONS_DTO = {
    country: COUNTRY;
    zipCode: string;
};

// TODO: There's a problem here.
export const DeliveryOptionsModal = ({
    modal,
}: {
    modal: MODAL<'deliverySlot'>;
}) => {
    const onExit = useKeyPress(27);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const { user, updateMinimalAdress } = useRootStore.getState();
    const {
        adress: { country, zipCode, deliveryDate },
    } = user.data;

    const {
        handleSubmit,
        control,
        watch,
        reset,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            zipCode: `${zipCode}`,
            country,
        },
        resolver: yupResolver(deliveryOptionsSchema),
    });
    const watchZipCode = watch('zipCode');

    const { error, deliveryDatesByZipCode, loading } = useFetchUserDeliveryDate(
        {
            watchZipCode,
            isDirty,
        }
    );

    const zipCodeHasRequirementToBeFetched =
        watchZipCode.length === belgiumZipCodeLength;

    const canBeSubmitted =
        deliveryDatesByZipCode.length > 0 && zipCodeHasRequirementToBeFetched;

    const onSubmit = (data: DELIVERY_OPTIONS_DTO) => {
        if (error && !canBeSubmitted) return;
        updateMinimalAdress({
            deliveryMode: 'home',
            deliveryDate: deliveryDatesByZipCode,
            zipCode: +data.zipCode,
            country: data.country,
        });
        modal.close();
        reset();
    };

    const deliveryDateToDisplay = () => {
        if (error) {
            return error;
        }
        if (deliveryDatesByZipCode) {
            return deliveryDatesByZipCode;
        }
        if (deliveryDate) {
            return deliveryDate;
        }
        return '';
    };
    useUpdateEffect(() => {
        modal.close();
        reset();
    }, [onExit]);

    return (
        <CardModalOverlay id="deliverySlot" modal={modal}>
            <Column className="relative w-full  h-[100%-20px] overflow-y-auto ">
                <CloseButton reset={reset} modal={modal} />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="pt-2 flex pb-5 px-6  w-full flex-col gap-y-5  max-md:mb-0"
                    id="deliveryOptionsForm"
                    name="deliveryOptionsForm"
                >
                    <h3 className="text-3xl font-bold text-center">
                        Quand souhaitez-vous être livré ?
                    </h3>
                    <Row className="flex-wrap gap-5 md:flex-nowrap">
                        <Controller
                            name="country"
                            control={control}
                            render={({
                                field: { value, onChange },
                                fieldState,
                            }) => {
                                return (
                                    <SelectInput
                                        error={fieldState?.error !== undefined}
                                        id="country"
                                        label={'pays'}
                                        errorMsg={fieldState.error?.message}
                                        options={countries()}
                                        onChange={onChange}
                                        required
                                        value={value}
                                        data-cy="language"
                                    />
                                );
                            }}
                        />
                        <Controller
                            name="zipCode"
                            control={control}
                            render={({
                                field: { value = '', onChange },
                                fieldState,
                            }) => {
                                return (
                                    <TextInput
                                        placeholder="1180"
                                        maxLength={belgiumZipCodeLength}
                                        required
                                        value={value}
                                        onChange={onChange}
                                        type="number"
                                        label={'Code postal'}
                                        error={fieldState?.error !== undefined}
                                        errorMsg={fieldState.error?.message}
                                    />
                                );
                            }}
                        />
                    </Row>
                    <div className="h-20">
                        <DeliveryDateToDisplay
                            isLoading={loading}
                            deliveryDateToDisplay={() =>
                                deliveryDateToDisplay()
                            }
                            zipCodeHasRequirementToBeFetched={
                                zipCodeHasRequirementToBeFetched
                            }
                        />
                    </div>
                    <button
                        disabled={!canBeSubmitted || error.length > 0}
                        form="deliveryOptionsForm"
                        className="green-button"
                        type="submit"
                    >
                        Enregistrer
                    </button>
                </form>
            </Column>
        </CardModalOverlay>
    );
};

const DeliveryDateToDisplay = ({
    isLoading,
    zipCodeHasRequirementToBeFetched,
    deliveryDateToDisplay,
}: {
    isLoading: boolean;
    zipCodeHasRequirementToBeFetched: boolean;
    deliveryDateToDisplay: () => string;
}) => {
    const canBeDisplayed =
        !isLoading &&
        deliveryDateToDisplay().length > 0 &&
        zipCodeHasRequirementToBeFetched;
    if (isLoading) {
        return (
            <Row className="w-full" horizontalPosition="center">
                <CircleSpinner className="!border-green-700 h-12 w-12" />
            </Row>
        );
    }
    if (canBeDisplayed) {
        return (
            <div>
                <p className="text-lg font-semibold">Date de livraison:</p>
                <time dateTime="todo">{deliveryDateToDisplay()}</time>
            </div>
        );
    }
    return <></>;
};

const CloseButton = ({
    modal,
    reset,
}: {
    modal: MODAL<'deliverySlot'>;
    reset: () => void;
}) => {
    return (
        <Row
            horizontalPosition="right"
            verticalPosition="center"
            className="w-full pt-3 pr-3"
        >
            <div
                className={classNames(
                    'grid',
                    'h-10',
                    'w-10',
                    'cursor-pointer',
                    'place-items-center',
                    'rounded-full',
                    'border-fresh-gray-200',
                    'hover:bg-[#CBF6DA]',
                    'hover:shadow-main',
                    'transition-all',
                    'duration-300',
                    'ease-in-out'
                )}
                onClick={() => {
                    modal.close();
                    reset();
                }}
            >
                <XCircleIcon className="h-9 w-9  text-green-700" />
            </div>
        </Row>
    );
};
