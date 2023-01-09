import { Column, Row } from 'src/presentations/ui/bases/containers/Containers';
import { INPUT } from '../types';

type RADIO = {
    options: { value: string; label: string }[];
    label: string;
    value: unknown;
    direction: 'horizontal' | 'vertical';
} & INPUT;

export const Radio = ({
    value,
    label,
    options,
    direction = 'horizontal',
    ...rest
}: RADIO) => {
    return (
        <Column>
            {label && (
                <label className="mb-2 w-full text-sm font-semibold text-fresh-gray-900 first-letter:uppercase">
                    {label}
                </label>
            )}

            <Row
                className={`flex-wrap  gap-x-10 gap-y-3 ${
                    direction === 'vertical' ? 'flex-col' : 'items-center'
                }`}
            >
                {options.map((el, i) => {
                    return (
                        <Row
                            key={i}
                            className="items-center gap-x-2"
                            positionY="center"
                        >
                            <div className="relative ">
                                <input
                                    type="radio"
                                    value={el.value}
                                    checked={value === el.value}
                                    style={{ minWidth: 24, minHeight: 24 }}
                                    className="h-6 w-6 cursor-pointer appearance-none rounded-xl border border-fresh-gray-300 bg-fresh-gray-50 accent-freshGreen  transition-all checked:border-4 checked:border-fresh-gray-100 checked:bg-[#9ABE36] hover:border-[#9ABE36] "
                                    {...rest}
                                    id={`${i}`}
                                />
                                {/* {value === el.value && (
                  <CheckIcon className="absolute top-1/2 left-1/2 z-20 h-6 w-6 -translate-x-1/2 -translate-y-1/2 pb-1.5 text-white" />
                )} */}
                            </div>
                            <label
                                key={i}
                                htmlFor={`${i}`}
                                className={` text-input  cursor-pointer pb-[3px] font-semibold  first-letter:uppercase ${
                                    value === el.value
                                        ? '!text-fresh-gray-900'
                                        : 'text-fresh-gray-600'
                                }`}
                            >
                                {el.label}
                            </label>
                        </Row>
                    );
                })}
            </Row>
        </Column>
    );
};
