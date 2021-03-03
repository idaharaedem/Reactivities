import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';
import {Loading} from '../../../app/layout/Loading';

interface paramDetails {
    id: string;
}


//RouteComponentProps access to our history, location, match etc
 const Details: React.FC<RouteComponentProps<paramDetails>> = ({match, history}) => {
    
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity, loadActivity, loadingInitial } = activityStore


    
    useEffect(() => {
     loadActivity(match.params.id)   
    }, [loadActivity, match.params.id]);

    //if loading component or activity is undefined keep loading
    if(loadingInitial || !activity) return <Loading content={'Loading Activity'}/>

    return (
        //takes up all the space
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{activity!.title}</Card.Header>
            <Card.Meta>
                <span>{activity!.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity!.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                    <Button as = {Link} to= {`/manage/${activity.id}`} basic color="blue" content="Edit"/>
                    <Button onClick={()=> history.push('/activities')} basic color="grey" content="Cancel"/>
                </Button.Group>
            </Card.Content>
     </Card>
    )
}

export default observer (Details);
