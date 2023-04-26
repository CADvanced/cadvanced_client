import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import MDT from './MDT';

const styles = theme => ({
    root: {
        padding: 0,
        '&:first-child': {
            padding: 0
        }
    }
});

const MDTDialog = ({ open, setOpen, fullScreen, classes }) => {
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            maxWidth="xl"
            scroll="body"
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className={classes.root}>
                <MDT setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
};

export default withStyles(styles)(withMobileDialog()(MDTDialog));
