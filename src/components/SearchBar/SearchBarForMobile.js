import React, { useState, useRef, useEffect } from 'react';

import classes from './SearchBarForMobile.module.css';
import SearchDropDownItems from './SearchDropDownItems/SearchDropDownItems';
import searchIcon from '../../assets/search-icon.png';

const SearchBarForMobile = ({setShowSearchBar}) => {
    const [searchInput, setSearchInput] = useState('');
    const [query, setQuery] = useState('');
    const [show, setShow] = useState(false);
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
        setShow(!isShow);
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
                <img className={classes.SearchIcon} onClick={showSearchBar} src={searchIcon} alt="img"/>
            </div>
            {query !== '' && show ? <div className={classes.Items}>
                <SearchDropDownItems hideItems={showSearchBar} query={query}/>
            </div> : null}
        </div>
    )
}

export default SearchBarForMobile;