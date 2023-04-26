import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2
    }
});

const withSnacks = WrappedComponent => {
    class WithSnacks extends Component {
        state = {
            open: false,
            messageInfo: {}
        };

        queue = [];

        handleClick = message => {
            this.queue.push({
                message,
                key: new Date().getTime()
            });
            if (this.state.open) {
                // immediately begin dismissing current message
                // to start showing new one
                this.setState({ open: false });
            } else {
                this.processQueue();
            }
        };

        processQueue = () => {
            if (this.queue.length > 0) {
                this.setState({
                    messageInfo: this.queue.shift(),
                    open: true
                });
            }
        };

        handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({ open: false });
        };

        handleExited = () => {
            this.processQueue();
        };

        render() {
            const { classes, ...other } = this.props;
            const { message, key } = this.state.messageInfo;
            return (
                <div>
                    <WrappedComponent
                        sendMessage={this.handleClick}
                        {...other}
                    />
                    <Snackbar
                        key={key}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        open={this.state.open}
                        autoHideDuration={2000}
                        onClose={this.handleClose}
                        onExited={this.handleExited}
                        ContentProps={{
                            'aria-describedby': 'message-id'
                        }}
                        message={<span id="message-id">{message}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        ]}
                    />
                </div>
            );
        }
    }
    return withStyles(styles)(WithSnacks);
};

export default withSnacks;
