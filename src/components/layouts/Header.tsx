import { GlobeAltIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useHasHydrated } from 'src/hooks/useHasHydrated';
import { MODAL, useModal } from 'src/hooks/useModal';
import Link from 'next/link';
import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';
import { Row, Column } from 'src/ui/bases';
import { SubNavbar } from 'src/components/shopping';
import { DeliveryOptionsModal } from 'src/components/user';
import { useFetchProductsCategories } from '../../hooks/services/useFetchProductsCategory';

export const Header = () => {
    const modal = useModal();
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

                    <ShoppingCartLink modal={modal} />
                </Row>
                <nav className="h-5 mb-5 md:mb-0">
                    <SubNavbar categories={categories?.data} />
                </nav>
                <div className="block md:hidden">
                    <DeliveryDetailsDisplay modal={modal} />
                </div>
            </header>
        </>
    );
};

const ShoppingCartLink = ({ modal }: { modal: MODAL }) => {
    const hasHydrated = useHasHydrated();
    const { shoppingCart: basicShoppingCart, user } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
            user: state.user,
        }),
        shallow
    );

    if (hasHydrated) {
        return (
            <Link href="/shopping/cart">
                <Row
                    className="gap-x-2 rounded-md hover:bg-green-100 w-max  md:flex  px-3 text-green-700 py-1 transition-all duration-300 ease-in-out"
                    horizontalPosition="right"
                    verticalPosition="center"
                >
                    <ShoppingCartIcon className="h-6 w-6" />
                    <p
                        className="whitespace-nowrap"
                        onClick={() => modal.toggle('shoppingCart')}
                    >
                        Panier {basicShoppingCart.length}
                    </p>
                </Row>
            </Link>
        );
    }
    // todo: create a skeleton of text link
    return <></>;
};

const DeliveryDetailsDisplay = ({ modal }: { modal: MODAL }) => {
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
