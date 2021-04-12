export interface IProfile  {
    displayName: string,
    username: string,
    bio: string,
    mainImage: string,
    following: boolean,
    followersCount: number,
    followingCount: number,
    photos: IPhoto[]
}

export interface IPhoto {
    id: string,
    url: string,
    isMain: boolean,
}

export interface IUsersActivities {
    id: string,
    title: string,
    category: string,
    date: Date
}