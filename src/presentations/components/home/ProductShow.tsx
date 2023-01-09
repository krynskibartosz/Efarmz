import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';
import { ProductsContainer } from '../shopping/catalog/product/ProductsContainer';

export const ProductShow = ({
    products,
}: {
    products: PRODUCT[] | undefined;
}) => (
    <section>
        <h2>Nombre de produit {40}</h2>
        <ProductsContainer numberOfProductsToDisplay={40} products={products} />
    </section>
);
