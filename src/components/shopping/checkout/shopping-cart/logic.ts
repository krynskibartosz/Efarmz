import { PRODUCT } from 'src/core/infrastructure/api/models/shopping/catalog/product';

export const removeDuplicateProducts = (products: PRODUCT[]) => {
    const uniqueIds = new Set();
    return products.filter((product: PRODUCT) => {
        if (uniqueIds.has(product.id)) {
            return false;
        } else {
            uniqueIds.add(product.id);
            return true;
        }
    });
};
