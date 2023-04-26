import React from 'react';

import {
    withStyles,
    Divider,
    Typography
} from '@material-ui/core';

const styles = theme => ({
    announcement: {
        margin: '10px 0',
        whiteSpace: 'pre-line' // Preserve newlines
    }
});

const Announcement = ({ announcement, classes }) => {
    return (
        <React.Fragment>
            <Typography className={classes.announcement}>{announcement.text}</Typography>
            <Divider light />
        </React.Fragment>
    );
};

const Announcements = ({ announcements, classes }) => {
    return announcements.map(ann =>
        <Announcement key={ann.id} announcement={ann} classes={classes} />
    );
};

export default withStyles(styles)(Announcements);