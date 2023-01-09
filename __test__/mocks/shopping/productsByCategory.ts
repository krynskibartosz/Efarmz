import { faker } from '@faker-js/faker';

import {
    CHILDREN_ITEM,
    CATEGORY_TREE_ITEM,
    PRODUCTS_BY_CATEGORY_RESPONSE,
} from 'src/core/domains/models/shopping/catalog/product/by-category/mod_products_by_category';
import { createRandomCart } from './product';

const mockChildren: { [key: string]: CHILDREN_ITEM } = {};
const numChildren = faker.datatype.number(1);
for (let i = 0; i < numChildren; i++) {
    mockChildren[i] = {
        checked: faker.datatype.boolean(),
        id: faker.datatype.number(5),
        link: faker.internet.url(),
        name: faker.commerce.productName(),
    };
}
const mockCategory: CATEGORY_TREE_ITEM = {
    brandName: faker.image.imageUrl(),
    children: mockChildren,
    count: faker.datatype.number(5),
    id: faker.datatype.number(5),
    link: faker.internet.url(),
    name: faker.commerce.department(),
    slug: faker.lorem.paragraph(),
    slug_fr: faker.lorem.sentence(),
    checked: faker.datatype.boolean(),
    code: faker.datatype.number(5),
};

const mockCategories: { [key: string]: CATEGORY_TREE_ITEM } = {};
const numCategories = faker.datatype.number(5);
for (let i = 0; i < numCategories; i++) {
    mockCategories[faker.datatype.number()] = mockCategory;
}

export const mockCategoryApiResponse: PRODUCTS_BY_CATEGORY_RESPONSE = {
    products: createRandomCart(),
    categoriesTree: mockCategories,
    features_options: [],
};
