import Link from 'next/link';
import classNames from 'classnames';
import { PRODUCT_CATEGORY } from 'src/core/store/shopping/types';
import { Row } from 'src/ui';

export const SubNavbar = ({
    categories,
}: {
    categories: PRODUCT_CATEGORY[];
}) => {
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
