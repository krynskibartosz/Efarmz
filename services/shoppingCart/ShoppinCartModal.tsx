import { Row, Column } from 'components/bases/containers/Containers';
import { Overlay } from 'components/utils/Overlay';
import { ClickOutside } from 'components/utils/ClickOutside';
import { MODAL } from 'lib/hooks/useModal';
import { XCircleIcon } from '@heroicons/react/24/outline';
import useRootStore from 'store/useRoot';

export const ShoppindCartModal = ({ modal }: { modal: MODAL }) => {
    const isOpen = modal.opened === 'shoppingCart';
    const { shoppingCart, deleteProduct } = useRootStore.getState();

    return (
        <Overlay hidden={isOpen} onClickOutside={() => null}>
            <ClickOutside
                onClick={() => {
                    modal.close();
                }}
            >
                <div
                    className={`fixed  bottom-0 w-full rounded-t-3xl bg-white  shadow-main md:rounded-md ${
                        isOpen ? 'z-50 ' : '-z-50 '
                    }`}
                    style={{
                        height: isOpen ? '95%' : '0%',
                        opacity: isOpen ? 1 : 0,
                        transition: 'height 375ms, opacity 375ms',
                    }}
                >
                    <Column
                        className="relative overflow-y-auto rounded-t-3xl md:!h-full md:rounded-md "
                        style={{
                            height: '90%',
                        }}
                    >
                        <div
                            className="fixed top-10 right-2 z-30 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-fresh-gray-200 bg-white shadow-main transition-all duration-300 ease-in-out hover:scale-105 md:top-14 2xl:top-16"
                            onClick={() => {
                                modal.close();
                            }}
                        >
                            <XCircleIcon className="h-9 w-9  text-freshGreen" />
                        </div>

                        <Column className="relative w-full  h-[100%-20px] overflow-y-auto ">
                            <ul>
                                <p>
                                    {shoppingCart.basic.map((el, i) => (
                                        <Row className="gap-x-10">
                                            <p key={i}>{el.name}</p>
                                            <p
                                                onClick={() =>
                                                    deleteProduct(el)
                                                }
                                            >
                                                remove
                                            </p>
                                            <p>add</p>
                                        </Row>
                                    ))}
                                </p>
                            </ul>
                        </Column>
                    </Column>
                </div>
            </ClickOutside>
        </Overlay>
    );
};
