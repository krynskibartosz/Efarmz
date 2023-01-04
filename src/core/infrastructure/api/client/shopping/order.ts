import { ApiPort } from 'src/ports/api';

type Order = {};

export class OrderService {
    api: ApiPort;

    constructor(api: ApiPort) {
        this.api = api;
    }

    async getOrders(): Promise<Order[]> {
        const response = await this.api.get('/users');
        return response.data;
    }

    async createOrder(user: Order): Promise<Order> {
        const response = await this.api.post('/users', user);
        return response.data;
    }

    async updateOrder(id: string, user: Order): Promise<Order> {
        const response = await this.api.put(`/users/${id}`, user);
        return response.data;
    }

    async deleteOrder(id: string): Promise<void> {
        await this.api.delete(`/users/${id}`);
    }
}
