import { ApiPort } from 'src/ports/api';

export class ApiAdapter implements ApiPort {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(path: string, params?: object): Promise<any> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'GET',
            params: params,
        });
        return await response.json();
    }

    async post(path: string, body?: object): Promise<any> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }

    async put(path: string, body?: object): Promise<any> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    }
    async delete(path: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            method: 'DELETE',
        });
        return await response.json();
    }
}
