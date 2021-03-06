import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, Segment, Image, Header } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';


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

  const dateFormater = (activity: IActivity) => {
    let date = activity.date.split('T')[0];
    return date;
  }

 const ActivityDetailHeader: React.FC<{activity: IActivity}> = ({activity}) => {
    //Fluid takes up all available content
    return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{dateFormater(activity)}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='olive'>Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color='black' floated='right'>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>

    )
};

export default observer (ActivityDetailHeader);
