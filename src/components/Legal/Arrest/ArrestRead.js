import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ChargesRead from '../Charges/ChargesRead';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const styles = theme => ({
    title: {
        fontSize: 14
    },
    chargesTitle: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    }
});

const ArrestRead = ({ arrest, classes }) => {
    if (!arrest.officer) return <LoadingSpinner />;
    return (
        <React.Fragment>
            <Typography variant="body1" component="p" gutterBottom>
                Arrested on
                <span> </span>
                {arrest.date || 'Unknown date'}
                <span> </span>
                at
                <span> </span>
                {arrest.time || 'unknown time'}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                Arresting officer:
                <span> </span>
                {arrest.officer.firstName}
                <span> </span>
                {arrest.officer.lastName}
            </Typography>
            {arrest.charges.length > 0 && (
                <React.Fragment>
                    <Typography
                        className={classes.chargesTitle}
                        variant="h6"
                        component="p"
                    >
                        Charges
                    </Typography>
                    <ChargesRead charges={arrest.charges} />
                </React.Fragment>
            )}
            {arrest.charges.length === 0 && (
                <Typography
                    className={classes.chargesTitle}
                    variant="h6"
                    component="p"
                >
                    No charges
                </Typography>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(ArrestRead);
