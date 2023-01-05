import { Column } from 'components';
import { useHasHydrated } from 'lib';
import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';
import { ProductCardInShoppingCart } from './ProductCart';
import { PRODUCT } from 'src/core/infrastructure/api/models/shopping/catalog/product';

export const ShoppingCart = () => {
    // todo: create an vertical scroll on products container
    const hasHydrated = useHasHydrated();
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );

    const uniqueProducts = (basicShoppingCart as PRODUCT[]).reduce(
        (acc, product) => {
            if (!acc.find((p: PRODUCT) => p.id === product.id)) {
                // @ts-ignore
                acc.push(product);
            }
            return acc;
        },
        []
    );

    if (!hasHydrated) return <></>;
    return (
        <Column as="ul" className="w-full gap-y-10 overflow-y-auto">
            {uniqueProducts.map((product, i) => {
                return (
                    <li key={i} className="w-full">
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
