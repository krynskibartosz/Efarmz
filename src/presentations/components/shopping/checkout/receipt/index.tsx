import { useHasHydrated } from 'src/presentations/hooks';

import { CommandResume } from './CommandResume';
import { Column } from 'src/presentations/ui';

export const Receipt = () => {
    const hasHydrated = useHasHydrated();

    if (hasHydrated) {
        return (
            <Column className="bg-[#EEFCF3]  h-96 p-5 order-1 md:order-2 w-full">
                <h2 className="text-xl font-bold">Mon ticket de caisse</h2>
                <CommandResume />{' '}
            </Column>
        );
    }
    return <></>;
};
