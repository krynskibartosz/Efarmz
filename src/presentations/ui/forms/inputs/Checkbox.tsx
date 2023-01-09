import { CheckIcon } from '@heroicons/react/24/outline';
import { INPUT } from '../types';
import { Row } from 'src/presentations/ui/bases/containers/Containers';

type CHECKBOX = {
    label: string;
    id: string;
    checked?: unknown;
    onChange: (e?: unknown) => void;
} & INPUT;

export const CheckboxInput = ({
    value,
    onChange,
    label,
    id,
    ...rest
}: CHECKBOX) => {
    return (
        <Row className="items-center gap-x-2" positionY="center">
            <label
                className={`text-input flex cursor-pointer items-center gap-x-2 text-base font-medium text-fresh-gray-500 first-letter:uppercase hover:text-fresh-gray-700 ${
                    value ? '!text-freshGreen' : ''
                }`}
                htmlFor={id || label}
            >
                <div className="relative h-6 w-6">
                    <input
                        type="checkbox"
                        id={id || label}
                        style={{ minWidth: 24, minHeight: 24 }}
                        className="h-6 w-6 cursor-pointer appearance-none rounded-md border border-fresh-gray-300 bg-fresh-gray-50 transition-all checked:border-freshGreen checked:bg-freshGreen hover:border-freshGreen "
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        {...rest}
                    />
                    {value && (
                        <CheckIcon className="absolute top-1/2 left-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white" />
                    )}
                </div>

                {label}
            </label>
        </Row>
    );
};
