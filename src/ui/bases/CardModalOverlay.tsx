import classNames from 'classnames';
import { MODAL } from 'src/hooks/useModal';
import { Overlay, ClickOutside } from '../utils';
import { Column } from './containers/Containers';

export const CardModalOverlay = ({
    children,
    modal,
}: {
    children: JSX.Element;
    modal: MODAL;
}) => {
    const isModalOpen = modal.opened === 'deliverySlot';

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
