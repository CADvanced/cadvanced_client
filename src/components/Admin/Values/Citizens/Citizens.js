import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EditableItems from '../../EditableItems';
import withGenders from './Genders/withGenders';
import withEthnicities from './Ethnicities/withEthnicities';
import withCitizenMarkers from './Markers/withCitizenMarkers';
import withCrud from '../../withCrud';

const Ethnicities = withEthnicities(withCrud(EditableItems));
const Genders = withGenders(withCrud(EditableItems));
const CitizenMarkers = withCitizenMarkers(withCrud(EditableItems));

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    }
});

const Citizens = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={40}>
                <Grid item lg={12} xs={12}>
                    <Typography
                        align="center"
                        className={classes.pageHead}
                        variant="h2"
                        component="h2"
                    >
                        Citizen values
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={40}>
                <Grid item lg={4} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Ethnicities
                    </Typography>
                    <Ethnicities />
                </Grid>
                <Grid item lg={4} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Genders
                    </Typography>
                    <Genders />
                </Grid>
                <Grid item lg={4} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Citizen markers
                    </Typography>
                    <CitizenMarkers />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(Citizens);
