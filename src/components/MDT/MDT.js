import React, { useState } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { grey } from '@material-ui/core/colors';

import SearchCitizens from './SearchCitizens/SearchCitizens';
import SearchVehicles from './SearchVehicles/SearchVehicles';

const styles = theme => ({
    terminal: {
        flex: 1,
        background: theme.palette.mdt.vDarkShade,
        border: '10px solid #eee',
        borderColor: theme.palette.mdt.mid,
        padding: theme.spacing.unit * 5,
        minHeight: '70vh'
    },
    tabRoot: {
        flexGrow: 1
    },
    appBar: {
        boxShadow: 'none'
    },
    tab: {
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: 16
    },
    tabContainer: {
        padding: theme.spacing.unit * 5
    }
});

const MDT = ({ classes, setOpen }) => {
    const [active, setActive] = useState(0);

    const handleChange = (event, value) => {
        setActive(value);
    };
    return (
        <MuiThemeProvider
            theme={parentTheme =>
                createMuiTheme({
                    ...parentTheme,
                    typography: {
                        ...parentTheme.typography,
                        fontFamily: 'Share Tech Mono, monospace',
                        useNextVariants: true
                    },
                    palette: {
                        ...parentTheme.palette,
                        primary: {
                            main: grey[800],
                            mid: grey[700]
                        },
                        secondary: {
                            main: grey[200]
                        }
                    }
                })
            }
        >
            <div className={classes.terminal}>
                <div className={classes.tabRoot}>
                    <AppBar
                        classes={{
                            root: classes.appBar
                        }}
                        position="static"
                    >
                        <Tabs value={active} onChange={handleChange}>
                            <Tab
                                classes={{
                                    root: classes.tab
                                }}
                                label="Search citizens"
                            />
                            <Tab
                                classes={{
                                    root: classes.tab
                                }}
                                label="Search vehicles"
                            />
                            <Tab
                                classes={{
                                    root: classes.tab
                                }}
                                label="EXIT"
                            />
                        </Tabs>
                    </AppBar>
                    <div className={classes.tabContainer}>
                        {active === 0 && <SearchCitizens />}
                        {active === 1 && <SearchVehicles />}
                        {active === 2 && setOpen(false)}
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(MDT);
