

let data={
    "albumId": 1,
        "id": 11,
        "title": "nihil at amet non hic quia qui",
        "url": "https://via.placeholder.com/600/1ee8a4",
        "thumbnailUrl": "https://via.placeholder.com/150/1ee8a4"
}

type Album = typeof data


interface IProps {
    url: string
    data: any[]
    page: number,
    pageSize: number
    isLoading: boolean
    totalItems: number
    onPageChange: (page: number) => void
    handleDelete: (id: number) => void
}

export type {Album,IProps}