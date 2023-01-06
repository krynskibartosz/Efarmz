import produce from 'immer';
import { SHOPPING_CART } from 'src/core/domains/models/shopping/catalog/product/product-store';

import { SHOPPING_CART_STORE } from 'src/core/domains/models/shopping/checkout';
import { StoreSlice } from './useRoot';
import {
    decrementProductQuantity,
    removeAProductOfCart,
} from 'src/core/usecases/shopping/action';

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
                decrementProductQuantity({
                    cart: draft.shoppingCart.basic,
                    product,
                });
            })
        );
    },
    removeProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                removeAProductOfCart({
                    cart: draft.shoppingCart.basic,
                    product,
                });
            })
        );
    },
});
