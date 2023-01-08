export interface ShoppingApiPort {
    get<T>(path: string, params?: object): Promise<T>;
    // post<T>(path: string, body?: object): Promise<T>;
    // put<T>(path: string, body?: object): Promise<T>;
    // delete<T>(path: string): Promise<T>;
}
