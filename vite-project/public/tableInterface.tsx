type Photo = {
    albumId : number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl ?: string,
    category ?: string,
    tags ?: string[],
    createdAt ?: string,
    views ?: number,
    likes ?: number,
}
export type {Photo}

// 高级表格
interface AdvancedPaginationParams {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
}

export type {AdvancedPaginationParams}


type AdvancedResult = {
    data: Photo[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        startIndex: number,
        endIndex: number
    };
    filters: {
        search: string,
        category: string,
        sortBy: string;
        sortOrder: string;
    }
    metadata: {
        availableCategories:string[],
        totalPhotos: number,
        filteredCount: number,
    },
};
export type {AdvancedResult}

// 简易表格
interface PaginationParams {
    page?: string;
    limit?: string;
    search?: string;
}
type SimpleResult = {
    data: Photo[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    search: string;
};
export type {SimpleResult}
export type {PaginationParams}

