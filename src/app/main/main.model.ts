export interface Music {
    songId: number,
    albumId: number,
    albumName: string,
    songName: string
    url: string,
    thumbnailUrl: string,
    userId?: number
}

export interface Albums {
    userId: number,
    id: number,
    title: string,
    albumTitle?: string
}

export interface Photos {
    albumId: number,
    id: number,
    title: string,
    songTitle: string,
    url: string,
    thumbnailUrl: string
}