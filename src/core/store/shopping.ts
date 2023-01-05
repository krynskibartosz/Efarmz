import produce from 'immer';
import { SHOPPING_CART } from 'src/core/infrastructure/api/models/shopping/catalog/product';
import { SHOPPING_CART_STORE } from 'src/core/infrastructure/api/models/shopping/orders';
import { StoreSlice } from 'src/core/store/useRoot';
import { removeElementById } from 'src/lib/array';

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
