import { faker } from '@faker-js/faker';
import {
    PRODUCT_CATEGORY,
    PRODUCTS_CATEGORIES_API_RESPONSE,
} from 'src/core/domains/models/shopping/catalog/category/mod_categories';

const mockProductCategory: PRODUCT_CATEGORY = {
    banner: faker.image.imageUrl(),
    children: [],
    count: faker.datatype.number(),
    description_long: faker.lorem.paragraph(),
    description_short: faker.lorem.sentence(),
    feature: faker.datatype.number(),
    id: faker.datatype.number(),
    image: faker.image.imageUrl(),
    level: faker.random.word(),
    link: faker.internet.url(),
    name: faker.commerce.productName(),
    parent_id: faker.random.alphaNumeric(32),
    position: faker.datatype.number(),
    seo_description: faker.lorem.sentence(),
    seo_keywords: faker.lorem.words(),
    seo_title: faker.lorem.sentence(),
    thumbnail: faker.image.imageUrl(),
};

export const mockProductCategoryApiResponse: PRODUCTS_CATEGORIES_API_RESPONSE =
    {
        data: [mockProductCategory],
    };
