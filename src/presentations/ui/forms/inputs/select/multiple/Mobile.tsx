import { INPUT } from 'src/presentations/ui/forms/types';
import { onChangeHandler } from './utils';
import { Column } from 'src/presentations/ui/bases/containers/Containers';

type MULTIPLE_SELECT = {
    options: { value: string; label: string }[];
    id: string;
    label: string;
    required?: boolean;
};

export const MultilpleSelectMobileInput = ({
    id,
    setValue,
    value,
    options,
    label,
    required = false,
    form,
}: MULTIPLE_SELECT & INPUT) => {
    return (
        <Column>
            <label
                htmlFor={id}
                className="mb-2 text-sm font-semibold text-fresh-gray-900 first-letter:uppercase"
            >
                {label}
            </label>
            <select
                multiple
                size={5}
                form={form}
                required={required}
                onChange={(e) => onChangeHandler({ event: e, setValue })}
                value={value}
                id={id}
                name={id}
                className="text-input focus:border-purple rounded-xl border  border-fresh-gray-200 max-lg:bg-fresh-gray-50 max-lg:p-2.5 max-lg:px-5"
            >
                {options.map((el, i) => (
                    <option key={i} value={el.value}>
                        {el.label}
                    </option>
                ))}
            </select>
        </Column>
    );
};
