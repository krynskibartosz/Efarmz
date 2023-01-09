import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';

import { describe, beforeEach, it, expect, vi } from 'vitest';

// const baseUrl = process.env.NEXT_PUBLIC_END_POINT as string;
const baseUrl = process.env.NEXT_PUBLIC_END_POINT as string;

import fetch, { Headers } from 'node-fetch';
import { fail } from 'assert';

// Assign the fetch function to a variable in the global scope
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).fetch = fetch;

const mockResponse = {
    headers: new Headers({
        'Content-Type': 'application/json',
    }),
    method: 'GET',
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'OK',
    type: 'basic',
    url: process.env.NEXT_PUBLIC_END_POINT as string,
    bodyUsed: false,
    arrayBuffer: function (): Promise<ArrayBuffer> {
        return Promise.resolve(new ArrayBuffer(0));
    },
    blob: function (): Promise<Blob> {
        return Promise.resolve(new Blob());
    },
    formData: function (): Promise<FormData> {
        return Promise.resolve(new FormData());
    },
    json: function (): Promise<unknown> {
        return Promise.resolve({});
    },
    text: function (): Promise<string> {
        return Promise.resolve('');
    },
};

describe('ShoppingApiAdapter', () => {
    let adapter: ShoppingApiAdapter;

    beforeEach(() => {
        adapter = new ShoppingApiAdapter(baseUrl);
    });

    describe('get', () => {
        it('should construct the correct URL', async () => {
            const path = 'products';
            let expectedUrl = `${baseUrl}${path}`;

            // Test with no params
            // eslint-disable-next-line
            // @ts-ignore
            let spy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

            await adapter.get(path);
            expect(spy).toHaveBeenCalledWith(expectedUrl, { method: 'GET' });

            // Test with params
            const params = { page: '1' };
            const categoryID = '/4--Viandes/_Poissons';
            expectedUrl += `/${categoryID}?page=1`;
            // eslint-disable-next-line
            // @ts-ignore
            spy = vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);
            await adapter.get(`${path}/${categoryID}`, params);
            expect(spy).toHaveBeenCalledWith(expectedUrl, { method: 'GET' });
        });
        it('should handle errors when making the request to the API', async () => {
            // Set up the mock error response from the API
            const mockError = new Error('Error making request to API');
            const spy = vi.spyOn(global, 'fetch').mockRejectedValue(mockError);

            // Call the get method and assert that it throws the expected error
            const path = 'products';
            try {
                await adapter.get(path);
                fail('Expected get method to throw an error');
            } catch (error) {
                expect(error).toEqual(mockError);
            }

            // Restore the spy
            spy.mockRestore();
        });
    });
});
