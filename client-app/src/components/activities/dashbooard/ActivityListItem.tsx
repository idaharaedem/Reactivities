import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import {format} from 'date-fns';
import { ActivityListAttendees } from './ActivityListAttendees';




export const ActivityListItem: React.FC<{activity:IActivity}> = ({activity}) => {
    const host = activity.attendees.filter(x => x.isHost)[0];

    return (
        <Segment.Group>
           <Segment clearing>
                <Item.Group >
                    <Item>
                    <Item.Image floated='right' size='tiny' style={{marginBottom: 5}} circular src={host.image || '/assets/user.png'}/>
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                        
                        <Item.Description>
                            
                          <Item.Description>
                            Hosted by <Link to= {`/profile/${host.username}`}> {host.displayname} </Link>
                            
                          </Item.Description>
                            
                            {activity.isHost &&
                            <Label 
                            basic 
                            color='red' 
                            content='You are hosting this event'/>
                            }   
                           
                           
                        </Item.Description>

                        <Item.Description>
           
                            {activity.isGoing && !activity.isHost &&

                            <Label 
                            basic 
                            color='brown' 
                            content='You are attending '/>
                            }   
                         
                        </Item.Description>
            
                        <Item.Extra> {activity.description} </Item.Extra>
                    </Item.Content>
                    </Item>
                </Item.Group>
            </Segment> 

            <Segment piled>
                <Icon name= 'clock'/> {format(activity.date, 'h: mm a')}
            </Segment>

            <Segment>
             <Icon name= 'marker'/> {activity.venue}, {activity.city}
            </Segment>

            <Segment secondary>
                <ActivityListAttendees attendees = {activity.attendees}/>
            </Segment>

            <Segment clearing>
                {/* <span>{activity.description}</span> */}
                <Button as={Link} to={`/activities/${activity.id}`} 
                floated='right'
                content='View' 
                color='olive'/>

            </Segment>
        </Segment.Group>
       

    )
}