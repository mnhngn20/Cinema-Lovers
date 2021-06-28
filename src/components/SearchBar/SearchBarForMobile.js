import React, { useState, useRef, useEffect } from 'react';

import classes from './SearchBarForMobile.module.css';
import SearchDropDownItems from './SearchDropDownItems/SearchDropDownItems';
import SearchIcon from '@material-ui/icons/Search';

const SearchBarForMobile = ({setShowSearchBar, show}) => {
    const [searchInput, setSearchInput] = useState('');
    const [query, setQuery] = useState('');
    let inputRef = useRef();

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(searchInput === inputRef.current.value){
                setQuery(inputRef.current.value);
            }
        }, 500);   
        return ()=>{
            clearTimeout(timer);
        }
    }, [inputRef, searchInput]);
    
    const inputChangeHandler = event => {
        const newInput = event.target.value;
        setSearchInput(newInput);
    };
    const showSearchBar = () => {
        const isShow = show
        // setShow(!isShow);
        setShowSearchBar(!isShow)
    }
    return (
        <div className={classes.SearchBar}>
            <div className={classes.Bar}>
                <input
                    ref = {inputRef}
                    onChange = {(event)=> inputChangeHandler(event)}
                    value = {searchInput}
                    className={[classes.CustomSearchBar, show ? classes.SearchBarShow : classes.SearchBarHide].join(' ')} 
                    type = 'text' 
                    placeholder="" />
                <SearchIcon className={classes.SearchIcon} onClick={showSearchBar} />
            </div>
            {query !== '' && show ? <div className={classes.Items}>
                <SearchDropDownItems hideItems={showSearchBar} query={query}/>
            </div> : null}
        </div>
    )
}

export default SearchBarForMobile;