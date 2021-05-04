import axios from 'axios';
import '../instance/Firebase';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ... updatedProperties
        }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }
    if(rules.isEmail){
        const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        isValid = pattern.test(value) && isValid;
    }
    if(rules.isNumberic){
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid; 
}

export const checkIsInWatchList = (movieId, watchList) => {
    for(let key in watchList){
        // console.log(watchList[key].id)
        if (movieId === watchList[key].id) return true;
    }
    return false;
}



