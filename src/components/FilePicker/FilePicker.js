import React, {useState, useRef, useCallback} from 'react'

import classes from './FilePicker.module.css';
import blank from '../../assets/blank.png';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CropFreeIcon from '@material-ui/icons/CropFree';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const FilePicker = ({clicked}) => {
    const [img, setImg] = useState(blank);
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
        }
    }
    const cropImg = useCallback(() => {
        // image in dataUrl
        cropped.current = (cropper.current.cropper.getCroppedCanvas().toDataURL('image/jpg'))
    }, [cropper])

    const croppedImg = () => {
        console.log(cropped)
        setCrop(false)
        setImg(cropped.current)
    }
    return (
        <div className={[classes.FilePicker, crop ? classes.IsCrop : null].join(' ')}>
            <div className={classes.CloseContainer}>
                <ExpandLessIcon className={classes.Close} onClick={clicked}/>
            </div>
            {
                crop ? 
                <div className={classes.CropContainer}>
                    <label onClick={croppedImg}>Crop</label>
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
                    <img src={img} className={classes.Preview}/>
                </div>
            }
            {!crop ? <div>
                    <input id="file" type="file" onChange={event => onChangeHandler(event)} ref={picker} accept="image/*"/>
                    <label htmlFor="file">Choose a file</label>
                </div>
                :null}
        </div>
    )
}

export default FilePicker;