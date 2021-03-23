import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'

 const ProfileUserPhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser} = rootStore.profileStore;

    const [addPhotoMode, setAddPhotoMode] = useState(false);

    return (
      <Tab.Pane>
        <Grid>
          <Grid.Column width={16} style={{marginBottom: 0}}>
          <Header floated='left' icon='image' content='Photos'/>
          {
              isCurrentUser && <Button 
              floated='right' basic color='olive' 
              content={addPhotoMode ? 'Cancel' : 'Add Photo'} 
              onClick={() => setAddPhotoMode(!addPhotoMode)}
              />
          }
          </Grid.Column>

          <Grid.Column width={16}>
            {
              addPhotoMode ? (
               <ProfileUserPhotos/>
              )
                :
                (
                  <Card.Group itemsPerRow={6}>
                    {profile && profile.photos.map((photo => (
                    <Card key = {photo.id}>
                      <Image src = {photo.url}/>
                      {
                        isCurrentUser && (
                          //widths determines how many buttons are being put in 
                         <Button.Group fluid widths={2}>
                            <Button color='olive' basic content='Main'></Button>
                            <Button negative content='Delete'></Button>
                         </Button.Group>
                        )
                      }
                    </Card>  
                    )))}
                  </Card.Group>
                )
            }
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    )
}

export default  ProfileUserPhotos;
