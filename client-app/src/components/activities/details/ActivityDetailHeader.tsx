import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Item, Segment, Image, Header, ButtonGroup } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { Link } from 'react-router-dom';
import {format} from 'date-fns'
import { RootStoreContext } from '../../../app/stores/rootStore';


const activityImageStyle = {
    filter: 'brightness(40%)'
  };
  
  const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  };



 const ActivityDetailHeader: React.FC<{activity: IActivity}> = ({activity}) => {


  const rootStore = useContext(RootStoreContext);
  const { cancelAttendanceActivity, attendanceActivity, loading, deleteActivity, target} = rootStore.activityStore;

  const host = activity.attendees.filter(x => x.isHost)[0];
    
  
  //Fluid takes up all available content
    return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/${activity.category}.jpeg`} fluid style={activityImageStyle} />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by <strong>{host.displayname}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {
          activity.isHost ? (
            <ButtonGroup >
              <Button as={Link} to={()=>`/manage/${activity.id}`} color='black' floated='right'>
                Manage Event
              </Button>

              <Button onClick={()=> deleteActivity(activity.id)} color='red' floated='right'>
                Delete Event
              </Button>
            </ButtonGroup>
            

          
          ) : activity.isGoing ? (

            <Button loading={loading} onClick={cancelAttendanceActivity}>Cancel attendance</Button>
          ) : (
            <Button loading={loading} onClick={attendanceActivity} color='olive'>Join Activity</Button>
          )
        }
        
        
       
      </Segment>
    </Segment.Group>

    )
};

export default observer (ActivityDetailHeader);
