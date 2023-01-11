import { Column, Row } from 'components';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

export const ProductCardDetails = ({ product }: { product: PRODUCT }) => {
    return (
        <Column verticalPosition="between" className="w-full h-full">
            <div className="pb-5 px-5 ">
                <h3 className="text-gray-700 font-semibold text-lg">
                    {product.name}
                </h3>
                <div className="underline hover:text-green-700 text-gray-700 text-base -translate-y-0.5">
                    <a
                        aria-label="products"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={product.link}
                    >
                        {product.brand?.name}
                    </a>
                </div>
            </div>
            <div className="px-5 pb-5">
                <p className="pb-7 font-bold text-lg text-gray-900">
                    {product.price.toFixed(2) ?? product.box_price.toFixed(2)} €
                </p>
                <TagBadges product={product} />
            </div>
        </Column>
    );
};

const TagBadges = ({ product }: { product: PRODUCT }) => {
    const className =
        'text-[#00C5FF] font-medium border text-sm border-[#00C5FF] rounded-md py-0.5 px-3';
    return (
        <Row as="ul" className="w-ful gap-x-2">
            {product.is_bio && <li className={className}>Bio</li>}
            {product.new && <li className={className}>Nouveau</li>}
            {product.fresh && <li className={className}>Frais</li>}
        </Row>
    );
};
