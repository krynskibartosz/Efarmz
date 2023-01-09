/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Column } from 'src/presentations/ui/bases/containers/Containers';

import { CSSProperties, ReactNode, useState } from 'react';
import { ClickOutside } from './ClickOutside';
import { useKeyPress, useUpdateEffect } from 'src/presentations/hooks';

type DROPDOWN = {
    Button: ({ open }: any) => ReactNode;
    DropdownContent: ({
        Button,
        DropdownContent,
        dropdownContentClassName,
        dropdownStyle,
        open,
        setOpen,
    }: any) => ReactNode;
    containerClassName?: string;
    dropdownContentClassName?: string;
    dropdownStyle?: CSSProperties;
    onClick?: any;
    clickOutside?: boolean;
    close?: boolean;
};

export const Dropdown = ({
    Button,
    DropdownContent,
    dropdownContentClassName,
    dropdownStyle,
    onClick,
    containerClassName,
    clickOutside = true,
    close,
    ...rest
}: DROPDOWN) => {
    const [open, setOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const isOpen = open || focused;
    const onExit = useKeyPress(27);

    useUpdateEffect(() => {
        setOpen(false);
        setFocused(false);
    }, [onExit]);
    return (
        <ClickOutside
            onClick={() => {
                if (clickOutside) {
                    setOpen(false);
                }
            }}
        >
            <div className={` relative w-full ${containerClassName}`}>
                <Row
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full"
                    onClick={() => {
                        if (!close) setOpen(!open);
                        if (typeof onClick === 'function') onClick();
                    }}
                >
                    {Button({ open, setOpen, focused })}
                </Row>
                {isOpen && (
                    <Column
                        className={
                            ` absolute z-10 overflow-y-auto rounded-lg  ${
                                open ? 'border border-gray-200' : ''
                            }   ` + dropdownContentClassName
                        }
                        style={dropdownStyle}
                    >
                        {DropdownContent({
                            Button,
                            DropdownContent,
                            dropdownContentClassName,
                            dropdownStyle,
                            open,
                            setOpen,
                            focused,
                            ...rest,
                        })}
                    </Column>
                )}
            </div>
        </ClickOutside>
    );
};
