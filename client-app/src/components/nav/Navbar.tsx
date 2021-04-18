import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { IUser } from '../../app/models/User';
import { history } from "../..";
import { RootStoreContext } from '../../app/stores/rootStore';

interface IProps {
    user: IUser;
}

 const Navbar: React.FC<IProps> = () => {

    const rootStore = useContext(RootStoreContext);

    const {isLoggedIn, user, logout} = rootStore.userStore

    const reload = () => {
        history.push('/activities')
        window.location.reload();
    }

  

    return (
        <Menu fixed='top' inverted>  
            <Container>
            <Menu.Item header as={NavLink} exact to= '/'>
               Events
            </Menu.Item>

            <Menu.Item onClick={()=>reload()}  name='activities'>
            </Menu.Item>

            <Menu.Item>
               <Button  as={NavLink} to='/createActivity' color='olive' content='Create Activity'/>
            </Menu.Item>

            {user && isLoggedIn &&
                
                <Menu.Item position='right'>
                <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                <Dropdown pointing='top left' text={user.displayname || 'user'}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/profile/${user.username}`} text='My profile' icon='user'/>
                    <Dropdown.Item onClick={logout}  text='Logout' icon='power' />
                </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
    
            }

            </Container>
           
      </Menu>
    )
}

export default observer (Navbar);
