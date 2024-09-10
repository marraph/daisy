import {useMemo, useState} from "react";

type SortDirection = 'asc' | 'desc';

type SortConfig<T> = {
    key: keyof T;
    direction: SortDirection;
}

type customSort<T> = (a: T, b: T, order: SortDirection) => number;

interface useTableSortProps<T> {
    data: T[];
    initialSort: SortConfig<T>;
    customSort?: Partial<Record<keyof T, customSort<T>>>;
}

export function useTableSort<T extends Record<string, any>>({ data, initialSort, customSort = {} }: useTableSortProps<T>) {
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>(initialSort);

    const sortedData = useMemo(() => {
        const sortableItems = [...data];
        const { key, direction } = sortConfig;

        return sortableItems.sort((a, b) => {
            if (customSort[key]) return customSort[key]!(a, b, direction);

            const aValue = a[key];
            const bValue = b[key];

            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig, customSort]);

    const requestSort = (key: keyof T) => {
        setSortConfig((prev) => ({
            key: key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    }

    return { sortedData, requestSort, sortConfig };
}