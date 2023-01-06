import { PRODUCT } from './product';

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
