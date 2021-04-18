import { Fragment, useContext } from 'react'
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import { RootStoreContext } from '../app/stores/rootStore';
import { LoginForm } from '../components/user/LoginForm';
import { RegisterForm } from '../components/user/RegisterForm';

export const HomePage = () => {

    const rootStore = useContext(RootStoreContext);

    const {user} = rootStore.userStore;
    const {openModel} = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
        <Container text>
            <Header as='h1' inverted>
                {/* <Image size='massive' src='/assets/logo1.jpeg' alt='logo' style={{marginBottom: 12}}/> */}
                Event Planner
            </Header>
            {
                user ? (

                    <Fragment>
                        <span> </span>
                        <h2> Create, Plan and Organise Events </h2>
                    <Header color='orange' as='h3' inverted content={`Welcome back ${user.displayname} !`} />
                    <Button as={Link} to='/activities' size='huge' inverted>
                        Go to Events!
                    </Button>
                </Fragment>
                )
                :
                (
                   <Fragment>
                              
                    <Header color='orange' as='h2' inverted content='Welcome to my event planner' />
                    <span> </span>
                        <Button onClick={()=> openModel(<LoginForm/>)} size='huge' inverted>
                            Login
                        </Button>

                        <Button onClick={()=> openModel(<RegisterForm/>)} size='huge' inverted>
                            Register
                        </Button>
                   </Fragment> 

                   
                )
            } 

                
     
        </Container>
    </Segment>
    )
}
