import produce from 'immer';

import { SHOPPING_CART_STORE } from 'src/core/domains/models/shopping/checkout';
import { StoreSlice } from 'src/core/browser/useRoot';
import { removeElementById } from 'src/libraries/array';
import { SHOPPING_CART } from '../domains/models/shopping/catalog/product/product-store';

const initialState: SHOPPING_CART = {
    basic: [],
    express: [],
    subscriptions: [],
};

// todo!: there's a bug when the remove product is used in the shopping cart,
//! It re order the list when we deduct a product from the shoppingCart
export const shoppingCartSlice: StoreSlice<SHOPPING_CART_STORE> = (set) => ({
    shoppingCart: initialState,
    addProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = [
                    ...state.shoppingCart.basic,
                    product,
                ];
            })
        );
    },
    deductProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                removeElementById(draft.shoppingCart.basic, product.id);
                draft.shoppingCart.basic;
            })
        );
    },
    removeProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                while (
                    draft.shoppingCart.basic.some(
                        (item) => item.id === product.id
                    )
                ) {
                    removeElementById(draft.shoppingCart.basic, product.id);
                }
                draft.shoppingCart.basic;
            })
        );
    },
});
