// What we recieve back from the server
export interface IUser {
    userName: string;
    displayName: string;
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

