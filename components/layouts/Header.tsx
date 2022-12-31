import { Row, Column } from 'components/bases/containers/Containers';
import { GlobeAltIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { CATEGORIES } from 'services/products/types';

import useFetch from 'lib/hooks/useFetch';
import { useHasHydrated } from 'lib/hooks/useHasHydrated';
import { useModal } from 'lib/hooks/useModal';
import Link from 'next/link';
import useRootStore from 'store/useRoot';
import shallow from 'zustand/shallow';
import { SubNavbar } from 'services/products/category/SubNavbar';
import { DeliverySlotsModal } from 'services/user/delivery/DeliverySlotsModal';

export const Header = () => {
    const hasHydrated = useHasHydrated();

    const { shoppingCart: basicShoppingCart, user } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
            user: state.user,
        }),
        shallow
    );

    const {
        adress: { country, zipCode, deliveryDate, deliveryMode },
    } = user.data;

    const { data: categories } = useFetch<CATEGORIES>(
        'https://dev.efarmz.be/api/v1/categories',
        { method: 'GET' },
        60000
    );

    const modal = useModal();

    return (
        <>
            <DeliverySlotsModal modal={modal} />
            <header className="bg-white-300 border-b border-gray-200 shadow-main pt-5 w-full pb-4 mb-10 xl:px-32 px-5">
                <Row
                    verticalPosition="center"
                    horizontalPosition="between"
                    className="w-full gap-x-10 items-center mb-5 "
                >
                    <Row verticalPosition="center" className="w-full">
                        <Link href={'/'}>
                            <p className="text-center mr-3 text-green-700 text-4xl font-bold">
                                Efarmz
                            </p>
                        </Link>
                        {deliveryDate.length === 0 && hasHydrated && (
                            <p
                                className="cursor-pointer rounded-md hover:bg-green-100 w-max px-3 py-1 transition-all duration-300 ease-in-out text-green-700"
                                onClick={() => modal.toggle('deliverySlot')}
                            >
                                Choisir son créneaux horaire
                            </p>
                        )}
                        {deliveryDate.length > 0 && hasHydrated && (
                            <div
                                onClick={() => modal.toggle('deliverySlot')}
                                className="cursor-pointer rounded-md hover:bg-green-100 w-max px-3 py-1 transition-all duration-300 ease-in-out"
                            >
                                <Row
                                    verticalPosition="center"
                                    className="gap-x-1 text-green-700 hidden md:flex"
                                >
                                    <Column
                                        verticalPosition="center"
                                        className="h-full"
                                    >
                                        {/* todo: change icon by location icon */}
                                        <GlobeAltIcon className="h-7 " />
                                    </Column>
                                    <Column>
                                        <p className="text-xs ">
                                            Livraison le {deliveryDate}
                                        </p>
                                        <p className="text-xs ">
                                            {deliveryMode} - {country} {zipCode}
                                        </p>
                                    </Column>
                                </Row>
                            </div>
                        )}
                    </Row>

                    {hasHydrated && (
                        <Link href="/shopping-cart">
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
                    )}
                </Row>
                <nav className="h-5 mb-5 md:mb-0">
                    {categories && <SubNavbar categories={categories.data} />}
                </nav>
                <Row
                    verticalPosition="center"
                    className="gap-x-1 text-green-700  md:hidden w-full"
                    onClick={() => modal.toggle('deliverySlot')}
                >
                    <Column verticalPosition="center" className="h-full">
                        {/* todo: change icon by location icon */}
                        <GlobeAltIcon className="h-7 " />
                    </Column>
                    <Column>
                        {hasHydrated && (
                            <>
                                <p className="text-xs ">
                                    Livraison le {deliveryDate}
                                </p>
                                <p className="text-xs ">
                                    {deliveryMode} - {country} {zipCode}
                                </p>
                            </>
                        )}
                    </Column>
                </Row>
            </header>
        </>
    );
};
