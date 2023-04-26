import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import DomainIcon from '@material-ui/icons/Domain';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LayersIcon from '@material-ui/icons/Layers';
import PeopleIcon from '@material-ui/icons/People';
import { withStyles } from '@material-ui/core/styles';

import { AppContext } from '../../hoc/ContextProvider';

const menus = [
    {
        name: 'Calls',
        role: 'CALL_MGR',
        link: '/admin/values/calls'
    },
    {
        name: 'Units',
        role: 'UNIT_MGR',
        link: '/admin/values/units'
    },
    {
        name: 'Citizens',
        role: 'CITIZEN_VAL_MGR',
        link: '/admin/values/citizens'
    },
    {
        name: 'Vehicles & weapons',
        role: 'CITIZEN_VAL_MGR',
        link: '/admin/values/vehiclesweapons'
    },
    {
        name: 'Legal',
        role: 'LEGAL_MGR',
        link: '/admin/values/legal'
    },
    {
        name: 'Officers',
        role: 'OFFICER_MGR',
        link: '/admin/values/users'
    }
];

const allRoles = menus.map(menu => menu.role);

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 40,
        color: 'rgba(255,255,255,0.7)'
    },
    icon: {
        marginRight: theme.spacing.unit
    },
    childContainer: {
        padding: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 8
    }
});

const AdminAppBar = ({ classes, children }) => {
    const [anchorEl, setAnchorEl] = useState();
    const context = useContext(AppContext);

    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl();
    };
    return (
        <div className={classes.root}>
            <AppBar color="secondary" position="static">
                <Toolbar>
                    {context.userHasRoles(allRoles) && (
                        <Button
                            aria-haspopup="true"
                            aria-owns="values-menu"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleMenuOpen}
                        >
                            <ListAltIcon className={classes.icon} />
                            Define values
                        </Button>
                    )}
                    {context.userHasRoles(['DEPARTMENTS_MGR']) && (
                        <Button
                            component={Link}
                            to="/admin/departments"
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <DomainIcon className={classes.icon} />
                            Manage departments
                        </Button>
                    )}
                    {context.userHasRoles(['CITIZEN_MGR']) && (
                        <Button
                            component={Link}
                            to="/admin/citizens"
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <AccessibilityNewIcon className={classes.icon} />
                            Manage citizens
                        </Button>
                    )}
                    {context.userHasRoles(['USER_MGR']) && (
                        <Button
                            component={Link}
                            to="/admin/usermanagement"
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <PeopleIcon className={classes.icon} />
                            User management
                        </Button>
                    )}
                    {context.userHasRoles(['MAPS_MGR']) && (
                        <Button
                            component={Link}
                            to="/admin/maps"
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <LayersIcon
                                className={classes.icon}
                            />
                            Maps
                        </Button>
                    )}
                    {context.userHasRoles(['PREF_MGR']) && (
                        <Button
                            component={Link}
                            to="/admin/preferences"
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <SettingsApplicationsIcon
                                className={classes.icon}
                            />
                            Preferences
                        </Button>
                    )}
                    <Button
                        component={Link}
                        to="/admin/downloads"
                        className={classes.menuButton}
                        color="inherit"
                    >
                        <CloudDownloadIcon className={classes.icon} />
                        Downloads
                    </Button>
                </Toolbar>
                <Menu
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    id="values-menu"
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {menus.map(menu => {
                        return context.userHasRoles([menu.role]) ? (
                            <MenuItem
                                key={menu.name}
                                component={Link}
                                to={menu.link}
                                onClick={handleMenuClose}
                            >
                                {menu.name}
                            </MenuItem>
                        ) : null;
                    })}
                </Menu>
            </AppBar>
            <div className={classes.childContainer}>{children}</div>
        </div>
    );
};

export default withStyles(styles)(AdminAppBar);
