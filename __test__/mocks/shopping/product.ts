import { faker } from '@faker-js/faker';
import {
    CATEGORY_N,
    LABEL,
    LABELS,
    PRODUCT,
    PRODUCTS,
} from 'src/core/domains/models/shopping/catalog/product/mod_product';

export const createRandomOptions = (): { [key: number]: number } => {
    const options: { [key: number]: number } = {};
    const numOptions = faker.datatype.number(5);
    for (let i = 0; i < numOptions; i++) {
        options[faker.datatype.number(10)] = faker.datatype.number(10);
    }
    return options;
};

export const createRandomOptionsBox = (): { [key: number]: number } => {
    const optionsBox: { [key: number]: number } = {};
    const numOptions = faker.datatype.number(5);
    for (let i = 0; i < numOptions; i++) {
        optionsBox[faker.datatype.number(10)] = faker.datatype.number(10);
    }
    return optionsBox;
};

export const createRandomCategory = (): CATEGORY_N => {
    return {
        banner: faker.image.imageUrl(),
        count: faker.datatype.number(5),
        description_long: faker.lorem.paragraph(),
        description_short: faker.lorem.sentence(),
        feature: faker.datatype.number(5),
        id: faker.datatype.number(5),
        image: faker.image.imageUrl(),
        level: faker.random.word(),
        link: faker.internet.url(),
        name: faker.commerce.department(),
        parent_id: faker.random.alphaNumeric(32),
        position: faker.datatype.number(5),
        seo_description: faker.lorem.sentence(),
        seo_keywords: faker.lorem.words(),
        seo_title: faker.lorem.sentence(),
        thumbnail: faker.image.imageUrl(),
    };
};

export const createRandomLabel = (): LABEL => {
    return {
        id: faker.random.alphaNumeric(32),
        name: faker.commerce.productMaterial(),
        product_id: faker.random.alphaNumeric(32),
        type_id: faker.random.alphaNumeric(32),
        type_name: faker.commerce.productAdjective(),
        link: faker.internet.url(),
    };
};

export const createRandomLabels = (): LABELS => {
    const labels: { [key: string]: LABEL } = {};
    const numLabels = faker.datatype.number(5);
    for (let i = 0; i < numLabels; i++) {
        labels[faker.random.alphaNumeric(32)] = createRandomLabel();
    }
    return { labels };
};

export const createRandomProduct = (): PRODUCT => {
    return {
        ARTID: faker.random.alphaNumeric(32),
        availabilities_days: [faker.date.weekday()],
        availabilities_dates: [faker.date.future().toISOString()],
        availability_date: faker.date.future().toISOString(),
        exp_date: faker.date.future().toISOString(),
        bio: faker.datatype.boolean(),
        box_price: parseFloat(faker.commerce.price()),
        brand: {
            id: faker.random.alphaNumeric(32),
            name: faker.company.name(),
            parentId: faker.random.alphaNumeric(32),
            banner: faker.image.imageUrl(),
            image: faker.image.imageUrl(),
            linkRewrite: faker.lorem.slug(),
        },
        category_1: createRandomCategory(),
        category_2: createRandomCategory(),
        category_3: createRandomCategory(),
        description_long: faker.lorem.paragraph(),
        description_short: faker.lorem.sentence(),
        discount_tag: faker.datatype.boolean() ? 'discount' : '',
        dlc: faker.date.future().toString(),
        ecotax: parseFloat(faker.commerce.price()),
        fresh: faker.datatype.boolean(),
        gest_type: faker.datatype.boolean() ? 'gift' : '',
        id: faker.random.alphaNumeric(32),
        image: faker.image.imageUrl(),
        is_bio: faker.datatype.boolean(),
        is_deals: faker.datatype.boolean(),
        is_web_express: faker.datatype.boolean(),
        labels: createRandomLabels(),
        link: faker.internet.url(),
        min_quantity: faker.datatype.number(10),
        name: faker.commerce.productName(),
        nbpers: faker.datatype.number(10),
        new: faker.datatype.boolean(),
        options: createRandomOptions(),
        options_box: createRandomOptionsBox(),
        out_of_delivery_window: faker.datatype.boolean(),
        parent_id: faker.random.alphaNumeric(32),
        populaire: faker.datatype.boolean(),
        position: faker.datatype.number(100),
        price: parseFloat(faker.commerce.price()),
        recipe_baking_time: faker.datatype.number(100).toString(),
        recipe_link: faker.internet.url(),
        recipe_prep_time: faker.datatype.number(10).toString(),
        related: [],
        sale_price: parseFloat(faker.commerce.price()),
        step: faker.datatype.number(10),
        stock_type: faker.datatype.number(100),
        subscription_available: faker.datatype.boolean(),
        tag: faker.datatype.boolean(),
        tags: [faker.commerce.productAdjective()],
        thumbnail: faker.image.imageUrl(),
        type: faker.commerce.product(),
        unit: faker.commerce.productMaterial(),
        unity: faker.commerce.productMaterial(),
        vat: faker.datatype.number(21),
    };
};

export const createRandomCart = (): PRODUCTS => {
    const numProducts = faker.datatype.number(1);
    const products = [];
    for (let i = 0; i < Math.max(1, numProducts); i++) {
        const product = createRandomProduct();
        if (product !== null && product !== undefined) {
            products.push(product);
        }
    }

    return {
        current_page: faker.datatype.number(10),
        data: products,
        first_page_url: faker.internet.url(),
        from: faker.datatype.number(numProducts),
        last_page: faker.datatype.number(10),
        last_page_url: faker.internet.url(),
        links: [
            {
                url: faker.internet.url(),
                label: faker.random.word(),
                active: faker.datatype.boolean(),
            },
        ],
        next_page_url: faker.internet.url(),
        path: faker.internet.url(),
        per_page: faker.datatype.number(50),
        prev_page_url: faker.internet.url(),
        to: faker.datatype.number(numProducts),
        total: numProducts,
    };
};
