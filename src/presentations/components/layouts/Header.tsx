import { ShoppingCartIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Row, Column } from 'src/presentations/ui';
import { useModal, useHasHydrated } from 'src/presentations/hooks';
import Link from 'next/link';
import { useFetchProductsCategories } from 'src/presentations/hooks/services/shopping/useFetchProductsCategory';
import shallow from 'zustand/shallow';
import { SubNavbar } from '../shopping';
import { DeliveryOptionsModal } from '../user';
import useRootStore from 'src/presentations/global-state/useRoot';
import { MODAL } from 'src/presentations/hooks/event/useModal';

export const Header = () => {
    const modal = useModal<'deliverySlot'>();
    const { categories } = useFetchProductsCategories();

    return (
        <>
            <DeliveryOptionsModal modal={modal} />
            <header className="bg-white fixed top-0 left-0 z-20 border-b border-gray-200 shadow-main pt-5 w-full pb-4  xl:px-32 px-5">
                <Row
                    verticalPosition="center"
                    horizontalPosition="between"
                    className="w-full gap-x-10 items-center mb-5 "
                >
                    <Row verticalPosition="center" className="w-full">
                        <Link href={'/'}>
                            <p className="text-center mr-3  text-4xl font-bold">
                                Efarmz
                            </p>
                        </Link>
                        <div className="hidden md:block">
                            <DeliveryDetailsDisplay modal={modal} />
                        </div>
                    </Row>

                    <ShoppingCartLink />
                </Row>
                <nav className="h-5 mb-5 md:mb-0">
                    {/* // todo: create a skeleton of text link */}
                    <SubNavbar categories={categories} />
                </nav>
                <div className="block md:hidden min-h-[32px]">
                    <DeliveryDetailsDisplay modal={modal} />
                </div>
            </header>
        </>
    );
};

const ShoppingCartLink = () => {
    const hasHydrated = useHasHydrated();
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
            user: state.user,
        }),
        shallow
    );

    if (hasHydrated) {
        return (
            <Link href="/shopping/checkout">
                <Row
                    className="gap-x-2 rounded-md hover:bg-green-100 w-max  md:flex  px-3 text-green-700 py-1 transition-all duration-300 ease-in-out"
                    horizontalPosition="right"
                    verticalPosition="center"
                >
                    <ShoppingCartIcon className="h-6 w-6" />
                    <p className="whitespace-nowrap">
                        Panier {basicShoppingCart.length}
                    </p>
                </Row>
            </Link>
        );
    }
    return <></>;
};

// todo: reset data when the modal close
const DeliveryDetailsDisplay = ({
    modal,
}: {
    modal: MODAL<'deliverySlot'>;
}) => {
    const hasHydrated = useHasHydrated();

    const { user } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
            user: state.user,
        }),
        shallow
    );
    const {
        adress: { country, zipCode, deliveryDate, deliveryMode },
    } = user.data;
    const hasDeliveryDate = deliveryDate.length > 0;
    if (!hasDeliveryDate && hasHydrated) {
        return (
            <p
                className="cursor-pointer rounded-md hover:bg-green-100 w-max px-3 py-1 transition-all duration-300 ease-in-out text-green-700"
                onClick={() => modal.toggle('deliverySlot')}
            >
                Choisir son créneaux horaire
            </p>
        );
    }
    if (hasDeliveryDate && hasHydrated) {
        return (
            <div
                onClick={() => modal.toggle('deliverySlot')}
                className="cursor-pointer rounded-md hover:bg-green-100 w-max px-3 py-1 transition-all duration-300 ease-in-out"
            >
                <Row
                    verticalPosition="center"
                    className="gap-x-1 text-green-700 "
                >
                    <Column verticalPosition="center" className="h-full">
                        {/* todo: change icon by location icon */}
                        <GlobeAltIcon className="h-7 " />
                    </Column>
                    <Column>
                        <p className="text-xs ">Livraison le {deliveryDate}</p>
                        <p className="text-xs ">
                            {deliveryMode} - {country} {zipCode}
                        </p>
                    </Column>
                </Row>
            </div>
        );
    }
    return <></>;
};
