import React, {useState} from 'react';

import classes from './Pagination.module.css';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
const Pagination = ({quantity, currentPage, setPage, totalResults}) =>{
    console.log("i was called")
    const [group, setGroup] = useState(0)
    let pagination = [];
    let number = window.outerWidth < 600 ? 5 :10
    for(let i=1; i < ((quantity - group*number) > number ? number+1 : ((quantity - group*number) % number)? (quantity - group*number) % number+1: number+1); i++){
        pagination.push(
            <div key={i} className={[classes.Single, i+number*group === currentPage ? classes.IsChosen : null].join(' ')}
                onClick={()=> setPage(i+number*group)}>
                {i+number*group}
            </div>
        )
    }

    const changeGroup = direction => {
        let newGroup = group;
        if(direction === "forward"){
            if(number*(newGroup + 1) <= quantity -1 ){
                newGroup++;
                setGroup(newGroup);
                setPage(currentPage + number)
            }
        }
        if(direction === "backward"){
            if(newGroup > 0){
                newGroup--;
                setGroup(newGroup);
                setPage(currentPage - number);
            } 
        }
    }
  
    return (
        totalResults !== 0
            ?<div className={classes.Pagination}>
                <ArrowLeftIcon className={classes.Icon} onClick={() => changeGroup("backward")}/>
                {pagination}
                <ArrowRightIcon className={classes.Icon} onClick={()=> changeGroup("forward")}/>
            </div>
            :null
    )
}

export default Pagination;