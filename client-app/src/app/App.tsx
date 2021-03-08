import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Navbar  from "../components/nav/Navbar";
import  ActivityDashboard  from "../components/activities/dashbooard/ActivityDashboard";
import {observer} from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import ActivityForm from "../components/activities/form/ActivityForm";
import Details from "../components/activities/details/ActivityDetails";
import NotFound from "./layout/NotFound";
import { ToastContainer } from "react-toastify";

const App: React.FC <RouteComponentProps> = ({location}) => {

    //The funny path will render if there is anything more than that innitial forward slash
      //seperates home page from navbar
        
  return (
    //Can use instead of div
    <Fragment>
      <ToastContainer position='bottom-left'/>
      <Route exact path='/' component={HomePage}/>
      
      <Route path={'/(.+)'} render={()=> ( <Fragment>
        <Navbar/>
        <Container style={{ marginTop: "8em" }}>
          <Switch>
          <Route exact path='/activities' component={ActivityDashboard}/>
          <Route  path='/activities/:id' component={Details}/>
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
          <Route  component={NotFound}/>
          </Switch> 
        </Container>
      </Fragment>
      )}/>
    </Fragment>
    //If a route is not found then the last route will be loaded
  );
  //need a key so when you click 'createActivity it remounts
};

//higher order component 
//(WithRouter)Giving app component accessability to things like location
export default withRouter (observer(App));
