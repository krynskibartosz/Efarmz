import { PRODUCT } from 'src/core/infrastructure/api/models/shopping/catalog/product';
import { ProductsContainer } from '../shopping/catalog/product/ProductsContainer';

export const ProductShow = ({
    products,
    isLoading,
}: {
    products: PRODUCT[];
    isLoading: boolean;
}) => (
    <section>
        <h2>Nombre de produit {40}</h2>
        <ProductsContainer
            numberOfProductsToDisplay={40}
            products={products}
            isLoading={isLoading}
        />
    </section>
);
