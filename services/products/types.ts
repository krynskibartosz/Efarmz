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

export interface API_PRODUCT_RESPONSE {
    current_page: number;
    data: PRODUCT[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface Brand {
    id: string;
    name: string;
    parentId: string;
    banner: string;
    image: string;
    linkRewrite: string;
}

export interface Category {
    id: number;
    name: string;
    parentId: string;
    banner: string;
    image: string;
    linkRewrite: string;
}

export interface PRODUCT_CATEGORY {
    banner: string;
    children: any[];
    count: number;
    description_long: string;
    description_short: string;
    feature: number;
    id: number;
    image: string;
    level: string;
    link: string;
    name: string;
    parent_id: string;
    position: number;
    seo_description: string;
    seo_keywords: string;
    seo_title: string;
    thumbnail: string;
}

export type CATEGORIES = {
    data: PRODUCT_CATEGORY[];
};
