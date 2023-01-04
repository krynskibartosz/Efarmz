import { useEffect, useRef } from 'react';

export function useUpdateEffect(
    callback: () => void,
    dependencies: any[]
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
