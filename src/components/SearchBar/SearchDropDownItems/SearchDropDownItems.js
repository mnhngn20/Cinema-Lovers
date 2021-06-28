import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import SearchDropDownItem from './SearchDropDownItem/SearchDropDownItem';
import * as actions from '../../../store/actions/index';
import classes from './SearchDropDownItems.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const SearchDropDownItems = ({onSearching, query, isLoading, searchData, onSearchMore, moreLoading, hideItems}) => {
    const [page, setPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0)
    useEffect(()=>{
        onSearching('movie', query, setNumberOfPage, setTotalResults);
    }, [onSearching, query]);
    const container = useRef();
 
    const loadNewData = () => {
        if(container.current.scrollTop + container.current.clientHeight === container.current.scrollHeight){
            if(page < numberOfPage){
                let newPage = page;
                newPage++;
                onSearchMore(newPage, 'movie' ,query);
                setPage(newPage)
            }
        }
    }

    let searchItems = null
    if(!isLoading){
        searchItems = searchData.map(item => {
            return <SearchDropDownItem
                posterPath = {item.posterPath}
                movieId = {item.id}
                key = {item.id}
                title={item.title}
                releaseDate={item.releaseDate}
                hideItems = {hideItems}
            />
        })
    }
    return (
        <div className={classes.SearchDropDownItems} ref={container} onScroll={loadNewData}>
            {searchItems}
            {searchData.length > 0 
                ? totalResults === searchData.length 
                    ? <p className={classes.NoResults}>End Of Result</p> 
                    : <div className={classes.Spinner}><Spinner /></div>
                : <p className={classes.NoResults}>No result match your search...</p>}
        </div>
    )
}

const mapState = state => ({
    isLoading: state.searchState.loading,
    isError: state.searchState.error,
    searchData: state.searchState.data,
    isLoadingMore: state.searchState.moreLoading
})

const mapDispatch = dispatch => ({
    onSearching: (typeOfSearch, query, setNumberOfPage, setTotalResults) => dispatch(actions.search(typeOfSearch, query, setNumberOfPage, setTotalResults)),
    onSearchMore: (page, typeOfSearch, query) => dispatch(actions.searchMore(page, typeOfSearch, query))
})
export default connect(mapState, mapDispatch)(SearchDropDownItems);