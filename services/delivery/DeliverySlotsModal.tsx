import { Row, Column } from 'components/bases/containers/Containers';
import { TextInput } from 'components/forms/inputs/text-field/Text';
import { SelectInput } from 'components/forms/inputs/select/Select';
import { Overlay } from 'components/utils/Overlay';
import { ClickOutside } from 'components/utils/ClickOutside';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MODAL } from 'lib/hooks/useModal';
import { XCircleIcon } from '@heroicons/react/24/outline';
import {
    belgiumZipCodeLength,
    fetchDeliveriesDate,
} from 'services/delivery/deliveryDates';

export const DeliverySlotsModal = ({ modal }: { modal: MODAL }) => {
    const countries = [
        { label: `🇧🇪 Belgique`, value: 'B' },
        { label: `🇱🇺 Luxembourg`, value: 'L' },
    ];

    const isOpen = modal.opened === 'deliverySlot';

    const { handleSubmit, control, watch } = useForm({});
    const watchZipCode: string = watch('zip_code');

    const onSubmit = (data: any) => {
        console.log(
            data,
            '🚀 ~ file: DeliverySlotsModal.tsx:22 ~ DeliverySlotsModal ~ any'
        );
    };

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(false);

    useEffect(() => {
        fetchDeliveriesDate({
            zipCodeLength: watchZipCode?.length,
            setLoading,
            setData,
        });
    }, [watchZipCode]);

    return (
        <Overlay
            bgClassName={`bg-opacity-50 backdrop-blur-sm   xl:bg-opacity-70 bg-fresh-gray-900 xl:backdrop-blur-sm `}
            hidden={isOpen}
            onClickOutside={() => null}
        >
            <ClickOutside
                onClick={() => {
                    modal.close();
                }}
            >
                <div
                    className={`fixed  bottom-0 w-full rounded-t-3xl bg-white  shadow-main md:rounded-md ${
                        isOpen ? 'z-50 ' : '-z-50 '
                    }`}
                    style={{
                        height: isOpen ? '95%' : '0%',
                        opacity: isOpen ? 1 : 0,
                        transition: 'height 375ms, opacity 375ms',
                    }}
                >
                    <Column
                        className="relative overflow-y-auto rounded-t-3xl md:!h-full md:rounded-md "
                        style={{
                            height: '90%',
                        }}
                    >
                        <div
                            className="fixed top-10 right-2 z-30 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-fresh-gray-200 bg-white shadow-main transition-all duration-300 ease-in-out hover:scale-105 md:top-14 2xl:top-16"
                            onClick={() => {
                                modal.close();
                            }}
                        >
                            <XCircleIcon className="h-9 w-9  text-freshGreen" />
                        </div>

                        <Column className="relative w-full  h-[100%-20px] overflow-y-auto ">
                            <form
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                onSubmit={handleSubmit(onSubmit)}
                                className=" flex p-5 pt-20 w-full flex-col gap-y-5  max-md:mb-0"
                                id="deliverySlotForm"
                                name="deliverySlotForm"
                            >
                                <h3 className="text-3xl font-bold">
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
                                        name="zip_code"
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
                                <Row className="flex-wrap gap-5 md:flex-nowrap">
                                    <Controller
                                        name="date"
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
                                                    id="date"
                                                    label={'Date'}
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
                                        name="hours"
                                        control={control}
                                        render={({
                                            field: { value = '', onChange },
                                            fieldState,
                                        }) => {
                                            return (
                                                <SelectInput
                                                    error={
                                                        fieldState?.error !==
                                                        undefined
                                                    }
                                                    id="hours"
                                                    label={'Heures'}
                                                    errorMsg={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                    options={countries}
                                                    onChange={onChange}
                                                    required
                                                    value={value}
                                                />
                                            );
                                        }}
                                    />
                                </Row>
                                <button
                                    className="btn btn-primary btn-block mt-4"
                                    // onClick={() => buttonAction?.()}
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
