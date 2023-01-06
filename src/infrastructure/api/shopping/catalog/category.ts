import { PRODUCT_CATEGORY_API_RESPONSE } from 'src/core/domains/models/shopping/catalog/category/mod_category';
import { RESPONSE } from 'src/core/domains/models/shopping/catalog/product/by-category/mod_products_response';
import { ShoppingApiPort } from 'src/ports/shopping-port';

export class CategoryService {
    api: ShoppingApiPort;

    constructor(api: ShoppingApiPort) {
        this.api = api;
    }

    async getProductBasedOnACategoryAndHisCurrentPage({
        currentPage,
        query,
    }: {
        currentPage: number;
        query: string;
    }): Promise<RESPONSE> {
        const response = await this.api.get<RESPONSE>(
            `categories/${query}?page=${currentPage}`
        );
        return response;
    }
    async getProductsCategories(
        url: string
    ): Promise<PRODUCT_CATEGORY_API_RESPONSE> {
        const response = await this.api.get<PRODUCT_CATEGORY_API_RESPONSE>(url);
        return response;
    }
}
