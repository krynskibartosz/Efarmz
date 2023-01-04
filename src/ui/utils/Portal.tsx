/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PORTAL = {
    children: ReactNode | ReactNode[];
    id?: string;
};

export const Portal = ({ children, id = '#root' }: PORTAL) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    if (mounted && document.querySelector(id))
        return (createPortal as any)(children, document.querySelector(id));
    return null;
};
