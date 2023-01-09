import { XCircleIcon } from '@heroicons/react/24/outline';
import { INPUT } from 'src/presentations/ui/forms/types';
import { Dropdown } from 'src/presentations/ui/utils/Dropdown';
import { Badge, onChangeHandler } from './utils';
import { Column, Row } from 'src/presentations/ui/bases/containers/Containers';

type MULTIPLE_SELECT = {
    label: string;
    id: string;
    options: { value: string; label: string }[];
    required?: boolean;
};

export const MultilpleSelectDesktopInput = ({
    options,
    id,
    value,
    setValue,
    label,
    required = false,
    form,
}: MULTIPLE_SELECT & INPUT) => {
    return (
        <Dropdown
            dropdownContentClassName="  w-full mt-2"
            dropdownStyle={{ zIndex: 9999, paddingBottom: 10, paddingTop: 10 }}
            Button={({ focused }) => {
                return (
                    <Column className="w-full ">
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
            DropdownContent={() => {
                return (
                    <select
                        multiple
                        size={5}
                        required={required}
                        onChange={(e) =>
                            onChangeHandler({ event: e, setValue })
                        }
                        id={id}
                        name={id}
                        form={form}
                        className="relative"
                    >
                        {options.map((el, i) => {
                            const isActive = value?.includes(el.value);
                            return (
                                <option
                                    key={i}
                                    className={`text-input ml-0.5 w-full  cursor-pointer  whitespace-nowrap p-2.5 hover:bg-fresh-gray-50 ${
                                        isActive
                                            ? 'border-purple  border-l-2 bg-fresh-gray-100 !text-fresh-gray-900'
                                            : ''
                                    } `}
                                    value={el.value}
                                >
                                    {el.label}
                                </option>
                            );
                        })}
                    </select>
                );
            }}
        />
    );
};
