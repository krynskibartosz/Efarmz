import { ApiPort } from 'src/ports/api';

type Category = {};

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
    }): Promise<Category[]> {
        const response = await this.api.get(
            `categories/${query}?page=${currentPage}`
        );
        return response.products;
    }
    async getProductsCategories(url: string): Promise<Category[]> {
        const response = await this.api.get(url);
        return response;
    }
}
