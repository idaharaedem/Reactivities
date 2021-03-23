// What we recieve back from the server
export interface IUser {
    username: string;
    displayname: string;
    token: string;
    image?: string;
}

//login values
export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}

