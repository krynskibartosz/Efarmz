import { ApiPort } from 'src/ports/api';

type Product = {};

export class ProductService {
    api: ApiPort;

    constructor(api: ApiPort) {
        this.api = api;
    }

    async getProducts(): Promise<Product[]> {
        const response = await this.api.get('products');
        return response.data;
    }
}
