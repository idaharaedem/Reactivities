import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'
import { observer } from 'mobx-react-lite';

const dateFormater = (activity: IActivity) => {
    let date = activity.date.split('T')[0];
    return date;
  }

 const ActivityDetailInfo: React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <Segment.Group>
        <Segment attached='top'>
          <Grid>
            <Grid.Column width={1}>
              <Icon size='large' color='olive' name='info' />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{activity.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='calendar' size='large' color='olive' />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {dateFormater(activity)}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='marker' size='large' color='olive' />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{activity.venue}, {activity.city}</span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    )
};

export default observer (ActivityDetailInfo);
