import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Navbar  from "../components/nav/Navbar";
import  ActivityDashboard  from "../components/activities/dashbooard/ActivityDashboard";
import {observer} from 'mobx-react-lite';
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import ActivityForm from "../components/activities/form/ActivityForm";
import Details from "../components/activities/details/ActivityDetails";

const App: React.FC <RouteComponentProps> = ({location}) => {

    //The funny path will render if there is anything more than that innitial forward slash
      //seperates home page from navbar
        
  return (
    //Can use instead of div
    <Fragment>
      <Route exact path='/' component={HomePage}/>
      
      <Route path={'/(.+)'} render={()=> ( <Fragment>
        <Navbar/>
        <Container style={{ marginTop: "8em" }}> 
          <Route exact path='/activities' component={ActivityDashboard}/>
          <Route  path='/activities/:id' component={Details}/>
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
        </Container>
      </Fragment>
      )}/>
    </Fragment>
  );
  //need a key so when you click 'createActivity it remounts
};

//higher order component 
//(WithRouter)Giving app component accessability to things like location
export default withRouter (observer(App));
