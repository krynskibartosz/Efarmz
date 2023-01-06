export type PRODUCTS = {
    current_page: number;
    data: PRODUCT[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

interface BRAND {
    id: string;
    name: string;
    parentId: string;
    banner: string;
    image: string;
    linkRewrite: string;
}

export interface PRODUCT {
    ARTID: string;
    availabilities_dates: undefined;
    availabilities_days: undefined;
    availability_date: undefined;
    bio: boolean;
    box_price: number;
    brand: BRAND;
    category_1: CATEGORY_N;
    category_2: CATEGORY_N;
    category_3: CATEGORY_N;
    description_long: string;
    description_short: string;
    discount_tag: undefined;
    dlc: string;
    ecotax: number;
    exp_date: undefined;
    fresh: boolean;
    gest_type: string;
    id: string;
    image: string;
    is_bio: boolean;
    is_deals: boolean;
    is_web_express: number;
    labels: LABELS;
    link: string;
    min_quantity: number;
    name: string;
    nbpers: number;
    new: boolean;
    options: { [key: number]: number };
    options_box: { [key: number]: number };
    out_of_delivery_window: boolean;
    parent_id: string;
    populaire: boolean;
    position: undefined;
    price: number;
    recipe_baking_time: string;
    recipe_link: undefined;
    recipe_prep_time: string;
    related: PRODUCT[];
    sale_price: number;
    step: number;
    stock_type: number;
    subscription_available: number;
    tag: boolean;
    tags: undefined[];
    thumbnail: string;
    type: string;
    unit: string;
    unity: undefined;
    vat: number;
}
interface CATEGORY_N {
    banner: string;
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
interface LABEL {
    id: string;
    name: string;
    product_id: string;
    type_id: string;
    type_name: string;
    link: string;
}
interface LABELS {
    labels: { [key: string]: LABEL };
}
