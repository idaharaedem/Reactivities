import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Grid, Loader } from 'semantic-ui-react'
import { Loading } from '../../app/layout/Loading'
import { RootStoreContext } from '../../app/stores/rootStore'
import ProfileHeader from '../Profiles/ProfileHeader'
import  ProfileContent  from './ProfileContent'

interface RouteParams {
    username: string
}

//getting access to route properties so you can get the match to get userna,
interface IProps extends RouteComponentProps<RouteParams> {}


 const Profiles: React.FC<IProps> = ({match}) => {

    const rootStore = useContext(RootStoreContext);
    const {loadUserProfile, loading, profile} = rootStore.profileStore;

    useEffect(()=> {
        loadUserProfile(match.params.username)
    }, [loadUserProfile, match])

    if(loading) return <Loading content='Loading user profile'/>

    return (
        <Grid>
            <Grid.Column width={14}>
                <ProfileHeader profile={profile!}/>
                <ProfileContent profile = {profile}/>
            </Grid.Column>
        </Grid>
           
    )
}

export default observer (Profiles)
