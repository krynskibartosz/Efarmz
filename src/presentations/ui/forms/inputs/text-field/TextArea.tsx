import { INPUT } from 'src/presentations/ui/forms/types';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import { TextInput } from './Text';
import { Column, Row } from 'src/presentations/ui/bases/containers/Containers';
import classNames from 'classnames';

interface TEXT_INPUT_PROPS extends INPUT {
    label: string;
    borderColor?: string;
    className?: string;
    pattern?: string;
    isRequired?: boolean;
    optionnal?: boolean;
    errorMsg?: string;
    cy?: string;
    maxLength: number;
}

export const TextAreaInput = ({
    error = false,
    label,
    id,
    cy,
    borderColor,
    className = '',
    children,
    errorMsg,
    isRequired,
    optionnal,
    ...rest
}: TEXT_INPUT_PROPS & InputHTMLAttributes<HTMLTextAreaElement>) => {
    const [focused, setFocused] = useState(false);

    //! the border is handle on the parent div of the input cause on mobile there's an uggly native border
    const borderC = focused
        ? 'border-[#9ABE36] bg-fresh-gray-50'
        : error
        ? 'border-fresh-red-900'
        : 'border-fresh-gray-200 group-hover:border-[#9ABE36]';

    return (
        <Column className={`w-full`}>
            {label && (
                <label
                    htmlFor={label}
                    className={classNames(
                        'mb-2',
                        'text-sm',
                        'font-semibold',
                        'text-fresh-gray-900',
                        'first-letter:uppercase',
                        'lg:text-base',
                        '2xl:text-lg'
                    )}
                >
                    {label}
                </label>
            )}
            <div
                className={`relative w-full  rounded-md  border   group-hover:bg-fresh-gray-50 ${
                    borderColor || borderC
                }`}
            >
                {isRequired && (
                    <div
                        className={classNames(
                            {
                                'bg-red-500': error,
                                'bg-[#9ABE36]': !focused && !error,
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
                                'bg-yellow-900': !focused && !error,
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
                <textarea
                    id={id || label}
                    className={classNames(
                        'w-full',
                        'resize-y',
                        '!rounded-md',
                        'bg-transparent',
                        'py-2',
                        'px-3',
                        'text-fresh-gray-700',
                        'outline-none',
                        'placeholder:text-fresh-gray-200',
                        'hover:text-fresh-gray-800',
                        'focus:border-transparent',
                        'focus:text-fresh-gray-900',
                        'md:text-base',
                        '2xl:text-lg',
                        { [className]: className }
                    )}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    //   type={type}
                    //   pattern={pattern}
                    data-cy={cy}
                    {...rest}
                />
                {children}
            </div>
            {error && (
                <p className="absolute right-0 -bottom-6 text-sm text-fresh-red-900 2xl:text-base">
                    {errorMsg}
                </p>
            )}
        </Column>
    );
};

export type COUNTER_INPUT = {
    maxLength: number;
    type?: 'input' | 'textArea';
    style?: unknown;
} & TEXT_INPUT_PROPS;

export const CounterInput = ({
    maxLength = 300,
    type = 'textArea',
    placeholder,
    setValue,
    label,
    ...rest
}: COUNTER_INPUT &
    InputHTMLAttributes<HTMLTextAreaElement> &
    InputHTMLAttributes<HTMLInputElement>) => {
    const valueLength = rest.value?.length;

    const setText = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (typeof setText === 'function') {
            setValue(e);
        }
    };

    return (
        <Column className="w-full ">
            {type === 'input' ? (
                <TextInput
                    label={label}
                    placeholder={placeholder}
                    setValue={setText}
                    {...rest}
                />
            ) : (
                <TextAreaInput
                    maxLength={maxLength}
                    label={label}
                    placeholder={placeholder}
                    setValue={setText}
                    {...rest}
                />
            )}
            <Row positionY="center" positionX="right" className="mt-2 ml-auto">
                <p
                    className={`border-fresh-gray-200 text-base text-fresh-gray-500 
            `}
                >
                    <span className={valueLength > maxLength ? 'text-red' : ''}>
                        {valueLength || 0}
                    </span>
                    /{maxLength}
                </p>
            </Row>
        </Column>
    );
};
