import React, { useRef } from 'react';
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';

interface IProps  {

    setImageCrop: (file: Blob) => void;
    imagePreview: string;
}

export const PhotoCropper: React.FC <IProps> = ({setImageCrop, imagePreview}) => {
   
    const cropper = useRef<Cropper>(null);

    const cropImage = () => {
    //checking if the cropper exists
    if(cropper.current && typeof cropper.current.getCroppedCanvas() === 'undefined' )
    {
        return;
    }
    cropper && cropper.current && cropper.current.getCroppedCanvas().toBlob((blob:any)=> {
        setImageCrop(blob)
    }, 'image/jpeg')
}

    
    return (
    <Cropper
        ref={cropper}
        src={imagePreview}
        style={{ height: 200, width: '100%' }}
        aspectRatio={1 / 1}
        preview='.img-preview'
        guides={false}
        viewMode={1}
        dragMode='move'
        scalable={true}
        cropBoxMovable={true}
        cropBoxResizable={true}
        crop={cropImage}
    />
    )
}
