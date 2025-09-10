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
// 查询请求参数
interface AdvancedPaginationParams {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
}

export type {AdvancedPaginationParams}
// 删除请求参数
type DeleteParams = {
    id: number;
}
export type {DeleteParams}


// 高级表格通用查询返回参数
type AdvancedFinalResult = {
    code: 0 | 1 ;
    message: string;
    data?: any
}
export type {AdvancedFinalResult}

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

