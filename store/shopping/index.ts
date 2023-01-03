import produce from 'immer';
import { StoreSlice } from 'store/useRoot';
import { PRODUCT, SHOPPING_CART, SHOPPING_CART_STORE } from './types';

function removeProductById(array: PRODUCT[], id: string) {
    const index = array.findIndex((item) => item.id === id);
    if (index !== -1) {
        return array.splice(index, 1);
    }
}

const initialState: SHOPPING_CART = {
    basic: [],
    express: [],
    subscriptions: [],
};

// todo: create small function of service, and separate it into a folder
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
                removeProductById(draft.shoppingCart.basic, product.id);
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
                    removeProductById(draft.shoppingCart.basic, product.id);
                }
                draft.shoppingCart.basic;
            })
        );
    },
});
