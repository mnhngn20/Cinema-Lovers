import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchDropDownItem from './SearchDropDownItem/SearchDropDownItem';
import * as actions from '../../../store/actions/index';
import classes from './SearchDropDownItems.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const SearchDropDownItems = ({onSearching, query, isLoading, searchData}) => {
    useEffect(()=>{
        onSearching('movie', query)
    }, [onSearching, query]);

    let searchItems = <div className={classes.Spinner}><Spinner /></div>
    if(!isLoading){
        searchItems = searchData.map(item => {
            return <SearchDropDownItem
                posterPath = {item.posterPath}
                movieId = {item.id}
                key = {item.id}
                title={item.title}
                releaseDate={item.releaseDate}
            />
        })
    }
    return (
        <div className={classes.SearchDropDownItems}>
            {searchItems}
            {searchData.length > 0 ? null : <p className={classes.NoResults}>No result match your search...</p>}
        </div>
    )
}

const mapState = state => ({
    isLoading: state.searchState.loading,
    isError: state.searchState.error,
    searchData: state.searchState.data
})

const mapDispatch = dispatch => ({
    onSearching: (typeOfSearch, query) => dispatch(actions.search(typeOfSearch, query))

})
export default connect(mapState, mapDispatch)(SearchDropDownItems);