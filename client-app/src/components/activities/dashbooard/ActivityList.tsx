import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'

interface IProps {
    activities : IActivity[]
    selectActivity: (id:string) => void;
    deleteActivity: (id: string) => void;
    
}

export const ActivityList :React.FC<IProps> = ({activities, selectActivity, deleteActivity}) => {
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
                        <Button onClick={()=> deleteActivity(activity.id)} floated='right' content='Delete' color= 'red'/>
                          <Button onClick={()=> selectActivity(activity.id)} floated='right' content='View' color='olive'/>
                          
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
