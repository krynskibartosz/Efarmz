import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MODAL } from 'src/hooks/useModal';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useRootStore from 'src/core/store/useRoot';

import { CircleSpinner } from 'src/ui/feedbacks/Spinner';

import classNames from 'classnames';
import {
    Overlay,
    Column,
    Row,
    SelectInput,
    TextInput,
    ClickOutside,
} from 'src/ui';
import { useKeyPress, useUpdateEffect, useLockedBody } from 'src/hooks';

import { COUNTRY } from 'src/core/logic/language';
import { ApiPort } from 'src/ports/api';
import { ApiAdapter } from 'src/adapters/api-adapter';
import { UserService } from 'src/core/infrastructure/api/client/user/users';
import { belgiumZipCodeLength } from 'src/core/logic/user';
import { transformDateStringtoReadableDate } from 'src/lib/date';

type DATA_TO_SUBMIT = {
    country: COUNTRY;
    zipCode: string;
};

// todo: separate form validation logique
// todo: create component for ModalCard
// todo: when the zipCode is the same or was already type, block the fetcher function to doesn't execute

const api: ApiPort = new ApiAdapter(
    process.env.NEXT_PUBLIC_END_POINT as string
);
const userService = new UserService(api);

export const DeliverySlotsModal = ({ modal }: { modal: MODAL }) => {
    const [userDeliveryDates, setUserDeliveryDate] = useState();

    const [loading, setLoading] = useState(true);

    const onExit = useKeyPress(27);
    useUpdateEffect(() => {
        modal.close();
    }, [onExit]);

    const countries = [
        { label: `🇧🇪 Belgique`, value: 'Belgique' },
        { label: `🇱🇺 Luxembourg`, value: 'Luxembourg' },
    ];
    const { user, updateMinimalAdress } = useRootStore.getState();
    const {
        adress: { country, zipCode, deliveryDate, deliveryMode },
    } = user.data;

    const [error, setError] = useState(false);
    const [localDeliveryDate, setDeliveryDate] = useState(deliveryDate);

    const schema = yup.object().shape({
        country: yup.string().oneOf(['Belgique', 'Luxembourg']).required(),
        zipCode: yup.string().when('country', {
            is: (value: COUNTRY) => ['Belgique', 'Luxembourg'].includes(value),
            then: yup.string().length(4).required('Le zip code est requis'),
        }),
    });

    const isModalOpen = modal.opened === 'deliverySlot';

    const { handleSubmit, control, watch } = useForm({
        defaultValues: {
            zipCode: `${zipCode}`,
            country,
        },
        resolver: yupResolver(schema),
    });
    const watchZipCode = watch('zipCode');
    const onSubmit = (data: DATA_TO_SUBMIT) => {
        if (error) return;
        updateMinimalAdress({
            deliveryMode: 'home',
            deliveryDate: localDeliveryDate,
            zipCode: +data.zipCode,
            country: data.country,
        });
        modal.close();
    };

    const canBeSubmitted =
        localDeliveryDate.length > 0 &&
        watchZipCode.length === belgiumZipCodeLength;

    useLockedBody(modal.opened.length > 0, 'root');

    useEffect(() => {
        const fetchUserDeliveryDate = async () => {
            setLoading(true);
            if (watchZipCode.length === 4) {
                const userDeliveryDates =
                    await userService.getUserDeliveryDates(watchZipCode);

                setUserDeliveryDate(
                    transformDateStringtoReadableDate(
                        userDeliveryDates?.startOrderableDate
                    )
                );
                updateMinimalAdress({
                    deliveryMode: 'home',
                    deliveryDate:
                        transformDateStringtoReadableDate(
                            userDeliveryDates?.startOrderableDate
                        ) || localDeliveryDate,
                    zipCode: watchZipCode,
                    country: country,
                });

                setLoading(false);
            }
        };
        fetchUserDeliveryDate();
    }, [watchZipCode.length === 4]);

    return (
        <Overlay
            bgClassName={`bg-opacity-50 backdrop-blur-sm   xl:bg-opacity-70 bg-fresh-gray-900 xl:backdrop-blur-sm `}
            hidden={isModalOpen}
            onClickOutside={() => null}
        >
            <ClickOutside
                onClick={() => {
                    modal.close();
                }}
            >
                <div
                    className={classNames(
                        {
                            'z-50': isModalOpen,
                            '-z-50': !isModalOpen,
                        },
                        'fixed',
                        'bottom-0',
                        'w-full',
                        'rounded-t-3xl',
                        'bg-white',
                        'shadow-main',
                        'md:rounded-md'
                    )}
                    style={{
                        height: isModalOpen ? '95%' : '0%',
                        opacity: isModalOpen ? 1 : 0,
                        transition: 'height 375ms, opacity 375ms',
                    }}
                >
                    <Column
                        className="relative overflow-y-auto rounded-t-3xl md:!h-full md:rounded-md "
                        style={{
                            height: '90%',
                        }}
                    >
                        <Column className="relative w-full  h-[100%-20px] overflow-y-auto ">
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
                                        'hover:bg-gray-100',
                                        'bg-s',
                                        'hover:shadow-main',
                                        'transition-all',
                                        'duration-300',
                                        'ease-in-out'
                                    )}
                                    onClick={() => {
                                        modal.close();
                                    }}
                                >
                                    <XCircleIcon className="h-9 w-9  text-green-700" />
                                </div>
                            </Row>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="pt-2 flex pb-5 px-5  w-full flex-col gap-y-5  max-md:mb-0"
                                id="deliverySlotForm"
                                name="deliverySlotForm"
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
                                                    error={
                                                        fieldState?.error !==
                                                        undefined
                                                    }
                                                    id="country"
                                                    label={'pays'}
                                                    errorMsg={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                    options={countries}
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
                                                    maxLength={
                                                        belgiumZipCodeLength
                                                    }
                                                    required
                                                    value={value}
                                                    onChange={onChange}
                                                    type="number"
                                                    label={'Code postal'}
                                                    error={
                                                        fieldState?.error !==
                                                        undefined
                                                    }
                                                    errorMsg={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                </Row>
                                <div className="h-20">
                                    {loading && (
                                        <Row
                                            className="w-full"
                                            horizontalPosition="center"
                                        >
                                            <CircleSpinner className="!border-green-700 h-12 w-12" />
                                        </Row>
                                    )}
                                    {!loading && canBeSubmitted && (
                                        <div>
                                            <p className="text-lg font-semibold">
                                                Date de livraison:{' '}
                                            </p>
                                            <time dateTime="todo">
                                                {error ||
                                                    userDeliveryDates ||
                                                    localDeliveryDate}
                                            </time>
                                        </div>
                                    )}
                                </div>

                                <button
                                    disabled={!canBeSubmitted || error}
                                    className={classNames(
                                        'py-2',
                                        'hover:bg-green-700',
                                        'hover:text-white',
                                        'transition-colors',
                                        'duration-300',
                                        'ease-in-out',
                                        'text-green-700',
                                        'font-bold',
                                        'border',
                                        'border-green-700',
                                        'disabled:opacity-60',
                                        'disabled:cursor-not-allowed',
                                        'disabled:border-gray-700',
                                        'disabled:text-gray-700',
                                        'disabled:hover:bg-white',
                                        'disabled:hover:text-gray-700',
                                        'rounded-md'
                                    )}
                                    type="submit"
                                >
                                    Enregistrer
                                </button>
                            </form>
                        </Column>
                    </Column>
                </div>
            </ClickOutside>
        </Overlay>
    );
};