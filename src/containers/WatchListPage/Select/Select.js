import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const SelectSort = ({select, handleChange}) => {
    const classes = useStyles();
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={select}
                onChange={handleChange}
                label="Sort By">
                {/* <MenuItem value="">
                    <em>None</em>
                </MenuItem> */}
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={1}>Watched</MenuItem>
                <MenuItem value={2}>Not watched</MenuItem>
            </Select>
      </FormControl>
    )
}

export default SelectSort;