import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EditableItems from '../../EditableItems';
import EditableUnitStates from './UnitStates/EditableUnitStates';
import withUnitTypes from '../Units/UnitTypes/withUnitTypes';
import withUnitStates from '../Units/UnitStates/withUnitStates';
import withCrud from '../../withCrud';
import DepartmentsDropdown from '../../../../lib/DepartmentsDropdown';

const UnitTypes = withUnitTypes(withCrud(EditableItems));
const UnitStates = withUnitStates(withCrud(EditableUnitStates));

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    },
    centredRow: {
        display: 'flex',
        justifyContent: 'center'
    },
});

const Units = props => {
    const { classes } = props;
    const [selectedDepartment, setSelectedDepartment] = useState('1');

    return (
        <Grid container className={classes.root} spacing={40}>
            <Grid item lg={12} xs={12}>
                <Typography
                    align="center"
                    className={classes.pageHead}
                    variant="h2"
                    component="h2"
                >
                    Unit values
                </Typography>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.centredRow}>
                <DepartmentsDropdown
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                />
            </Grid>
            <Grid item lg={4} xs={12}>
                <Typography variant="h4" gutterBottom>
                    Unit types
                </Typography>
                <UnitTypes department={selectedDepartment} />
            </Grid>
            <Grid item lg={4} xs={12}>
                <Typography variant="h4" gutterBottom>
                    Unit states
                </Typography>
                <UnitStates department={selectedDepartment} />
            </Grid>
            <Grid item lg={4} xs={12} />
        </Grid>
    );
};

export default withStyles(styles)(Units);
