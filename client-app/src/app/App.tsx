import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { IActivity } from "./models/Activity";
import { Navbar } from "../components/nav/Navbar";
import { ActivityDashboard } from "../components/activities/dashbooard/ActivityDashboard";
import agent from '../app/API/agent';
import { AxiosResponse } from "axios";
import { Loading } from "./layout/Loading";
import { SyntheticEvent } from "react";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectedActivity = (id: string) => {
    //returns a new array
    setSelectedActivity(activities.filter((act) => act.id === id)[0]);
    setEditMode(false);
  };

  const handleSelectActivityForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {

    setSubmitting(true);
    agent.Activities.create(activity).then(()=> {

    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
    }).then(() => setSubmitting(false))
    
  };

  const handleEditActivity = (activity: IActivity) => {

    setSubmitting(true);
    agent.Activities.update(activity.id, activity).then(()=> {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);

    }).then(()=> setSubmitting(false));
  };

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
    
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=> {
      setActivities([...activities.filter(act => act.id !== id)])
    }).then(()=> setSubmitting(false));
    
  }

  useEffect(() => {
    agent.Activities.lists()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity)
        })
        setActivities(activities);
      }).then(()=> setLoading(false));
    // Empty array ensures our use effect runs one time only
  }, []);

  if (loading) return <Loading content = {'Loading activities'}/>

  return (
    //Can use instead of div
    <Fragment>
      <Navbar openActivityForm={handleSelectActivityForm} />
      <Container style={{ marginTop: "8em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity = {handleCreateActivity}
          editActivity = {handleEditActivity}
          deleteActivity = {handleDeleteActivity}
          target = {target}
          submitting = {submitting}
        />
      </Container>
    </Fragment>
  );
};

export default App;
