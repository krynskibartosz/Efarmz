import Link from 'next/link';
import classNames from 'classnames';
import { Row } from 'src/ui';
import { PRODUCT_CATEGORY } from 'src/core/infrastructure/api/models/shopping/catalog/category';

export const SubNavbar = ({
    categories,
}: {
    categories: PRODUCT_CATEGORY[];
}) => {
    const formatName = (name: string) => name.replace(/ /g, '_');
    return (
        <Row
            horizontalPosition="between"
            className={classNames(
                'xl:gap-x-40',
                'gap-x-10',
                '!justify-between'
            )}
        >
            <p>Searchbar…</p>

            <Row
                className={classNames(
                    'gap-x-2',
                    'w-full',
                    'overflow-x-scroll',
                    'pb-2'
                )}
            >
                {categories?.map((el, i) => {
                    return (
                        <Link
                            href={`/shopping/catalog/${el.id}--${formatName(
                                el.name
                            )}`}
                            key={i}
                            className={classNames(
                                'whitespace-nowrap',
                                'px-3 py-0.5 rounded-md transition-all duration-300 ease-in-out  hover:bg-[#CBF6DA] text-green-700'
                            )}
                        >
                            {el.name}
                        </Link>
                    );
                })}
            </Row>
        </Row>
    );
};
