import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import {format} from 'date-fns';




export const ActivityListItem: React.FC<{activity:IActivity}> = ({activity}) => {


    return (
        <Segment.Group>
           <Segment clearing>
                <Item.Group>
                    <Item>
                    <Item.Image floated='right' size='tiny' circular src='/assets/user.png'/>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        
                        <Item.Description>
                            Hosted by .....
                        </Item.Description>
            
                        <Item.Extra>Additional Details</Item.Extra>
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
                Attendees will go here
            </Segment>

            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} 
                floated='right'
                content='View' 
                color='olive'/>

            </Segment>
        </Segment.Group>
       

    )
}