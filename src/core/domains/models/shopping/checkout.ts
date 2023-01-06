import { ACTIONS } from '../../../browser/actions/shopping';
import { SHOPPING_CART } from './catalog/product/product-store';

export type SHOPPING_CART_STORE = {
    shoppingCart: SHOPPING_CART;
} & ACTIONS;