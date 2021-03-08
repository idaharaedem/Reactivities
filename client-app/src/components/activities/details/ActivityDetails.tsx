import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';
import {Loading} from '../../../app/layout/Loading';
import ActivityDetailHeader  from './ActivityDetailHeader';
import  ActivityDetailInfo  from './ActivityDetailInfo';
import  ActivityDetailChat  from './ActivityDetailChat';
import ActivityDetalSideBar  from './ActivityDetalSideBar';

interface paramDetails {
    id: string;
}


//RouteComponentProps access to our history, location, match etc
 const Details: React.FC<RouteComponentProps<paramDetails>> = ({match, history}) => {
    
    const activityStore = useContext(ActivityStore);
    const {selectedActivity: activity, loadActivity, loadingInitial } = activityStore


    
    useEffect(() => {
     loadActivity(match.params.id)
    }, [loadActivity, match.params.id, history]);

    if(!activity) {
        return <h2>Activity not  found</h2>
    }

    //if loading component or activity is undefined keep loading
    if(loadingInitial) return <Loading content={'Loading Activity'}/>

   

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity = {activity}/>
                <ActivityDetailInfo activity = {activity}/>
                <ActivityDetailChat/>
            </Grid.Column>

            <Grid.Column width = {6}>
                <ActivityDetalSideBar/>
            </Grid.Column>
        </Grid>
    )
}

export default observer (Details);
