import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import classes from './Select.module.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }

  }));

const SelectSort = ({select, handleChange}) => {
    const formClasses = useStyles();
    return (
        <FormControl variant="outlined" className={formClasses.formControl}>
          <label className={classes.label}>Sort By</label>
            <Select
                classes = {{root: classes.root, outlined: classes.outlined, filled: classes.filled, focused: classes.focus}}
                value={select}
                onChange={handleChange}
                label="Sort By">
                <MenuItem classes={{root: classes.itemRoot}} value={0}>All</MenuItem>
                <MenuItem classes={{root: classes.itemRoot}} value={1}>Watched</MenuItem>
                <MenuItem classes={{root: classes.itemRoot}} value={2}>Not watched</MenuItem>
            </Select>
      </FormControl>
    )
}

export default SelectSort;