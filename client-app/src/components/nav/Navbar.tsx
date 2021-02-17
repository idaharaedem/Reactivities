import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface IProps {
    openActivityForm: () => void
}

export const Navbar: React.FC<IProps> = ({openActivityForm}) => {
    return (
        <Menu fixed='top' inverted>  
            <Container>
            <Menu.Item className="header" header>
                <img className="img" src="/assets/logo.png" alt="logo"/>
                Reactivities
            </Menu.Item>

            <Menu.Item name='activities'>
            </Menu.Item>

            <Menu.Item>
               <Button onClick={openActivityForm} positive content="Create Activity"/>
            </Menu.Item>

            </Container>
           
      </Menu>
    )
}
