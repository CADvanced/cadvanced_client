import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    withStyles
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import EditRounded from '@material-ui/icons/EditRounded';

import useDepartmentAnnouncements from '../../../hoc/useDepartmentAnnouncements';
import AnnouncementDialog from './AnnouncementDialog';
import ConfirmButton from '../ConfirmButton';
import { DELETE_DEPARTMENT_ANNOUNCEMENT } from '../../../graphql/Departments/mutations';

const styles = theme => ({
    heading: {
        flex: 1,
        font: '1em "Jura", sans-serif',
        fontWeight: 700,
    },
    noAnnouncements: {
        font: '1em "Jura", sans-serif',
        textAlign: 'center',
        marginTop: 20
    },
    list: {
        maxHeight: 300,
        overflowY: 'auto'
    }
});

// Trim a string to 70 characters
const trimmedText = trimMe => {
    return trimMe.substring(0, 67) + (trimMe.length > 70 ? '...' : '');
};

const DepartmentAnnouncements = ({ department, classes }) => {
    const { data } = useDepartmentAnnouncements(department);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [announcement, setAnnouncement] = useState();
    const [deleteMutation] = useMutation(DELETE_DEPARTMENT_ANNOUNCEMENT);

    const editAnnouncement = announcement => {
        setAnnouncement(announcement);
        setDialogOpen(true);
    };

    const handleDelete = toDelete => {
        deleteMutation({ variables: { id: toDelete.id } });
    };

    return (
        <React.Fragment>
            <AnnouncementDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                department={department}
                announcement={announcement}
            />
            <AppBar position="relative" color="secondary">
                <Toolbar variant="dense">
                    <Typography className={classes.heading}>
                        Announcements
                    </Typography>
                    <IconButton color="primary" onClick={() => setDialogOpen(true)}>
                        <AddCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {!data || data.allDepartmentAnnouncements.length === 0 && (
                <Typography className={classes.noAnnouncements}>
                    There are no announcements
                </Typography>
            )}
            {data && data.allDepartmentAnnouncements.length > 0 && (
                <List dense className={classes.list}>
                    {data.allDepartmentAnnouncements.map(ann => (
                        <React.Fragment key={ann.id}>
                            <ListItem key={ann.id}>
                                <IconButton onClick={() => editAnnouncement(ann)} >
                                    <EditRounded />
                                </IconButton>
                                <ListItemText
                                    primary={trimmedText(ann.text)}
                                />
                                <ListItemSecondaryAction>
                                    <ConfirmButton
                                        label="Delete"
                                        size="small"
                                        variant="text"
                                        confirmTitle="Delete this announcement?"
                                        confirmBody={`Are you sure you want to delete "${trimmedText(ann.text)}"?`}
                                        confirmAction={() => handleDelete(ann)}
                                    >
                                    </ConfirmButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider light />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(DepartmentAnnouncements);