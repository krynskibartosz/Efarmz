import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { ProductService } from 'src/infrastructure/api/shopping/catalog/product';
const baseURL = process.env.NEXT_PUBLIC_END_POINT as string;
export const api: ShoppingApiPort = new ShoppingApiAdapter(baseURL);
export const productsService = new ProductService(api);
