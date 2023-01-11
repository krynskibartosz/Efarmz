import Image from 'next/image';
import classnames from 'classnames';
import { Card, Column, Row } from 'src/presentations/ui';
import { PRODUCT } from 'src/core/domains/models/shopping/catalog/product/mod_product';

import { ProductCardDetails } from './ProductCardDetails';
import { ProductActions } from './ProductActions';

export const ProductCard = ({ product }: { product: PRODUCT }) => {
    return (
        <Card as="article">
            <div className="relative w-full h-min">
                <QuantityBadge product={product} />
                <div className="relative  aspect-square  w-full object-cover">
                    <Image
                        sizes="(max-width: 768px) calc(100vw - 40px),(max-width: 768px) calc(33vw - 60px), (max-width: 1280px) 25vw,"
                        fill
                        src={product.image}
                        alt={product.name}
                        className="rounded-t-xl"
                    />
                </div>
            </div>

            <Column verticalPosition="between" className="h-full w-full pt-3">
                <ProductCardDetails product={product} />
                <ProductActions product={product} />
            </Column>
        </Card>
    );
};

const QuantityBadge = ({ product }: { product: PRODUCT }) => {
    if (product.unit.length > 0)
        return (
            <div
                className={classnames(
                    'text-white',
                    'text-base',
                    'font-semibold',
                    'absolute ',
                    'py-0.5',
                    'px-3',
                    'top-5',
                    'left-5',
                    'z-10',
                    'bg-[#FF6B7A]',
                    'rounded-md'
                )}
            >
                {product.unit}
            </div>
        );
    return <></>;
};

//todo: adapt skeleton
// - find a way to skeleton text like put filter on it
// - adapt to the new design
export const ProductCardSkeleton = () => {
    return (
        <Column
            as="article"
            className={classnames(
                'h-fit',
                'w-full',
                'animate-pulse',
                'border',
                'rounded-lg',
                'border-fresh-gray-100'
            )}
        >
            {/* COVER */}
            <div
                className={classnames(
                    'relative',
                    'w-full',
                    'rounded-t-md',
                    'bg-gray-200',
                    'lg:bg-fresh-gray-200',
                    'min-h-72',
                    'h-72'
                )}
            >
                <span
                    className={classnames(
                        'h-5',
                        'w-16',
                        'absolute',
                        'top-5',
                        'left-5',
                        'rounded-md',
                        'bg-gray-100'
                    )}
                />
            </div>
            <Column verticalPosition="between" className=" h-full w-full pt-3">
                <Column className="w-full">
                    <Column className="pb-5 px-5 mb-4 w-full">
                        <span className=" h-[18px] mb-2 w-10/12  rounded-md bg-gray-200" />

                        <span className=" h-3.5 w-4/12   rounded-md bg-gray-100" />
                    </Column>
                    <Column className="px-5 pb-5 w-full">
                        <span className=" h-5 mb-5 w-14  rounded-md bg-gray-200" />
                        <Row className="w-ful gap-x-2">
                            <span className="h-5  w-16  rounded-full bg-gray-100" />
                            <span className="h-5  w-20  rounded-full bg-gray-100" />
                        </Row>
                    </Column>
                </Column>
                <Column className="w-full ">
                    <span className=" h-10  w-full   bg-gray-300" />
                    <span className=" h-10 rounded-b-md  w-full  bg-gray-400" />
                </Column>
            </Column>
        </Column>
    );
};
