import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'

interface IProps {
    activity: IActivity
    setEditMode: (editMode: boolean) => void
    setSelectedActivity: (activity: IActivity | null) => void
}

export const Details: React.FC<IProps> = ({activity, setEditMode, setSelectedActivity}) => {
    return (
        //takes up all the space
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                    <Button onClick={()=> setEditMode(true)} basic color="blue" content="Edit"/>
                    <Button onClick={()=> setSelectedActivity(null)} basic color="grey" content="Cancel"/>
                </Button.Group>
            </Card.Content>
     </Card>
    )
}
