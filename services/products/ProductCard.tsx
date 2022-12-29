import { PRODUCT } from 'services/products/types';
import { Row, Column } from 'components/bases/containers/Containers';
import { Card } from 'components/bases/Card';
import useRootStore from 'store/useRoot';

export const ProductCard = ({ product }: { product: PRODUCT }) => {
    const { addProduct } = useRootStore.getState();

    return (
        <Card
            cover={'https://api.unsplash.com/photos/random?query=food'}
            coverTag={product.unit}
            key={product.id}
        >
            <div className="pb-5 px-5 ">
                <p className="text-gray-700 font-semibold">{product.name}</p>
                <div className="underline hover:brightness-50 text-gray-500 text-sm -translate-y-0.5">
                    <a
                        aria-label="products"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={product.link}
                    >
                        {product?.brand?.name}
                    </a>
                </div>
            </div>
            <div className="px-5 pb-5">
                <p className="pb-5 font-bold">{product.price.toFixed(2)} €</p>
                <Row className="w-ful gap-x-2">
                    <Badges product={product} />
                </Row>
            </div>
            <Column className="w-full ">
                <button
                    disabled={false}
                    className="text-white hover:brightness-110 font-semibold py-2 w-full bg-green-500"
                    onClick={() => addProduct(product)}
                >
                    Ajouter au panier
                </button>
                <button
                    disabled={false}
                    className="text-white rounded-b-md hover:brightness-110 ligth font-semibold py-2 w-full bg-yellow-500"
                >
                    Ajouter à l'abonnement
                </button>
            </Column>
        </Card>
    );
};

const Badges = ({ product }: { product: PRODUCT }) => {
    if (product.is_bio)
        return (
            <p className="text-gray-500 border text-sm border-gray-200 rounded-md py-0.5 px-3">
                Bio
            </p>
        );
    if (product.new)
        return (
            <p className="text-gray-500 border text-sm border-gray-200 rounded-md py-0.5 px-3">
                Bio
            </p>
        );
    if (product.fresh)
        return (
            <p className="text-gray-500 border text-sm border-gray-200 rounded-md py-0.5 px-3">
                Bio
            </p>
        );

    return <></>;
};
