import { useEffect, useRef } from 'react';

export function useUpdateEffect(
    callback: () => void,
    dependencies: unknown[]
): void {
    const firstRenderRef = useRef<boolean>(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        return callback();
    }, dependencies);
}
