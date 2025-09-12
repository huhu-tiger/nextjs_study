

import type {AdvancedResult} from '../../../public/type'




interface IProps {
    url: string
    data: AdvancedResult | undefined,
    page: number,
    pageSize: number
    isLoading: boolean
    // totalItems: number
    onPageChange: (page: number) => void
    handleDelete: (id: number) => void
    handleModify: (varisable:any) => void
    editingId: number | null
    editingTitle: string
    setEditingTitle: (title: string) => void
    handleCancelEdit: () => void
}

export type {IProps}