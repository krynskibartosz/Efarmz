import { ApiPort } from 'src/ports/api';
import {
    PRODUCT,
    PRODUCTS,
} from '../../../../../core/domains/models/shopping/catalog/product/product';

export class ProductService {
    api: ApiPort;

    constructor(api: ApiPort) {
        this.api = api;
    }

    async getProducts(): Promise<PRODUCT[]> {
        const response = await this.api.get<PRODUCTS>('products');
        return response.data;
    }
}
