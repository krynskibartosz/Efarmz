import { ReactNode } from 'react';
import { Column } from './containers/Containers';
import Image from 'next/image';

interface CARD {
    cover: string;
    children: JSX.Element | ReactNode | ReactNode[];
    coverTag: string;
}

const MobileHover = ({ children }: { children: ReactNode | ReactNode[] }) => (
    <div className="h-full w-full rounded-md max-md:hover:bg-fresh-gray-50">
        {children}
    </div>
);

export const Card = ({
    children,
    cover = '/food.jpeg',
    coverTag = '',
}: CARD) => {
    return (
        <MobileHover>
            <Column className={`h-full rounded-md border border-gray-100`}>
                {/* COVER */}
                <div className="relative w-full">
                    <div className="text-white text-sm font-semibold absolute py-0.5 px-3 top-5 left-5 z-10 bg-green-500 rounded-md">
                        {coverTag}
                    </div>
                    <div className="relative h-52 w-full">
                        <Image
                            layout="fill"
                            objectFit="cover"
                            src={'/food.jpeg'}
                            className="overflow-x-hidden rounded-t-md"
                            alt="card-cover"
                        />
                    </div>
                </div>

                <Column className=" pt-2 w-full">{children}</Column>
            </Column>
        </MobileHover>
    );
};

type SkeletonCard = {
    cover?: boolean;
    children: ReactNode | ReactNode[] | JSX.Element;
};

export const CardSkeleton = ({ children, cover }: SkeletonCard) => {
    return (
        <Column
            className={`card-animation  h-full w-full animate-pulse rounded-md shadow-main`}
        >
            {/* COVER */}
            {cover && (
                <div className="relative w-full">
                    <div className="relative h-36 w-full rounded-t-md bg-fresh-gray-50" />
                </div>
            )}

            {children}
        </Column>
    );
};
