import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';



 const Navbar: React.FC = () => {


    return (
        <Menu fixed='top' inverted>  
            <Container>
            <Menu.Item header as={NavLink} exact to= '/'>
                <img className="img" src="/assets/logo.png" alt="logo"/>
                Reactivities
            </Menu.Item>

            <Menu.Item name='activities' as={NavLink} to='/activities'>
            </Menu.Item>

            <Menu.Item>
               <Button  as={NavLink} to='/createActivity' positive content='Create Activity'/>
            </Menu.Item>

            </Container>
           
      </Menu>
    )
}

export default observer (Navbar);
