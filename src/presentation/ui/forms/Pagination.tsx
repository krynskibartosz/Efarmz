import classNames from 'classnames';

export const Pagination = ({
    totalPages,
    currentPage,
    onChangePage,
}: {
    totalPages: number;
    currentPage: number;
    onChangePage: (e: number) => void;
}) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center">
                {pages.map((page) => {
                    const isCurrent = page === currentPage;

                    return (
                        <li
                            key={page}
                            onClick={() => onChangePage(page)}
                            className={classNames(
                                'mx-2',
                                'p-2',
                                'rounded-full',
                                'border',
                                'border-green-200',
                                'w-10',
                                'h-10',
                                'grid',
                                'place-content-center',
                                'hover:bg-gray-200',
                                'transition-all',
                                'duration-300',
                                'ease-in-out',
                                'cursor-pointer',
                                {
                                    'bg-green-200': isCurrent,
                                    'text-green-700': isCurrent,
                                    'border-green-200': isCurrent,
                                }
                            )}
                        >
                            <a className={``}>{page}</a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
