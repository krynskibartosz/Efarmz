import classNames from 'classnames';
import { Overlay, ClickOutside } from '../utils';
import { Column } from './containers/Containers';

import { SyntheticEvent, useEffect } from 'react';
import { useLockedBody } from 'lib';

type MODAL<T> = {
    opened: T | string;
    toggle: (e: '' | T) => void;
    close: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};

export const CardModalOverlay = <T extends string>({
    children,
    modal,
    id,
}: {
    children: JSX.Element;
    modal: MODAL<T>;
    id: string | '';
}) => {
    const [_, setLocked] = useLockedBody();

    const isModalOpen = modal.opened === id;
    useEffect(() => {
        if (isModalOpen) {
            setLocked(true);
        }
        if (!isModalOpen) {
            setLocked(false);
        }
    }, [isModalOpen, setLocked]);

    return (
        <Overlay
            bgClassName={`bg-opacity-50 backdrop-blur-sm   xl:bg-opacity-70 bg-fresh-gray-900 xl:backdrop-blur-sm `}
            hidden={isModalOpen}
            onClickOutside={() => null}
        >
            <ClickOutside
                onClick={() => {
                    modal.close();
                }}
            >
                <div
                    className={classNames(
                        {
                            'z-50': isModalOpen,
                            '-z-50': !isModalOpen,
                        },
                        'fixed',
                        'bottom-0',
                        'w-full',
                        'rounded-t-3xl',
                        'bg-white',
                        'shadow-main',
                        'md:rounded-md'
                    )}
                    style={{
                        height: isModalOpen ? '95%' : '0%',
                        opacity: isModalOpen ? 1 : 0,
                        transition: 'height 375ms, opacity 375ms',
                    }}
                >
                    <Column
                        className="relative overflow-y-auto rounded-t-3xl md:!h-full md:rounded-md"
                        style={{
                            height: '90%',
                        }}
                    >
                        {children}
                    </Column>
                </div>
            </ClickOutside>
        </Overlay>
    );
};
