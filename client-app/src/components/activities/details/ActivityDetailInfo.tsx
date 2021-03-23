import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/Activity'
import { observer } from 'mobx-react-lite';
import {format} from 'date-fns';



 const ActivityDetailInfo: React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <Segment.Group>
        <Segment attached='top'>
          <Grid>
            <Grid.Column width={1}>
              <Icon size='large' color='red' name='info' />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{activity.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='calendar' size='large' color='red' />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {format(activity.date, 'eeee do MMMM')} at 
                {format(activity.date, 'h: mm a')}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='marker' size='large' color='red' />
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
