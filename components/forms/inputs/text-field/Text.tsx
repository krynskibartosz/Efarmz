import { Column } from 'components/bases/containers/Containers';
import { INPUT } from 'components/forms/types';
import { InputHTMLAttributes, useState } from 'react';

//* Intersting props
// disabled?: boolean;
// isRequired?: boolean;
// minLength?: number;
// maxLength?: number;
// pattern?: string;
// list?: string;
// results?: number;
// multiple?: boolean;

export interface TEXT_INPUT_PROPS extends INPUT {
    label: string;
    borderColor?: string;
    className?: string;
    pattern?: string;
    isRequired?: boolean;
    optionnal?: boolean;
    errorMsg?: string;
    cy?: string;
}
// todo: set input to full height
export const TextInput = ({
    error = false,
    label,
    type = 'text',
    id,
    cy,
    borderColor,
    className = '',
    children,
    pattern,
    errorMsg,
    isRequired,
    optionnal,
    ...rest
}: TEXT_INPUT_PROPS & InputHTMLAttributes<HTMLInputElement>) => {
    const [focused, setFocused] = useState(false);

    //! the border is handle on the parent div of the input cause on mobile there's an uggly native border
    const borderC = focused
        ? 'border-[#9ABE36] bg-fresh-gray-50'
        : error
        ? 'border-fresh-red-900'
        : 'border-fresh-gray-200 group-hover:border-[#9ABE36]';

    return (
        <Column className={`group relative w-full`}>
            {label && (
                <label
                    htmlFor={id || label}
                    className="mb-2 w-10/12 text-sm font-semibold text-fresh-gray-900 first-letter:uppercase md:text-base 2xl:text-lg"
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
                        className={`${
                            focused
                                ? 'bg-[#9ABE36]'
                                : error
                                ? 'bg-red-500'
                                : 'bg-[#9ABE36]'
                        }  absolute right-0 -top-3 h-1.5 w-1.5 rounded-full bg-[#9ABE36]`}
                    />
                )}
                {optionnal && (
                    <div
                        className={`${
                            focused
                                ? 'bg-fresh-yellow-900'
                                : error
                                ? 'bg-red-500'
                                : 'bg-fresh-yellow-900'
                        }  absolute right-0 -top-3 h-1.5 w-1.5 rounded-full bg-fresh-yellow-900`}
                    />
                )}
                <input
                    id={id || label}
                    className={` w-full !rounded-md bg-transparent py-2 px-3  text-base  text-fresh-gray-700 placeholder:text-fresh-gray-200 hover:text-fresh-gray-800   focus:border-transparent focus:text-fresh-gray-900 2xl:text-lg ${className}`}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    type={type}
                    pattern={pattern}
                    data-cy={cy}
                    {...rest}
                />
                {children}
            </div>
            {error && (
                <p className="absolute right-0 -bottom-6 whitespace-nowrap text-sm text-fresh-red-900">
                    {errorMsg}
                </p>
            )}
        </Column>
    );
};
