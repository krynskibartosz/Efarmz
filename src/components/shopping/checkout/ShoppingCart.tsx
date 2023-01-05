import { Column } from 'components';
import { useHasHydrated } from 'lib';
import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';
import { ProductCardInShoppingCart } from './ProductCart';

export const ShoppingCart = () => {
    // todo: create an vertical scroll on products container
    const hasHydrated = useHasHydrated();
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );

    const uniqueProducts = Array.from(
        new Set(basicShoppingCart.map((product) => product.id))
    ).map((id) => {
        return basicShoppingCart.find((product) => product.id === id);
    });
    if (!hasHydrated) return <></>;
    return (
        <Column as="ul" className="w-full gap-y-10">
            {uniqueProducts.map((product, i) => {
                return (
                    <li key={i} className="w-full">
                        {/* todo: fix this TS warning */}
                        <ProductCardInShoppingCart
                            //  @ts-ignore
                            product={product}
                        />
                    </li>
                );
            })}
        </Column>
    );
};
