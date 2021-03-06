import React, {useEffect, useContext} from 'react';
import { Grid, GridColumn} from 'semantic-ui-react';
import  ActivityList  from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore'
import {Loading} from '../../../app/layout/Loading'


//React.FC identifies the type of component youre passing through
 const ActivityDashboard: React.FC = () => {
        
        //Getting the activities and edit mode from activity store 
        

        const activityStore = useContext(ActivityStore)

        useEffect(() => {
          //have to tell use effect about the dependencies it needs, you put that in the empty array
          activityStore.loadActivities();
          // Empty array ensures our use effect runs one time only
        }, [activityStore]);
      
        if (activityStore.loadingInitial) return <Loading content = {'Loading activities'}/>
      

    return (
        <Grid>
            <Grid.Column width={10}>
              <ActivityList />
              
            </Grid.Column>
            <GridColumn width={6}>  
               <h2>Activity filters</h2>
            </GridColumn>
        </Grid>
    )
}

export default observer (ActivityDashboard)
