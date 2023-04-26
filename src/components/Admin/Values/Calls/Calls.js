import React, { useEffect, useState } from 'react';

import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EditableItems from '../../EditableItems';
import withCallGrades from '../Calls/CallGrades/withCallGrades';
import withCallTypes from '../Calls/CallTypes/withCallTypes';
import withIncidentTypes from '../Calls/IncidentTypes/withIncidentTypes';
import withLocations from '../Calls/Locations/withLocations';
import withCrud from '../../withCrud';
import DepartmentsDropdown from '../../../../lib/DepartmentsDropdown';

import withSnacks from '../../../../hoc/withSnacks';

import { DELETE_ALL_CALLS } from '../../../../graphql/Calls/mutations';
import { ALL_CALLS } from '../../../../graphql/Calls/queries';
import { ALL_CALLS_DELETED } from '../../../../graphql/Calls/subscriptions';

import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmButton from '../../ConfirmButton';

const CallGrades = withCallGrades(withCrud(EditableItems));
const CallTypes = withCallTypes(withCrud(EditableItems));
const IncidentTypes = withIncidentTypes(withCrud(EditableItems));
const Locations = withLocations(withCrud(EditableItems));

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    centredRow: {
        display: 'flex',
        justifyContent: 'center'
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    },
    valueColumns: {
        marginTop: 40
    }
});

const Calls = ({ classes, sendMessage, allCallsDeleted }) => {

    const [selectedDepartment, setSelectedDepartment] = useState('1');
    const [doDelete, { loading, data }] = useMutation(DELETE_ALL_CALLS);

    const [
        updateCalls,
        { loading: allCallsLoading }
    ] = useLazyQuery(
        ALL_CALLS,
        {
            fetchPolicy: 'network-only'
        }
    );

    useEffect(() => {
        if (
            allCallsDeleted &&
            allCallsDeleted.allCallsDeleted &&
            !allCallsLoading
        ) {
            updateCalls();
        }
    }, [allCallsDeleted]);

    useEffect(() => {
        if (data && data.deleteAllCalls) {
            sendMessage('All calls deleted');
        }
        if (data && !data.deleteAllCalls) {
            sendMessage('Unable to delete all calls');
        }
    }, [data])

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item lg={12} xs={12}>
                <Typography
                    align="center"
                    className={classes.pageHead}
                    variant="h2"
                    component="h2"
                >
                    Call values
                </Typography>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.centredRow}>
                <DepartmentsDropdown
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
            </Grid>
            <Grid item lg={12} xs={12} className={classes.centredRow}>
                <ConfirmButton
                    disabled={loading}
                    label="Delete this department's calls"
                    icon={<DeleteIcon />}
                    confirmTitle="Delete all calls?"
                    confirmBody="Are you sure you want to delete all calls belonging to this department? This is irreversable."
                    confirmAction={() => doDelete({ variables: { DepartmentId: selectedDepartment } })}
                />
            </Grid>
            <Grid container className={[classes.root, classes.valueColumns].join(' ')} spacing={40}>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Call grades
                    </Typography>
                    <CallGrades department={selectedDepartment} />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Call types
                    </Typography>
                    <CallTypes department={selectedDepartment} />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Call locations
                    </Typography>
                    <Locations />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Incident types
                    </Typography>
                    <IncidentTypes department={selectedDepartment} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default compose(
    withSnacks,
    withStyles(styles),
    graphql(ALL_CALLS_DELETED, { name: 'allCallsDeleted' })
)(Calls);
