import { expect, test } from 'vitest';

import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

import { createRandomCart, createRandomProduct } from '__test__/mocks/product';

import {
    // decrementTheQuantityOfAProduct,
    removeProductWithSameID,
} from 'src/core/usecases/shopping/action';

const product = createRandomProduct();

test('removeProductWithSameID removes all products with the same ID from the cart', () => {
    function createExpectedResult(
        cartData: PRODUCT[],
        productToRemove: PRODUCT
    ): PRODUCT[] {
        return cartData.filter((product) => product.id !== productToRemove.id);
    }

    const cart = createRandomCart().data;
    const expectedResult = createExpectedResult(cart, product);

    removeProductWithSameID({ cart, product });
    expect(cart).toEqual(expectedResult);
});
