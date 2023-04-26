import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const ConfirmButton = ({
    classes,
    label,
    icon,
    confirmTitle,
    confirmBody,
    confirmAction,
    disabled,
    size,
    variant
}) => {
    const [modalDisplay, setModalDisplay] = useState(false);

    const extraProps = {
        className: classes.rightIcon
    };

    const handleConfirm = () => {
        setModalDisplay(false);
        confirmAction();
    };

    const handleDecline = () => {
        setModalDisplay(false);
    };

    return (
        <React.Fragment>
            <Button
                size={size || 'medium'}
                disabled={disabled}
                variant={variant || 'contained'}
                color="primary"
                onClick={() => setModalDisplay(true)}
            >
                {label}
                {icon && (
                    <icon.type {...icon.props} {...extraProps} />
                )}
            </Button>
            <Dialog
                open={modalDisplay}
                onClose={() => setModalDisplay(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{confirmTitle}</DialogTitle>
                {confirmBody && (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {confirmBody}
                        </DialogContentText>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={handleDecline} color="secondary">
                        No
                    </Button>
                    <Button onClick={handleConfirm} color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );

};

export default withStyles(styles)(ConfirmButton);