
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List, ListItem } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


class App extends Component {

  state = {
    values: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        this.setState({
          values: response.data
        })
      })
    
  }

  render() {

   const {values} = this.state;

    return (
      <div >
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {values.map((val: any) => (
            <ListItem key={val.id}> {val.name} </ListItem>
          ))}
        </List>

      </div>
    );
  }
  
}

export default App;
