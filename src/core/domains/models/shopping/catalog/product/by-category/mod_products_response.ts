import { PRODUCTS } from '../mod_product';

export interface CHILDREN_ITEM {
    checked: boolean;
    id: number;
    link: string;
    name: string;
}
type CHILDREN = CHILDREN_ITEM[];
interface PRODUCTS_TREE_ITEM {
    brandName: string;
    checked: boolean;
    children: CHILDREN;
    code: number;
    count: number;
    id: number;
    link: string;
    name: string;
    slug: string;
    slug_fr: string;
}
type PRODUCTS_TREE = PRODUCTS_TREE_ITEM[];
type FEATURES_OPTIONS = [];

export interface RESPONSE {
    categoriesTree: PRODUCTS_TREE;
    features_options: FEATURES_OPTIONS;
    products: PRODUCTS;
}
