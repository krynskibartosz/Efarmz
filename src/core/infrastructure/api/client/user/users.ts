import { ApiPort } from 'src/ports/api';

type User = {};

export class UserService {
    api: ApiPort;

    constructor(api: ApiPort) {
        this.api = api;
    }

    async getUser(): Promise<User[]> {
        const response = await this.api.get('/user');
        return response.data;
    }
    async getUserDeliveryDates(zipCode: string): Promise<User[]> {
        const response = await this.api.get(`/deliverydates/${zipCode}`);
        return response.data;
    }

    async createUser(user: User): Promise<User> {
        const response = await this.api.post('/users', user);
        return response.data;
    }

    async updateUser(id: string, user: User): Promise<User> {
        const response = await this.api.put(`/users/${id}`, user);
        return response.data;
    }
    async deleteUser(id: string): Promise<void> {
        await this.api.delete(`/users/${id}`);
    }
}
