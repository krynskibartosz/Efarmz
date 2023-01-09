import { XCircleIcon } from '@heroicons/react/24/outline';
import { INPUT } from 'src/presentations/ui/forms/types';
import { Dropdown } from 'src/presentations/ui/utils/Dropdown';
import { Badge } from './utils';
import { Column, Row } from 'src/presentations/ui/bases/containers/Containers';

type OPTION = { value: string; label: string };

type MULTIPLE_SELECT = {
    label: string;
    id: string;
    options: OPTION[];
    required?: boolean;
    value: unknown[];
    setValue: (e?: unknown) => void;
};

export const MultilpleSelectSafariInput = ({
    options,
    id,
    value,
    setValue,
    label,
}: MULTIPLE_SELECT & INPUT) => {
    const onChange = (el: OPTION) => {
        if (value.includes(el.value)) {
            setValue(value.filter((v: string) => v !== el.value));
        } else {
            setValue([...value, el.value]);
        }
    };

    return (
        <Column className="h-full w-full ">
            <Dropdown
                dropdownContentClassName="bg-white w-full mt-2"
                dropdownStyle={{
                    zIndex: 9999,
                    paddingBottom: 10,
                    paddingTop: 10,
                }}
                Button={({ focused }) => {
                    return (
                        <Column className="w-full">
                            <label
                                htmlFor={id}
                                className="mb-2 text-sm font-semibold text-fresh-gray-900 first-letter:uppercase"
                            >
                                {label}
                            </label>
                            <Row
                                as="button"
                                positionY="center"
                                className={`hover:border-purple  w-full rounded-xl   border  bg-fresh-gray-50 px-2  text-fresh-gray-600 ${
                                    focused
                                        ? 'border-purple'
                                        : 'border-fresh-gray-200'
                                }`}
                                style={{ height: 42 }}
                            >
                                <Row
                                    positionY="center"
                                    className="noScrollbar h-full w-full gap-x-2 overflow-x-scroll rounded-xl"
                                >
                                    {value.map((text: string, i: number) => {
                                        return (
                                            <Badge
                                                key={i}
                                                onDelete={() =>
                                                    setValue(
                                                        value.filter(
                                                            (el: string) =>
                                                                el !== text
                                                        )
                                                    )
                                                }
                                                text={text}
                                            />
                                        );
                                    })}
                                </Row>
                                {value.length > 0 && (
                                    <XCircleIcon
                                        className="icon right-2 h-6 w-6"
                                        onClick={() => setValue([])}
                                    />
                                )}
                            </Row>
                        </Column>
                    );
                }}
                DropdownContent={({
                    setOpen,
                }: {
                    setOpen: (e: boolean) => void;
                }) => {
                    return (
                        <ul className="max-h-52 w-full overflow-y-auto">
                            {options.map((el, i) => {
                                const isActive = value?.includes(el.value);
                                return (
                                    <Row
                                        key={i}
                                        as="li"
                                        positionY="center"
                                        onClick={() => {
                                            setOpen(false);
                                            onChange(el);
                                        }}
                                        className={`${
                                            isActive
                                                ? 'bg-fresh-gray-100'
                                                : null
                                        } w-full   cursor-pointer   p-2 pt-1 pl-2 pr-3 hover:bg-fresh-gray-50 `}
                                    >
                                        <p
                                            className={`  ${
                                                isActive
                                                    ? ' border-purple   ml-0.5  whitespace-nowrap border-l-2  bg-fresh-gray-100 !text-fresh-gray-900 '
                                                    : 'null ml-0.5'
                                            } text-input cursor-pointer  pl-2`}
                                        >
                                            {el.label}
                                        </p>
                                    </Row>
                                );
                            })}
                        </ul>
                    );
                }}
            />
        </Column>
    );
};
