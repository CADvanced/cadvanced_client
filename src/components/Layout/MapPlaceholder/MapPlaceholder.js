import React from 'react';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        position: 'fixed',
        height: '100vh',
        width: '100%',
        background: 'rgba(0,133,237,0.27)'
    },
    logoContainer: {
        position: 'fixed',
        bottom: '10px'
    },
    mainLogo: {
        width: '800px',
        display: 'block'
    }
};

const MapPlaceholder = props => {
    return (
        <div className={props.classes.root}>
            <Grid
                container
                justify="center"
                className={props.classes.logoContainer}
            >
                <Grid item>
                    <img
                        alt="CADvanced logo"
                        src="/cadvanced_logo.svg"
                        className={props.classes.mainLogo}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(MapPlaceholder);
