import { profile } from 'console'
import { observer } from 'mobx-react-lite'
import {Tab} from 'semantic-ui-react'
import { IProfile } from '../../app/models/Profile'
import { ProfileAboutUs } from './ProfileAboutUs'
import ProfileFollowings from './ProfileFollowings'
import ProfileUserPhotos from './profileUserPhotos'



interface IProps {
    setActiveTab: (activeIndex: any) => void
    //profile : IProfile | null
}

const panes = [
    {menuItem: 'About', render: ()=> <ProfileAboutUs />},
    {menuItem: 'Photos', render: ()=> <ProfileUserPhotos/>},
    {menuItem: 'Activities', render: ()=> <Tab.Pane> Activities content </Tab.Pane>},
    {menuItem: 'Followers', render: ()=> <ProfileFollowings/>},
    {menuItem: 'Following', render: ()=> <ProfileFollowings/>}
]

 const ProfileContent: React.FC<IProps> = ({setActiveTab}) => {

    return (
        <Tab
        menu={{fluid: true, vertical: false}} menuPosition='right' 
        panes={panes}
        onTabChange={(event, data) => setActiveTab(data.activeIndex)}
       
        />
    )
}

export default observer (ProfileContent);
