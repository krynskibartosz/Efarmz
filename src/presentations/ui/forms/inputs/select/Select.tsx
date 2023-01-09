import { InputHTMLAttributes } from 'react';
import { TextInput, TEXT_INPUT_PROPS } from '../text-field/Text';
import { Column } from 'src/presentations/ui/bases/containers/Containers';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

type OPTIONS = string[];

export const DataSetInput = ({
    id,
    options,
    ...rest
}: TEXT_INPUT_PROPS & {
    options: OPTIONS;
} & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <>
            <TextInput list={id} type="search" results={5} {...rest} />

            <datalist id={id}>
                {options.map((value: string, key: number) => (
                    <option key={key} value={value} />
                ))}
            </datalist>
        </>
    );
};

export const SelectInput = ({
    id,
    options,
    label,
    error,
    errorMsg,
    isRequired,
    optionnal,
    children,
    ...rest
}: TEXT_INPUT_PROPS & {
    options: { label: string; value: string }[];
} & InputHTMLAttributes<HTMLSelectElement>) => {
    return (
        <Column className="group relative w-full cursor-pointer">
            {label && (
                <label
                    className={classNames(
                        'mb-2',
                        'w-full',
                        'text-sm',
                        'md:text-base',
                        'font-semibold',
                        'text-fresh-gray-900',
                        'first-letter:uppercase',
                        '2xl:text-lg'
                    )}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <div className="relative w-full">
                {isRequired && (
                    <div
                        className={classNames(
                            {
                                'bg-red-500': error,
                                'bg-[#9ABE36]': !error,
                            },
                            'absolute',
                            'right-0',
                            '-top-3',
                            'h-1.5',
                            'w-1.5',
                            'rounded-full',
                            'bg-[#9ABE36]'
                        )}
                    />
                )}
                {optionnal && (
                    <div
                        className={classNames(
                            {
                                'bg-red-500': error,
                                'bg-fresh-yellow-900': !error,
                            },
                            'absolute',
                            'right-0',
                            '-top-3',
                            'h-1.5',
                            'w-1.5',
                            'rounded-full',
                            'bg-fresh-yellow-900'
                        )}
                    />
                )}
                <select
                    style={{ height: 42 }}
                    className={classNames(
                        {
                            '!border-fresh-red-900': error,
                        },
                        'min-h-[42px]',
                        'w-full',
                        'cursor-pointer',
                        '!rounded-md',
                        'border',
                        'border-fresh-gray-200',
                        'bg-transparent',
                        'py-2',
                        'pr-8',
                        'pl-[7px]',
                        'text-base',
                        'text-fresh-gray-700',
                        'outline-none',
                        'line-clamp-1',
                        'hover:text-fresh-gray-800',
                        'focus:border-[#9ABE36]',
                        'focus:bg-fresh-gray-50',
                        'focus:text-fresh-gray-900',
                        'disabled:!border-fresh-gray-200',
                        'disabled:!bg-white',
                        'disabled:!text-fresh-gray-400',
                        'group-hover:border-[#9ABE36]',
                        'group-hover:bg-fresh-gray-50',
                        'md:text-lg'
                    )}
                    id={id}
                    {...rest}
                >
                    {children}
                    {options.map((el, key) => (
                        <option key={key} value={el.value}>
                            {el.label}
                        </option>
                    ))}
                </select>
                <ArrowDownCircleIcon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-fresh-gray-600 " />
            </div>
            {error && (
                <p className="absolute right-0 -bottom-6 text-sm text-fresh-red-900">
                    {errorMsg}
                </p>
            )}
        </Column>
    );
};
