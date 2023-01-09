import { PRODUCTS_CATEGORIES_API_RESPONSE } from 'src/core/domains/models/shopping/catalog/category/mod_categories';
import { PRODUCTS_BY_CATEGORY_RESPONSE } from 'src/core/domains/models/shopping/catalog/product/by-category/mod_products_by_category';
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
    }): Promise<PRODUCTS_BY_CATEGORY_RESPONSE> {
        const response = await this.api.get<PRODUCTS_BY_CATEGORY_RESPONSE>(
            `categories/${query}?page=${currentPage}`
        );
        return response;
    }
    async getProductsCategories(
        url: string
    ): Promise<PRODUCTS_CATEGORIES_API_RESPONSE> {
        const response = await this.api.get<PRODUCTS_CATEGORIES_API_RESPONSE>(
            url
        );
        return response;
    }
}
