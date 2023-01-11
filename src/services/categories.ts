import { ShoppingApiAdapter } from 'src/adapters/shopping-api-adapter';
import { ShoppingApiPort } from 'src/ports/shopping-port';
import { CategoryService } from 'src/infrastructure/api/shopping/catalog/category';
const baseURL = process.env.NEXT_PUBLIC_END_POINT as string;
export const api: ShoppingApiPort = new ShoppingApiAdapter(baseURL);
export const categoryService = new CategoryService(api);
