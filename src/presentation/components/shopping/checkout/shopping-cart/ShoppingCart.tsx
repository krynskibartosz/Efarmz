import { Column } from 'components';
import { useHasHydrated } from 'lib';
import { ShoppingCartItems } from './ShoppingCartItems';

export const ShoppingCart = () => {
    const hasHydrated = useHasHydrated();

    if (!hasHydrated) return <></>;
    return (
        <Column className="w-full order-2 md:order-1">
            <h1 className="text-3xl font-bold mb-10">
                {"Mon panier d'achats"}
            </h1>
            <ShoppingCartItems />
        </Column>
    );
};
