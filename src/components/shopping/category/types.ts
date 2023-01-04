// todo: this sould go to models folder

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
