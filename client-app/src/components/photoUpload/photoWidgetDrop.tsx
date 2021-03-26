import { observer } from 'mobx-react-lite'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

interface IProps {
    setFiles: (files: object[]) => void;
}

const DropStyles = {
    marginTop: '5px',
    border: 'dashed 4px',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center' ,
    height: '200px'
}

const DropZoneActive = {
    borderColor: 'green'
}

const PhotoWidgetDrop: React.FC<IProps> = ({setFiles}) => {
  const onDrop = useCallback(acceptedFiles => {
   setFiles(acceptedFiles.map((file: object) => (
       Object.assign(file, {
           previewImage: URL.createObjectURL(file)
       })
   )))
  }, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style ={isDragActive ? {...DropStyles, ...DropZoneActive} : DropStyles}>
      
      <input {...getInputProps()} />
        <Icon  name='upload' size='huge'/>
        <Header content='Drop image here'/>
      
    </div>
  )
}

export default observer(PhotoWidgetDrop);
