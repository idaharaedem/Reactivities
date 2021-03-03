import React from 'react'
import { Container } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

export const HomePage = () => {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>Home Page</h1>
            <h2> Go To <Link to='/activities'> Activities </Link></h2>
        </Container>
    )
}
