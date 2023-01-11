import classNames from 'classnames';

export const Pagination = ({
    totalPages,
    currentPage,
    onChangePage,
}: {
    totalPages: number | undefined;
    currentPage: number;
    onChangePage: (e: number) => void;
}) => {
    const pages = [];
    if (totalPages !== undefined) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
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
                                'border-green-500',
                                'w-10',
                                'h-10',
                                'grid',
                                'place-content-center',
                                'text-green-700',
                                'transition-all',
                                'duration-300',
                                'ease-in-out',
                                'cursor-pointer font-medium',
                                {
                                    'hover:bg-green-200': !isCurrent,
                                    'bg-green-700 !text-white border-green-700 cursor-default':
                                        isCurrent,
                                }
                            )}
                        >
                            {page}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
