import { Fragment, useEffect, useState } from 'react';
import { Header, Grid, ButtonGroup, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDrop from './photoWidgetDrop';
import { PhotoCropper } from './photoCropper';

interface IProps {
  loading: boolean,
  uploadingPhoto: (file: Blob) => void
}

 const PhotoUploadWidget: React.FC<IProps> = ({loading, uploadingPhoto}) => {
  
  const [files, setFiles] = useState<any[]>([]);
  const [imageCrop, setImageCrop] = useState<Blob | null>(null);




  //equivelant to component unmount
  //cleaning up what you have done
  useEffect (()=> {
    return () => {
      files.forEach(file => URL.revokeObjectURL)
    }
  })
  
  return ( 
  <Fragment>
    <Grid>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Add Photo' />
        <PhotoWidgetDrop setFiles={setFiles}/>
      </Grid.Column>

      <Grid.Column width={1}/>
      <Grid.Column width={4}>  
        <Header sub color='teal' content='Preview And Upload' />
        {
          files.length > 0 &&
          <PhotoCropper setImageCrop={setImageCrop} imagePreview={files[0].previewImage}/>
        }
      </Grid.Column>  
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Preview And Upload' />
      {
        files.length > 0 && 
        <Fragment>
          <div className='img-preview' style={{minHeight: '200px', overflow: 'hidden'}}/>
          <ButtonGroup widths={2}>
            <Button positive icon='check' loading={loading}
            onClick={(()=> uploadingPhoto(imageCrop!))}
            />
            <Button negative icon='close' disable={loading}
            onClick={(()=> setFiles([]))}
            />         
          </ButtonGroup>
        </Fragment>
      }

        
      </Grid.Column>
    </Grid>
  </Fragment>
  )};

export default observer(PhotoUploadWidget);