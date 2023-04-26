import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@material-ui/core';

import withSnacks from '../../../hoc/withSnacks';
import {
    CREATE_DEPARTMENT_ANNOUNCEMENT,
    UPDATE_DEPARTMENT_ANNOUNCEMENT
} from '../../../graphql/Departments/mutations';

const AnnouncementDialog = ({
    open,
    setOpen,
    announcement: passedAnnouncement,
    department,
    sendMessage
}) => {
    const empty = {
        text: ''
    };

    const [createMutation] = useMutation(CREATE_DEPARTMENT_ANNOUNCEMENT);
    const [updateMutation] = useMutation(UPDATE_DEPARTMENT_ANNOUNCEMENT);
    const [announcement, setAnnouncement] = useState(passedAnnouncement || empty);

    useEffect(() => {
        if (passedAnnouncement) {
            setAnnouncement(passedAnnouncement)
        }
    }, [passedAnnouncement]);

    const handleUpsert = async () => {
        const mutation = announcement.id ? updateMutation : createMutation;
        try {
            await mutation({
                variables: {
                    ...announcement,
                    DepartmentId: department.id
                }
            });
            setAnnouncement(empty);
            setOpen(false);
        } catch (e) {
            sendMessage('Unable to carry out action');
        }
    };

    const handleTextUpdate = value => {
        setAnnouncement({
            ...announcement,
            text: value
        })
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
        >
            <DialogTitle>
                {announcement && announcement.id ? 'Edit announcement' : 'Create new announcement'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    multiline
                    fullWidth
                    value={announcement.text}
                    onChange={e => handleTextUpdate(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary">
                    Cancel
                </Button>
                <Button disabled={announcement.text.length === 0} onClick={handleUpsert} color="secondary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default withSnacks(AnnouncementDialog);