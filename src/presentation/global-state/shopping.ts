import produce from 'immer';
import { SHOPPING_CART } from 'src/core/domains/models/shopping/catalog/product/mod_product_store';

import { SHOPPING_CART_STORE } from 'src/core/domains/models/shopping/mod_checkout';
import { StoreSlice } from './useRoot';
import {
    addProductToShoppingCart,
    decrementTheQuantityOfAProduct,
    removeProductWithSameID,
} from 'src/core/usecases/shopping/action';

const initialState: SHOPPING_CART = {
    basic: [],
    express: [],
    subscriptions: [],
};

export const shoppingCartSlice: StoreSlice<SHOPPING_CART_STORE> = (set) => ({
    shoppingCart: initialState,
    addProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = addProductToShoppingCart(
                    state.shoppingCart.basic,
                    product
                );
            })
        );
    },
    deductProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = decrementTheQuantityOfAProduct({
                    cart: state.shoppingCart.basic,
                    product,
                });
            })
        );
    },
    removeProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                removeProductWithSameID({
                    cart: draft.shoppingCart.basic,
                    product,
                });
            })
        );
    },
});
