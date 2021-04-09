import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/Activity';

interface IProps {
attendees: IAttendee[];
}

 const ActivityDetalSideBar: React.FC<IProps> = ({attendees}) => {

    return (
        <Fragment>
        <Segment
          textAlign='center'
          style={{ border: 'none' }}
          attached='top'
          secondary
          inverted
          color='orange'
        >
         {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
        </Segment>
        <Segment attached>
          <List relaxed divided>
            {attendees.map((attendee)=> (
              <Item key={attendee.username} style={{ position: 'relative' }}>
              {attendee.isHost && <Label
                style={{ position: 'absolute' }}
                color='red'
                ribbon='right'
              >
                Host
              </Label>
              }
              <Image size='tiny' src={attendee.image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profile/${attendee.username}`}> {attendee.displayname}</Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}> {attendee.following ? 'Following' : ''}</Item.Extra>
              </Item.Content>
            </Item>
            ))}
                
  
          </List>
        </Segment>
      </Fragment>
  
    )
}

export default observer (ActivityDetalSideBar);