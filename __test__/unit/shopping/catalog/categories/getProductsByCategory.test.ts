import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import { describe, beforeAll, beforeEach, it, expect, afterAll } from 'vitest';

import { ShoppingApiPort } from 'src/ports/shopping-port';
import { CategoryService } from 'src/infrastructure/api/shopping/catalog/category';
import { rest } from 'msw';
import { mockCategoryApiResponse } from '__test__/mocks/shopping/productsByCategory';

class MockShoppingApiPort implements ShoppingApiPort {
    async get<T>(): Promise<T> {
        return Promise.resolve(mockCategoryApiResponse as T);
    }
}

// todo: put baseURL to a config files
describe('CategoryService', () => {
    const baseUrl = 'https://dev.efarmz.be/api/v1/';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let server;

    beforeAll(() => {
        (global as any).fetch = fetch;

        server = setupServer(
            rest.get(
                `${baseUrl}categories/1--Fruits_et__Légumes&page=1`,
                (req, res, ctx) => {
                    return res(ctx.json(mockCategoryApiResponse));
                }
            ),
            rest.get(`${baseUrl}categories`, (req, res, ctx) => {
                return res(ctx.json(mockCategoryApiResponse));
            })
        );
        server.listen();
    });

    let service: CategoryService;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    afterAll(() => server.close());

    beforeEach(() => {
        const mockApi = new MockShoppingApiPort();
        service = new CategoryService(mockApi);
    });

    describe('getProductBasedOnACategoryAndHisCurrentPage', () => {
        it('should return a PRODUCTS_BY_CATEGORY_RESPONSE object', async () => {
            const query = '1--Fruits_et__Légumes';
            const response =
                await service.getProductBasedOnACategoryAndHisCurrentPage({
                    currentPage: 1,
                    query: query,
                });

            expect(response).toEqual(mockCategoryApiResponse);
        });
    });
});
