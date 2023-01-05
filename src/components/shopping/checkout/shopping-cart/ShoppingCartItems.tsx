import { Column } from 'components';

import { ProductCardInShoppingCart } from './ProductCart';
import useRootStore from 'src/core/store/useRoot';
import shallow from 'zustand/shallow';
import { removeDuplicateProducts } from './logic';

export const ShoppingCartItems = () => {
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );

    const distinctProductItems = removeDuplicateProducts(basicShoppingCart);

    return (
        <Column as="ul" className="w-full gap-y-6 overflow-y-auto">
            {distinctProductItems.map((product, i) => {
                return (
                    <li
                        key={i}
                        className="w-full border-b border-gray-200 pb-6"
                    >
                        <ProductCardInShoppingCart product={product} />
                    </li>
                );
            })}
        </Column>
    );
};