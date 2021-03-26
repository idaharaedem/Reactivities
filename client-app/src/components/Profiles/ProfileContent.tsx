import { observer } from 'mobx-react-lite'
import {Tab} from 'semantic-ui-react'
import { IProfile } from '../../app/models/Profile'
import ProfileUserPhotos from './profileUserPhotos'

interface IProps {
    profile : IProfile | null
}

const panes = [
    {menuItem: 'About', render: ()=> <Tab.Pane> About content </Tab.Pane>},
    {menuItem: 'Photos', render: ()=> <ProfileUserPhotos/>},
    {menuItem: 'Activities', render: ()=> <Tab.Pane> Activities content </Tab.Pane>},
    {menuItem: 'Followers', render: ()=> <Tab.Pane> Followers content </Tab.Pane>},
    {menuItem: 'Following', render: ()=> <Tab.Pane> Following content </Tab.Pane>}
]

 const ProfileContent: React.FC<IProps> = ({profile}) => {

    return (
        <Tab
        menu={{fluid: true, vertical: false}} menuPosition='right' 
        panes={panes}
        activeIndex={1}
        />
    )
}

export default observer (ProfileContent);
