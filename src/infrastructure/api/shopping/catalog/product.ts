import { PRODUCTS } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { ShoppingApiPort } from 'src/ports/shopping-port';

export class ProductService {
    api: ShoppingApiPort;

    constructor(api: ShoppingApiPort) {
        this.api = api;
    }

    async getProducts(): Promise<PRODUCTS> {
        const response = await this.api.get<PRODUCTS>('products');
        return response;
    }
}
