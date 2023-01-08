import { ShoppingApiPort } from 'src/ports/shopping-port';

export class ShoppingApiAdapter implements ShoppingApiPort {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    async get<T>(path: string, params?: { [key: string]: string }): Promise<T> {
        let url = `${this.baseUrl}${path}`;
        if (params) {
            const searchParams = new URLSearchParams();
            for (const key of Object.keys(params)) {
                searchParams.set(key, params[key]);
            }
            url += `?${searchParams.toString()}`;
        }
        const response = await fetch(url, {
            method: 'GET',
        });
        return await response.json();
    }
}

// async post<T>(path: string, body?: object): Promise<T> {
//     const response = await fetch(`${this.baseUrl}${path}`, {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     return await response.json();
// }

// async put<T>(path: string, body?: object): Promise<T> {
//     const response = await fetch(`${this.baseUrl}${path}`, {
//         method: 'PUT',
//         body: JSON.stringify(body),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     return await response.json();
// }
// async delete<T>(path: string): Promise<T> {
//     const response = await fetch(`${this.baseUrl}${path}`, {
//         method: 'DELETE',
//     });
//     return await response.json();
// }
