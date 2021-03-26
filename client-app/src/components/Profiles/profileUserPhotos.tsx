import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore'
import PhotoUpload from '../photoUpload/photUpload'


 const ProfileUserPhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser, uploadUserPhoto, uploadingPhoto, setMainLoading, setMainPhoto, deletePhoto, setDeleteLoading} = rootStore.profileStore;

    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [pictureTarget, setTarget] = useState<string | undefined> (undefined);
    const [deletePicTarget, setDeleteTarget] = useState<string | undefined> (undefined);

    const handleUploadImage = (photo: Blob) => {
      uploadUserPhoto(photo).then(()=> {
        setAddPhotoMode(false);
      })
    }

    return (
      <Tab.Pane>
        <Grid>
          <Grid.Column width={16} style={{paddingBottom: 0}}>
          <Header floated='left' icon='image' content='Photos'/>
          {
              isCurrentUser && <Button 
              floated='right' basic color='olive' 
              content={addPhotoMode ? 'Cancel' : 'Add Photo'} 
              onClick={() => 
                setAddPhotoMode(!addPhotoMode)
              }
              />
          }
          </Grid.Column>

          <Grid.Column width={16}>
            {
              addPhotoMode ? (
              <PhotoUpload uploadingPhoto={handleUploadImage} loading={uploadingPhoto}/>
              )
                :
              (
                  <Card.Group itemsPerRow={6}>
                    {profile && profile.photos.map((photo => (
                    <Card key = {photo.id}>
                      <Image src = {photo.url}/>
                      {
                        isCurrentUser && 
                        (
                          //widths determines how many buttons are being put in 
                         <Button.Group fluid widths={2}>
                            
                            <Button name={photo.id} color='olive' basic content='Main' 
                            loading={setMainLoading && pictureTarget === photo.id}
                            onClick={(event) => {
                              setTarget(event.currentTarget.name);
                              setMainPhoto(photo)}}
                              disabled = {photo.isMain}/>
                            
                            <Button 
                            name={photo.id}
                            negative content='Delete'
                            disabled={photo.isMain}
                            loading={setDeleteLoading && deletePicTarget === photo.id}
                            onClick={(event)=> {
                              setDeleteTarget(event.currentTarget.name);
                              deletePhoto(photo.id);
                            }}/>
                         
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

export default observer (ProfileUserPhotos);
