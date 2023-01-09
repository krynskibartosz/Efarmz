import { PRODUCTS } from '../mod_product';

export interface CHILDREN_ITEM {
    id: number;
    name: string;
    link: string;
    checked: boolean;
}
export interface CATEGORY_TREE_ITEM {
    id: number;
    code: number;
    name: string;
    brandName: string;
    slug: string;
    slug_fr: string;
    count: number;
    link: string;
    checked: boolean;
    children: { [key: string]: CHILDREN_ITEM };
}
export interface CATEGORIES_TREE {
    [key: string]: CATEGORY_TREE_ITEM;
}
export type FEATURES_OPTIONS = [];

export interface PRODUCTS_BY_CATEGORY_RESPONSE {
    categoriesTree: CATEGORIES_TREE;
    features_options: FEATURES_OPTIONS;
    products: PRODUCTS;
}
