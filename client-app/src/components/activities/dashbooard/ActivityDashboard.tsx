import React from 'react';
import { Grid, GridColumn} from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { ActivityList } from './ActivityList';
import {Details} from '../details/ActivityDetails';
import {ActivityForm} from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id:string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity:IActivity) => void;
    deleteActivity: (id: string) => void;
}

//React.FC identifies the type of component youre passing through
export const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectActivity, 
    selectedActivity, 
    editMode, 
    setEditMode, 
    setSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity
    }) => {
    
    return (
        <Grid>
            <Grid.Column width={10}>
              <ActivityList activities = {activities} selectActivity = {selectActivity} deleteActivity = {deleteActivity}/>
            </Grid.Column>
            <GridColumn width={6}>
                {
                    // to the right of && is only executed if that is not equal to null
                    selectedActivity && !editMode && ( 
                    
                    <Details 
                    activity = {selectedActivity} 
                    setEditMode = {setEditMode} 
                    setSelectedActivity = {setSelectedActivity} />
                    )}
                
                {
                    editMode &&  (<ActivityForm 
                    //in order to get the form to reset when create button is clicked
                    key ={selectedActivity && selectedActivity.id || 0}
                    setEditMode = {setEditMode}
                    initialFormActivity = {selectedActivity!} 
                    createActivity = {createActivity}
                    editActivity = {editActivity}/>)
                }
               
            </GridColumn>
        </Grid>
    )
}
