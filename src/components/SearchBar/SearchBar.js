import React, { useState, useRef, useEffect } from 'react';

import classes from './SearchBar.module.css';
import SearchDropDownItems from './SearchDropDownItems/SearchDropDownItems';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = props => {
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

    return (
        <div className={classes.SearchBar}>
            <SearchIcon className={classes.SearchIcon}/>
            <input
                ref = {inputRef}
                onChange = {(event)=> inputChangeHandler(event)}
                value = {searchInput}
                className={classes.CustomSearchBar} 
                type = 'text' 
                placeholder="" />
            {query !== ''? <div className={classes.Items}>
                <SearchDropDownItems  query={query} />
            </div> : null}
        </div>
    )
}

export default SearchBar;