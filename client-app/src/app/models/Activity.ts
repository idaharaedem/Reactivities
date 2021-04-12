export interface IActivitiesEnvelope {
    activities: IActivity[];
    activityCount: number
}

export interface IActivity 
{
    id : string;
    title : string;
    description : string;
    category : string;
    date : Date;
    city : string;
    venue : string;
    attendees: IAttendee[];
    comments: IComment[]
    //For currently logged in user
    isGoing: boolean;
    isHost: boolean;
}

export interface IActivityFormValues extends Partial <IActivity> 
{
    time?: Date
}

export class ActivityFormValues implements IActivityFormValues {
// Initialising the original values for when you implement it into your form
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string =  '';
    venue: string = '';

    constructor(initial?: IActivityFormValues) {
        if(initial && initial.date) {
            initial.time = initial.date;
        }
        // populates all the initial values you get from the constructor to the Activity form values
        Object.assign(this, initial)
    }
}

export interface IAttendee {
    username: string;
    displayname: string;
    image: string;
    isHost: boolean;
    following?: boolean;
}

//has to now be the dto properties since youre getting it from client side
export interface IComment {
    id: string,
    body: string,
    createdAt: Date,
    username: string,
    displayName: string,
    photos: string

}