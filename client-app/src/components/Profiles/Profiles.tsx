import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Grid } from 'semantic-ui-react'
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
    const {loadUserProfile, loading, profile, follow, unfollow, isCurrentUser, setActiveTab} = rootStore.profileStore;

    useEffect(()=> {
        loadUserProfile(match.params.username)
    }, [loadUserProfile, match])

    //if(loading) return <Loading content='Loading user profile'/>

    return (
        <Grid>
            <Grid.Column width={14}>
                <ProfileHeader profile={profile!} 
                loading={loading} 
                isCurrentUser = {isCurrentUser}
                 follow = {follow}
                 unfollow = {unfollow}/>
                
                <ProfileContent setActiveTab = {setActiveTab}/>
            </Grid.Column>
        </Grid>
           
    )
}

export default observer (Profiles)
