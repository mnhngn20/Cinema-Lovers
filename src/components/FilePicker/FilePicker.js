import React, {useState, useRef, useCallback} from 'react'

import classes from './FilePicker.module.css';
import blank from '../../assets/blank.png';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CropFreeIcon from '@material-ui/icons/CropFree';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const FilePicker = ({close, uploadImage, haveAvatar}) => {
    const [img, setImg] = useState(blank);
    const [fileName, setFileName] = useState("No file selected.")
    const [crop, setCrop] = useState(false);
    const picker = useRef();
    const cropper = useRef();
    let cropped = useRef();
    const onChangeHandler = (event) => {
        var file = picker.current.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = (event) => {
            setImg(reader.result)
            setFileName(file.name)
            console.log(url)
        }
    }
    const cropImg = useCallback(() => {
        cropped.current = (cropper.current.cropper.getCroppedCanvas().toDataURL('image/jpg'))
    }, [cropper])

    const croppedImg = () => {
        setCrop(false)
        setImg(cropped.current)
    }
    return (
        <div className={classes.FilePicker}>
            <div className={classes.CloseContainer} onClick={close}>
                <ExpandLessIcon className={classes.Close} />
            </div>
            {crop ? null :<p className={classes.FileName}>{fileName}</p>}
            {
                crop ? 
                <div className={classes.CropContainer}>
                    <div className={classes.Buttons}>
                        <label onClick={croppedImg}>Crop</label>
                        <label className={classes.Red} onClick={() => setCrop(false)}>Cancel</label>
                    </div>
                    <Cropper
                        ref={cropper}
                        src= {img}
                        style={{height: 400, width: '100%'}}
                        // Cropper.js options
                        aspectRatio={1}
                        guides={false}
                        crop={() => cropImg()} />
                </div>
                : <div className={classes.PreviewContainer}>
                    <div className={classes.Crop}><CropFreeIcon className={classes.CropIcon} onClick={() => setCrop(true)}/></div>
                    <img src={img} className={classes.Preview} alt="placeholder"/>
                </div>
            }
            {
                crop 
                    ? null 
                    :<div className={classes.Buttons}>
                        <input id="file" type="file" onChange={event => onChangeHandler(event)} ref={picker} accept="image/*"/>
                        <label htmlFor="file">Choose a file</label>
                        {haveAvatar? <label className={classes.Red} onClick={() => uploadImage(false)}>Delete Avatar</label> : null}
                        <label onClick={() => uploadImage(img)}>Done</label>
                    </div>
            }
        </div>
    )
}

export default FilePicker;