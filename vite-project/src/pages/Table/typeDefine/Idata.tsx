

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
    data: Album[]
    page: number,
    pageSize: number
    isLoading: boolean
    totalItems: number
    onPageChange: (page: number) => void
}

export type {Album,IProps}