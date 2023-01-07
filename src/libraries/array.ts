import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export function removeElementById(array: PRODUCT[], id: string) {
    const index = array.findIndex((item) => item.id === id);
    if (index !== -1) {
        array.splice(index, 1);
    }
}
