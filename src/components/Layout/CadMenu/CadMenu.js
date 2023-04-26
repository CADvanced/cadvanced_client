import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Link
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import GavelIcon from '@material-ui/icons/Gavel';

import compose from 'lodash.flowright';

import withContext from '../../../hoc/ContextConsumer';
import UserIcon from '../../User/UserIcon';
import UserName from '../../User/UserName';
import DispatchButtons from './DispatchButtons';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column'
    },
    list: {
        width: 250
    },
    icon: {
        color: theme.palette.text.primary
    },
    filler: {
        flex: 1
    }
});

const CadMenu = ({
    classes,
    context,
    drawerOpen,
    toggleDrawer
}) => {
    // toggleDrawer is a curried function so we need
    // to prep it as a closer
    const closer = toggleDrawer(false);

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={closer}
        >
            <div
                className={classes.root}
                tabIndex={0}
                role="button"
                onClick={closer}
                onKeyDown={closer}
            >
                {!context.userSession.id && (
                    <List component="nav">
                        <ListItem
                            button
                            component="a"
                            href={context.loginUrl}
                            target="_self"
                        >
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </List>
                )}
                {context.userSession.id && (
                    <React.Fragment>
                        <List component="nav">
                            <ListItem>
                                <ListItemIcon>
                                    <UserIcon />
                                </ListItemIcon>
                                <UserName />
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav">
                            {context.userHasRoles(['DISPATCHER']) &&
                                <DispatchButtons />
                            }
                            {context.userHasRoles([
                                'OFFICER_MGR',
                                'UNIT_MGR',
                                'CALL_MGR',
                                'LEGAL_MGR',
                                'PREF_MGR',
                                'CITIZEN_MGR',
                                'USER_MGR',
                                'CITIZEN_VAL_MGR'
                            ]) && (
                                    <ListItem
                                        button
                                        component={ReactLink}
                                        to="/admin"
                                    >
                                        <SupervisorAccountIcon className={classes.icon} />
                                        <ListItemText primary="Admin" />
                                    </ListItem>
                                )}
                            {context.userHasRoles(['RP_CITIZEN']) && (
                                <ListItem
                                    button
                                    component={ReactLink}
                                    to="/citizens"
                                >
                                    <AccessibilityNewIcon className={classes.icon} />
                                    <ListItemText primary="My citizens" />
                                </ListItem>
                            )}
                            {context.userHasRoles(['RP_OFFICER']) && (
                                <ListItem
                                    button
                                    component={ReactLink}
                                    to="/officers"
                                >
                                    <GavelIcon className={classes.icon} />
                                    <ListItemText primary="My officers" />
                                </ListItem>
                            )}
                        </List>
                        <Divider variant="middle" />
                        <List component="nav" className={classes.filler}>
                            <ListItem
                                button
                                onClick={() => context.logout()}
                            >
                                <ExitToAppIcon className={classes.icon} />
                                <ListItemText primary="Logout" />
                            </ListItem>
                        </List>
                        <List component="nav">
                            <ListItem
                                button
                                color="secondary"
                                component={Link}
                                href="https://cadvanced.app/"
                                target="_blank"
                            >
                                Powered by CADvanced
                            </ListItem>
                        </List>
                    </React.Fragment>
                )}
            </div>
        </Drawer>
    );
}

export default compose(withContext, withStyles(styles))(CadMenu);
