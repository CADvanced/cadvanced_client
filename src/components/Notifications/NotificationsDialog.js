import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import UpdateIcon from '@material-ui/icons/Update';
import ListItemText from '@material-ui/core/ListItemText';

import withContext from '../../hoc/ContextConsumer';

function NotificationsDialog(props) {
    function handleClose() {
        props.setOpen(false);
    }

    function iterateNotifications() {
        return props.context.notifications.map((notification, idx) =>
            createNotification(notification, idx)
        );
    }

    function createNotification(notification, index) {
        return (
            <ListItem key={index}>
                <ListItemAvatar>
                    <Avatar>
                        <UpdateIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={notification.title}
                    secondary={notification.message}
                />
            </ListItem>
        );
    }

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{'Notifications'}</DialogTitle>
            <DialogContent>
                <List>
                    {props.context.notifications.length > 0 ? (
                        iterateNotifications()
                    ) : (
                        <DialogContentText id="alert-dialog-description">
                            There are currently no notifications
                        </DialogContentText>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withContext(NotificationsDialog);
