import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import TabletIcon from '@material-ui/icons/Tablet';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';

import ActiveCharacter from '../../Character/ActiveCharacter';
import NotificationsDialog from '../../Notifications/NotificationsDialog';
import MDTDialog from '../../MDT/MDTDialog.js';
import { AppContext } from '../../../hoc/ContextProvider';
import useActiveDepartment from '../../../hoc/useActiveDepartment';

const styles = theme => ({
    toolbarTitleLink: {
        flex: 1,
        textDecoration: 'none'
    },
    toolbarTitle: {
        font: '1.8em "Jura", sans-serif',
        fontWeight: 700,
        color: '#fff'
    },
    root: {
        flexGrow: 1,
        position: 'relative',
        zIndex: 10
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    navButtons: {
        color: '#fff'
    },
    margin: {
        margin: theme.spacing * 2,
        marginRight: theme.spacing * 3
    }
});

const CadToolbar = props => {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [mdtOpen, setMdtOpen] = useState(false);
    const context = useContext(AppContext);
    const { name } = useActiveDepartment();

    return (
        <React.Fragment>
            <NotificationsDialog
                open={notificationsOpen}
                setOpen={setNotificationsOpen}
            />
            {context.userHasRoles(['DISPATCHER', 'RP_OFFICER']) && (
                <MDTDialog open={mdtOpen} setOpen={setMdtOpen} />
            )}
            <div className={props.classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Link to="/" className={props.classes.toolbarTitleLink}>
                            <Typography
                                className={props.classes.toolbarTitle}
                                variant="h6"
                                color="inherit"
                            >
                                {name}
                            </Typography>
                        </Link>
                        <ActiveCharacter />
                        {context.userHasRoles([
                            'DISPATCHER',
                            'RP_OFFICER'
                        ]) && (
                                <IconButton
                                    className={props.classes.menuButton}
                                    color="inherit"
                                    aria-label="MDT"
                                    onClick={() => setMdtOpen(!mdtOpen)}
                                >
                                    <TabletIcon />
                                </IconButton>
                            )}
                        <IconButton
                            className={props.classes.menuButton}
                            color="inherit"
                            aria-label="Notifications"
                            onClick={() =>
                                setNotificationsOpen(!notificationsOpen)
                            }
                        >
                            <Badge
                                className={props.classes.margin}
                                badgeContent={
                                    context.notifications.length
                                }
                                invisible={
                                    context.notifications.length === 0
                                }
                                max={9}
                                color="error"
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            className={props.classes.menuButton}
                            color="inherit"
                            aria-label={context.mode === 'light' ? 'Dark mode' : 'Light mode'}
                            onClick={() =>
                                context.setMode(context.mode === 'light' ? 'dark' : 'light')
                            }
                        >
                            {context.mode === 'light' && (
                                <Brightness2Icon />
                            )}
                            {context.mode === 'dark' && (
                                <Brightness5Icon />
                            )}
                        </IconButton>
                        <IconButton
                            className={props.classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={props.toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(CadToolbar);
