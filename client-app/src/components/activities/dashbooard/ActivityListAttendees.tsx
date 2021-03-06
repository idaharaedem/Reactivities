import React from 'react'
import { Image, List, Popup } from 'semantic-ui-react'
import {IAttendee} from '../../../app/models/Activity'

interface IProps {
    attendees: IAttendee[];
}

const styles = {
    borderColor: 'red',
    borderWidth: 1
}

export const ActivityListAttendees: React.FC<IProps> = ({attendees}) => {
    return (
    <List horizontal>
        {attendees.map((attendee => (
            <List.Item key= {attendee.username}>
                <Popup header={attendee.displayname}
                trigger={
                    <Image size='mini'
                    circular src={attendee.image || '/assets/user.png'}
                    bordered
                    style={attendee.following ? styles : null}
                    />
                }
                />
        </List.Item>
        )))}
    </List>
    )
}
