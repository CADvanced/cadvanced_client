import React, { Component } from 'react';

import compose from 'lodash.flowright';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    tabTitle: {
        marginBottom: '40px'
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 8
    }
});

class Downloads extends Component {
    render() {
        return (
            <React.Fragment>
                <Typography
                    align="center"
                    className={this.props.classes.pageHead}
                    variant="h2"
                    component="h2"
                >
                    Downloads
                </Typography>
                <Grid
                    container
                    className={this.props.classes.root}
                    spacing={40}
                >
                    <Grid item lg={6} xs={12}>
                        <Typography variant="h5" gutterBottom>
                            FiveM resource
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Installation of the CADvanced FiveM resource is
                            exactly the same as any other FiveM resource.
                            Instructions can be found on the{' '}
                            <a href="https://cadvanced.app/mdt">
                                resource's Github site
                            </a>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            If you have any problems, do not hesitate to ask for
                            help on the{' '}
                            <a href="https://cadvanced.app/discord">
                                Discord server
                            </a>{' '}
                            or raise a{' '}
                            <a href="https://cadvanced.app/support">
                                support ticket
                            </a>
                        </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Typography variant="h5" gutterBottom>
                            User manual
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You can always find the latest version of the user
                            manual{' '}
                            <a href="https://cadvanced.app/manual">
                                here
                            </a>
                            . Many thanks to community staff member Alex D. for
                            writing and maintaining the manual.
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default compose(withStyles(styles))(Downloads);
