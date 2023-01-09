import { InputHTMLAttributes, useState } from 'react';
import { INPUT } from 'src/presentations/ui/forms/types';
import { TextInput } from './Text';
import { Dropdown } from 'src/presentations/ui/utils/Dropdown';
import { Row, Column } from 'src/presentations/ui/bases/containers/Containers';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface TEXT_INPUT_PROPS extends INPUT {
    label: string;
    placeholder?: string;
    errorMsg?: string;
    hasMoreIcon?: boolean;
    securePassword?: boolean;
}

export const PasswordInput = ({
    label,
    placeholder,
    error,
    errorMsg,
    hasMoreIcon,
    securePassword,
    ...rest
}: TEXT_INPUT_PROPS & InputHTMLAttributes<HTMLInputElement>) => {
    const [visible, setVisibile] = useState(false);
    const place_holder = '';

    return (
        <div className="relative w-full ">
            <Row positionY="center" className="relative w-full">
                <TextInput
                    type={visible ? 'text' : 'password'}
                    placeholder={
                        placeholder || visible
                            ? place_holder
                            : '*'.repeat(place_holder.length)
                    }
                    label={label}
                    error={error}
                    errorMsg={errorMsg}
                    {...rest}
                >
                    <div
                        className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer "
                        onClick={() => setVisibile(!visible)}
                    >
                        <i
                            className={`hover:text-[#9ABE36] ${
                                visible ? 'far fa-eye ' : 'far fa-eye-slash'
                            }`}
                        />
                    </div>
                    {hasMoreIcon && (
                        <div className="absolute -top-[27px] -right-2 z-10 ">
                            <Dropdown
                                dropdownContentClassName={`bg-white -top-32 2xl:-top-[132px]  w-full mt-2 min-w-[300px] p-5  -right-[calc(100%-32px)]`}
                                containerClassName="w-auto items-center justify-center h-full mr-3"
                                dropdownStyle={{
                                    boxShadow:
                                        '0px 0px 10px 2px rgba(0, 0, 0, 0.05)',
                                }}
                                Button={({ setOpen, open }) => (
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    >
                                        <QuestionMarkCircleIcon
                                            className={`h-[22px]  w-[22px] xl:hover:text-freshGreen 2xl:h-7 2xl:w-7  ${
                                                open
                                                    ? 'text-freshGreen'
                                                    : 'text-fresh-gray-700'
                                            } ${
                                                !securePassword
                                                    ? '!text-fresh-red-900'
                                                    : ''
                                            } `}
                                        />
                                    </div>
                                )}
                                DropdownContent={() => (
                                    <Column>
                                        <p className="mb-2 font-semibold   text-fresh-gray-900 md:text-lg">
                                            Le mot de passe doit contenir:
                                        </p>
                                        <Column as="ul" className="gap-y-1">
                                            <li className="ml-5 list-disc text-sm text-fresh-gray-700 md:text-base">
                                                Huit caractères
                                            </li>
                                            <li className="ml-5 list-disc text-sm text-fresh-gray-700 md:text-base">
                                                Une lettre majuscule
                                            </li>
                                            <li className="ml-5 list-disc text-sm text-fresh-gray-700 md:text-base">
                                                Un chiffre
                                            </li>
                                            <li className="ml-5 list-disc text-sm text-fresh-gray-700 md:text-base">
                                                Ne doit pas contenir les valeurs
                                                des champs nom de famille,
                                                prénom et email
                                            </li>
                                        </Column>
                                    </Column>
                                )}
                            />
                        </div>
                    )}
                </TextInput>
            </Row>
        </div>
    );
};
