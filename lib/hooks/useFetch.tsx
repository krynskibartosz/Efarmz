import { useRef, useState, useEffect } from 'react';

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

interface State<T> {
    data?: T;
    error?: { message: string };
    loading: boolean;
}

type Cache<T> = { [url: string]: CacheEntry<T> };

function useFetch<T = unknown>(
    url?: string,
    options?: RequestInit,
    cacheTime?: number,
    forceFetch?: boolean
): State<T> {
    const dataCache = useRef<Cache<T>>({});

    const cancelRequest = useRef<boolean>(false);

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
        loading: false,
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (!url) return;

        cancelRequest.current = false;

        const fetchData = async () => {
            setState({ ...initialState, loading: true });

            const cacheEntry = dataCache.current[url] as
                | CacheEntry<T>
                | undefined;
            if (
                cacheEntry &&
                !forceFetch &&
                (!cacheTime || Date.now() - cacheEntry.timestamp < cacheTime)
            ) {
                // Assign the data from the cache entry to the data variable
                const data = cacheEntry.data;
                setState({
                    data: JSON.stringify(
                        data as string | number | boolean,
                        null,
                        2
                    ) as T,
                    loading: false,
                });

                return;
            }

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                // Assign the data from the response to the data variable
                const data = (await response.json()) as T;
                dataCache.current[url] = { data, timestamp: Date.now() };
                if (cancelRequest.current) return;

                setState({ data: data as unknown as T, loading: false });
            } catch (error) {
                if (cancelRequest.current) return;

                setState({
                    error: error as unknown as { message: string },
                    loading: false,
                });
            }
        };

        void fetchData();

        return () => {
            cancelRequest.current = true;
        };
    }, [url]);

    return state;
}

export default useFetch;
