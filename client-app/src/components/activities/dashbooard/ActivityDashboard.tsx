import React, { SyntheticEvent } from 'react';
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
    // Giving each delete a unique id for the loading spinner
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
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
    deleteActivity,
    submitting,
    target
    }) => {
    
    return (
        <Grid>
            <Grid.Column width={10}>
              <ActivityList activities = {activities} 
              selectActivity = {selectActivity} 
              deleteActivity = {deleteActivity}
              submitting = {submitting}
              target = {target}
              />
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
                    editMode &&  <ActivityForm 
                    //in order to get the form to reset when create button is clicked
                    key ={selectedActivity && selectedActivity.id || 0}
                    setEditMode = {setEditMode}
                    initialFormActivity = {selectedActivity!} 
                    createActivity = {createActivity}
                    editActivity = {editActivity}
                    submitting={submitting}
                    />
                    
                }
               
            </GridColumn>
        </Grid>
    )
}
