import React, { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import People from '@material-ui/icons/People';
import TextField from '@material-ui/core/TextField';

const styles = {
    title: {
        font: '1em "Jura", sans-serif',
        fontWeight: 700
    },
    root: {
        flexGrow: 1
    },
    unitsIcon: {
        marginRight: 20
    },
    textFieldRoot: {
        marginLeft: '20px',
        marginRight: '5px',
        flex: 1
    },
    filterInput: {
        background: 'rgba(255,255,255,0.5)',
        padding: '5px',
        flex: 1,
        borderRadius: '3px'
    },
    menuButton: {
        paddingRight: 0
    }
};

const UnitsToolbar = props => {
    const [filter, setFilter] = useState('');

    useEffect(() => {
        props.updateFilter(filter);
    }, [filter]);

    return (
        <div className={props.classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <People className={props.classes.unitsIcon} />
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={props.classes.title}
                    >
                        UNITS
                    </Typography>
                    <TextField
                        classes={{
                            root: props.classes.textFieldRoot
                        }}
                        onChange={e => setFilter(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            placeholder: 'Filter...',
                            classes: {
                                input: props.classes.filterInput
                            }
                        }}
                        value={filter}
                    />
                    <IconButton
                        title={
                            props.sorting === 'name'
                                ? 'Sort by last edited'
                                : 'Sort alphabetically'
                        }
                        onClick={() => props.toggleSorting()}
                        className={props.classes.menuButton}
                        color="inherit"
                        aria-label={
                            props.sorting === 'name'
                                ? 'Sort by last edited'
                                : 'Sort alphabetically'
                        }
                    >
                        {props.sorting === 'name' ? (
                            <FormatListNumberedIcon />
                        ) : (
                            <SortByAlphaIcon />
                        )}
                    </IconButton>
                    <IconButton
                        title="Create a new unit"
                        onClick={() => props.openCreateUnitModal()}
                        className={props.classes.menuButton}
                        color="inherit"
                        aria-label="Create a new unit"
                    >
                        <CreateNewFolder />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(UnitsToolbar);
