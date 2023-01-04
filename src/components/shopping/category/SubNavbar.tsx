import Link from 'next/link';
import classNames from 'classnames';
import { Row } from 'src/ui';
import { PRODUCT_CATEGORY } from 'src/core/infrastructure/api/models/shopping/catalog/category';

export const SubNavbar = ({
    categories,
}: {
    categories: PRODUCT_CATEGORY[];
}) => {
    console.log('🚀 ~ file: SubNavbar.tsx:11 ~ categories', categories);
    const formatName = (name: string) => name.replace(/ /g, '_');
    return (
        <Row
            horizontalPosition="between"
            className={classNames('xl:gap-x-40', 'gap-x-5', '!justify-between')}
        >
            <p>Searchbar…</p>

            <Row
                className={classNames(
                    'gap-x-5',
                    'w-full',
                    'overflow-x-scroll',
                    'pb-2'
                )}
            >
                {categories?.map((el, i) => {
                    return (
                        <Link
                            href={`/catalog/${el.id}--${formatName(el.name)}`}
                            key={i}
                            className={classNames('whitespace-nowrap')}
                        >
                            {el.name}
                        </Link>
                    );
                })}
            </Row>
        </Row>
    );
};
