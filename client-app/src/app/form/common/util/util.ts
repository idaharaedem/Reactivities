import { IActivity, IAttendee } from "../../../models/Activity";
import { IUser } from "../../../models/User";

export const combineDateAndTime = (date:Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00'

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    //day of the week not day of the month
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
}

export const checkIfGoingAndHost = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some( s => s.username === user.username);
    activity.isHost = activity.attendees.some( s => s.username === user.username && s.isHost);

   return activity;
};

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayname: user.displayname,
        isHost: false,
        username: user.username,
        image: user.image!
    }
}