import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Item, Header, Statistic, Divider, Reveal, Button } from "semantic-ui-react";
import { IProfile } from "../../app/models/Profile";

interface IProps {
    profile : IProfile | null
    isCurrentUser: boolean
    loading: boolean
    follow: (username: string)=> void;
    unfollow: (username: string)=> void;
}

const ProfileHeader: React.FC<IProps> = ({profile, isCurrentUser, loading, follow, unfollow}) => {

    return (
      <Segment>
        <Grid>
          <Grid.Column width={12}>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size='small'
                  src={profile?.mainImage || '/assets/user.png'}
                />
                <Item.Content verticalAlign='middle'>
                  <Header as='h1'>{profile?.displayName}</Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Statistic.Group widths={2}>
              <Statistic color='grey' label='Following' value={profile?.followingCount}/>
              <Statistic color='orange' label='Followers' value={profile?.followersCount}/>
            </Statistic.Group>
            <Divider/>

            {!isCurrentUser && <Reveal animated='move'>
              <Reveal.Content visible style={{ width: '100%' }}>
                <Button
                  fluid
                  color='teal'
                  content={profile?.following ? 'Following' : 'Not Following User'}
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  fluid
                  basic
                  color={profile?.following ? 'red' : 'green'}
                  content={profile?.following ? 'Unfollow' : 'Follow'}
                  onClick={profile?.following ? ()=> unfollow(profile.username) : ()=> follow(profile!.username) }
                  loading = {loading}
                />
              </Reveal.Content>
            </Reveal>}
            
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }

  export default observer (ProfileHeader);
  