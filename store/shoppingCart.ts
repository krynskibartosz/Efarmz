import produce from 'immer';
import { StoreSlice } from './useRoot';
import { PRODUCT } from 'services/products/types';

type SHOPPING_CART_STORE = {
    shoppingCart: {
        express: any;
        subscriptions: any;
        basic: PRODUCT[];
    };
    addProduct: (reponse: PRODUCT) => void;
    deductProduct: (reponse: PRODUCT) => void;
    removeProduct: (reponse: PRODUCT) => void;
    deleteProduct: (reponse: PRODUCT) => void;
    // updateProduct: (reponse: PRODUCT) => void;
};

function removeElementById(array: any[], id: string) {
    const index = array.findIndex((item) => item.id === id);
    if (index !== -1) {
        return array.splice(index, 1);
    }
}

export const shoppingCartSlice: StoreSlice<SHOPPING_CART_STORE> = (set) => ({
    shoppingCart: {
        express: [],
        subscriptions: [],
        basic: [],
    },
    addProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                console.log(
                    '🚀 ~ file: shoppingCart.ts:25 ~ produce ~ state',
                    state
                );
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
    deleteProduct: (product) => {
        set((state) =>
            produce(state, (draft) => {
                draft.shoppingCart.basic = draft.shoppingCart.basic.filter(
                    (item) => item.id !== product.id
                );
            })
        );
    },
});
