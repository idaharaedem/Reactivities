import React from 'react'
import { SyntheticEvent } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'

interface IProps {
    activities : IActivity[]
    selectActivity: (id:string) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string
    
}

export const ActivityList :React.FC<IProps> = ({activities, 
    selectActivity, 
    deleteActivity, 
    submitting, 
    target}) => {
    
    
    return (
    <Segment clearing>
        <Item.Group divided>
            {activities.map((activity => (
                  <Item key = {activity.id}>
                  <Item.Content>
                      <Item.Header as='a'>{activity.title}</Item.Header>
                      <Item.Meta>{activity.date}</Item.Meta>
                      <Item.Description>
                          <div> {activity.description} </div>
                          <div> {activity.city}, {activity.venue} </div>
                      </Item.Description>
                      <Item.Extra>
                        
                        <Button name={activity.id} 
                        loading={target === activity.id && submitting} 
                        onClick={(event)=> deleteActivity(event, activity.id)} 
                        floated='right' 
                        content='Delete' 
                        color= 'red'/>
                        
                        <Button onClick={()=> selectActivity(activity.id)} 
                        floated='right'
                        content='View' 
                        color='olive'/>
                          
                          <Label basic content={activity.category}/>
                      </Item.Extra>
                      <Item.Extra>Additional Details</Item.Extra>
                  </Item.Content>
                  </Item>
            )))}
      
    </Item.Group>
    </Segment>

    )
}
