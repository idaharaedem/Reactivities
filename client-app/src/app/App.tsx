import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { IActivity } from "./models/Activity";
import { Navbar } from "../components/nav/Navbar";
import { ActivityDashboard } from "../components/activities/dashbooard/ActivityDashboard";
import { act } from "@testing-library/react";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

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

    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {

    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(act => act.id !== id)])
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity)
        })
        setActivities(activities);
      });
    // Empty array ensures our use effect runs one time only
  }, []);

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
        />
      </Container>
    </Fragment>
  );
};

export default App;
