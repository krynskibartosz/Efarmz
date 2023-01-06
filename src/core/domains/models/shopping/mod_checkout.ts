import { ACTIONS } from '../../../../presentation/global-state/actions/mod_shopping';
import { SHOPPING_CART } from './catalog/product/mod_product_store';

export type SHOPPING_CART_STORE = {
    shoppingCart: SHOPPING_CART;
} & ACTIONS;
