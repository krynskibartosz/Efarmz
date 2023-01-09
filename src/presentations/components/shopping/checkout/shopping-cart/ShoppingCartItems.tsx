import { Column } from 'src/presentations/ui';

import { ProductCardInShoppingCart } from './ProductCart';
import shallow from 'zustand/shallow';
import { removeDuplicateProducts } from './logic';
import useRootStore from 'src/presentations/global-state/useRoot';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export const getSortedCartItems = (products: PRODUCT[]) => {
    const distinctProductItems = removeDuplicateProducts(products);
    return distinctProductItems.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    });
};

export const ShoppingCartItems = () => {
    const { shoppingCart: basicShoppingCart } = useRootStore(
        (state) => ({
            shoppingCart: state.shoppingCart.basic,
        }),
        shallow
    );

    return (
        <Column as="ul" className="w-full gap-y-6 overflow-y-auto">
            {getSortedCartItems(basicShoppingCart).map((product, i) => {
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
