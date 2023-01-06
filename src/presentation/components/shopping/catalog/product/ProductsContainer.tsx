import classnames from 'classnames';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/product';
import { ProductCardSkeleton, ProductCard } from './ProductCard';

type PRODUCT_CONTAINER_PROPS = {
    products: PRODUCT[] | undefined;
    isLoading: boolean;
    numberOfProductsToDisplay: number;
};

export function ProductsContainer({
    products,
    isLoading,
    numberOfProductsToDisplay,
}: PRODUCT_CONTAINER_PROPS) {
    return (
        <ul
            className={classnames(
                'grid',
                'w-full',
                'grid-cols-12',
                'grid-rows-6',
                'gap-y-8',
                'md:gap-x-14',
                'md:gap-y-12'
            )}
        >
            <ProductList
                isLoading={isLoading}
                numberOfProductsToDisplay={numberOfProductsToDisplay}
                products={products}
            />
        </ul>
    );
}

const productGridClassName = classnames(
    'col-span-full',
    'row-span-6',
    'md:col-span-6',
    'xl:col-span-4',
    '2xl:col-span-4'
);

const ProductList = ({
    products,
    isLoading,
    numberOfProductsToDisplay,
}: PRODUCT_CONTAINER_PROPS) => {
    if (isLoading)
        return new Array(numberOfProductsToDisplay).fill({}).map((_, i) => {
            if (i > numberOfProductsToDisplay) return <></>;
            return (
                <li className={productGridClassName} key={i}>
                    <ProductCardSkeleton />
                </li>
            );
        });
    return products?.map((product: PRODUCT, i) => {
        if (i > numberOfProductsToDisplay) return <></>;
        return (
            <li className={productGridClassName} key={product.id}>
                <ProductCard product={product} />
            </li>
        );
    });
};
