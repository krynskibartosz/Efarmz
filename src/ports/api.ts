export interface ApiPort {
    get(path: string, params?: object): Promise<any>;
    post(path: string, body?: object): Promise<any>;
    put(path: string, body?: object): Promise<any>;
    delete(path: string): Promise<any>;
}
