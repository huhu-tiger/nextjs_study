import type { PhotoSchema } from "@backend/service/support/photo/type";


interface IProps {
    url:  string
    data: PhotoSchema[]
    page: number
    pageSize: number
    isLoading: boolean
    totalItems: number
    onPageChange:(page: number) => void
}

export type {IProps}