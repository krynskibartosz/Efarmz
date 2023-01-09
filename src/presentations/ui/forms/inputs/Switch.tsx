import { ChangeEvent } from 'react';
import { INPUT } from '../types';
import styles from './Switch.module.css';
import { Row } from 'src/presentations/ui/bases/containers/Containers';

type SWITCH = {
    leftLabel?: string | JSX.Element;
    rightLabel?: string | JSX.Element;
    size?: 'small' | 'medium';
} & INPUT;

export const SwitchInput = ({
    leftLabel,
    rightLabel,
    setValue,
    value,
    size = 'medium',
    ...rest
}: SWITCH) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.checked);
    };

    return (
        <Row className="w-full items-center">
            <p
                className={`h-full w-auto font-semibold 2xl:text-lg ${
                    value ? 'text-fresh-gray-700' : 'text-fresh-gray-900'
                }`}
            >
                {leftLabel}
            </p>
            <div className="mr-1 w-auto ">
                <Row positionY="bottom">
                    <label className={styles['toggle-switch']}>
                        <input
                            id="switch"
                            name="switch"
                            type="checkbox"
                            checked={value}
                            onChange={onChange}
                            {...rest}
                        />
                        <span className={styles.switch} />
                    </label>
                </Row>
            </div>
            <label
                htmlFor="switch"
                className={`h-full w-auto font-semibold  2xl:text-lg ${
                    size === 'small' ? 'text-xs' : 'text-sm md:text-base'
                } ${value ? 'text-fresh-gray-900' : 'text-fresh-gray-600'}`}
            >
                {rightLabel}
            </label>
        </Row>
    );
};

export const SwitchInputControlled = ({
    onClick,
    isActive,
    label,
    className = '',
}: {
    onClick: (e?: unknown) => void;
    isActive: boolean;
    label: string;
    className?: string;
}) => {
    return (
        <Row
            onClick={() => {
                if (isActive) {
                    onClick(false);
                } else {
                    onClick(true);
                }
            }}
            className={`w-full  cursor-pointer items-center  ${className}`}
        >
            <div className="w-12 h-6 relative border border-freshGreen rounded-full">
                <div
                    className={`bg-freshGreen transition-all duration-300 ease-in-out absolute top-1/2  -translate-y-1/2 h-4 w-4 rounded-full ${
                        isActive ? 'ml-[26px] ' : 'ml-1'
                    }`}
                />
            </div>
            <p
                className={`ml-2 pb-px text-sm font-semibold ${
                    isActive ? 'text-freshGreen' : 'text-fresh-gray-500'
                }`}
            >
                {label}
            </p>
        </Row>
    );
};
