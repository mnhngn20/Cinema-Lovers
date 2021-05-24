import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchDropDownItem from './SearchDropDownItem/SearchDropDownItem';
import * as actions from '../../../store/actions/index';
import classes from './SearchDropDownItems.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const SearchDropDownItems = props => {
    const {onSearching, query} = props;
    useEffect(()=>{
        onSearching('movie', props.query)
    }, [onSearching, query]);

    let searchItems = <Spinner />
    if(!props.isLoading){
        searchItems = props.searchData.map(item => {
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
        <div className={classes.SearchDropDownItems} onFocus={props.notTouching} onBlur={props.isTouching}>
            {searchItems}
            {props.searchData.length > 0 ? null : <p className={classes.NoResults}>No result match your search...</p>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.searchState.loading,
        isError: state.searchState.error,
        searchData: state.searchState.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearching: (typeOfSearch, query) => dispatch(actions.search(typeOfSearch, query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDropDownItems);