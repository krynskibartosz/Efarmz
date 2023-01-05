import { Category } from './category';

export interface Brand {
    id: string;
    name: string;
    parentId: string;
    banner: string;
    image: string;
    linkRewrite: string;
}

export interface PRODUCT {
    artId: string;
    availabilitiesDates: string[];
    availabilitiesDays: string[];
    availabilityDate: string;
    bio: boolean;
    boxPrice: number;
    brand: Brand;
    category1: Category;
    category2: Category;
    category3: Category;
    descriptionLong: string;
    descriptionShort: string;
    discountTag: string;
    dlc: string;
    ecotax: number;
    expDate: string;
    fresh: boolean;
    gestType: string;
    id: string;
    image: string;
    linkRewrite: string;
    price: number;
    quantity: number;
    title: string;
    unit: string;
    unitSize: string;
    name: string;
    is_bio: boolean;
    new: boolean;
    link: string;
}

export type SHOPPING_CART = {
    basic: PRODUCT[];
    express: PRODUCT[];
    subscriptions: PRODUCT[];
};

// todo: Action type should go to another folder
export type ACTIONS = {
    addProduct: (product: PRODUCT) => void;
    deductProduct: (product: PRODUCT) => void;
    removeProduct: (product: PRODUCT) => void;
};
