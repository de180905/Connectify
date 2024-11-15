import { useState, useCallback, useMemo } from 'react';

export function usePagingManagement(initialPage = 1, initialPageSize = -1) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [totalItems, setTotalItems] = useState(0);

    const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);

    const goToPage = useCallback((page) => {
        setCurrentPage(page);
    });

    const setTotal = useCallback((total) => {
        setTotalItems(total);
    });

    return {
        currentPage,
        totalPages,
        pageSize,
        totalItems,
        setPageSize,
        setTotal,
        goToPage,
    };
}

