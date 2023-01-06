import { ApiPort } from 'src/ports/api';
import { RESPONSE } from '../../../../../core/domains/models/shopping/catalog/product/by-category/products-response';
import { PRODUCT_CATEGORY_API_RESPONSE } from '../../../../../core/domains/models/shopping/catalog/category/category';

export class CategoryService {
    api: ApiPort;

    constructor(api: ApiPort) {
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
