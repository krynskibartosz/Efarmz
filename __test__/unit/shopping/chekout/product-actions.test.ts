import { expect, test } from 'vitest';

import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

import {
    createRandomCart,
    createRandomProduct,
} from '__test__/mocks/shopping/product';

import {
    decrementTheQuantityOfAProduct,
    removeProductWithSameID,
    setCategories,
    addProductToShoppingCart,
} from 'src/core/usecases/shopping/product-action';
import { mockProductCategoryApiResponse } from '__test__/mocks/shopping/categories';

test('addProductToShoppingCart adds a product to the shopping cart', () => {
    const state = createRandomCart();
    const product = createRandomProduct();
    const result = addProductToShoppingCart(state.data, product);
    const expectedResult = [...state.data, product];
    expect(result).toEqual(expectedResult);
});

test('removeProductWithSameID removes all products with the same ID from the cart', () => {
    const cart = createRandomCart().data;
    const createExpectedResult = (
        cartData: PRODUCT[],
        productToRemove: PRODUCT
    ): PRODUCT[] =>
        cartData.filter((product) => product.id !== productToRemove.id);

    const expectedResult = createExpectedResult(cart, cart[cart.length - 1]);

    removeProductWithSameID({ cart, product: cart[0] });
    expect(cart).toEqual(expectedResult);
});

test('decrementTheQuantityOfAProduct removes the product from the cart', () => {
    const cart = createRandomCart().data;
    const expected = cart.length - 1;
    const result = decrementTheQuantityOfAProduct({
        cart,
        product: cart[cart.length - 1],
    }).length;
    expect(result).toEqual(expected);
});

test('decrementTheQuantityOfAProduct removes the product from the cart and does not change the order of the elements in the list', () => {
    const cart = createRandomCart().data;
    const originalCart = [...cart];
    decrementTheQuantityOfAProduct({
        cart,
        product: cart[cart.length - 1],
    });
    let isOrderChanged = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] !== originalCart[i]) {
            isOrderChanged = true;
            break;
        }
    }
    expect(isOrderChanged).toBe(false);
});
test('addProductToShoppingCart adds a product to the shopping cart', () => {
    const state = mockProductCategoryApiResponse;
    const result = setCategories(
        { products: [], categories: state.data },
        state.data
    );
    const expectedResult = [...state.data];
    expect(result.categories).toEqual(expectedResult);
});
