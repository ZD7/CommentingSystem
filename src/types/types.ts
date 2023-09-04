export interface ICommentChild {
    id: string
    nameUser: string
    text: string
    date: string
    rating: number
    like: boolean
    urlAvatar: string
    type: string
    children: ICommentChild[]
}

export interface IComment {
    id: string
    nameUser: string
    text: string
    date: string
    rating: number
    like: boolean
    urlAvatar: string
    type: string
    children: Array<ICommentChild>
    nameParent?: string
}

