import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';

import DepartmentIcon from '../../../lib/DepartmentIcon';

const styles = theme => ({
    secondaryHeading: {
        padding: `0 ${theme.spacing.unit * 2}px`,
        color: theme.palette.text.secondary
    },
    callNameColumn: {
        flexBasis: '35%'
    },
    callLocationsColumn: {
        flexBasis: '46.666%'
    },
    callAssignedColumn: {
        flexBasis: '10%'
    },
    departmentIcon: {
        marginRight: '10px'
    }
});

const CallSummary = props => {
    const styles = {
        callHeading: {
            color: props.call.callType.code === 'PANIC' ? '#e20000' : 'default'
        }
    };
    let inc = 'No incidents';
    if (props.call.callIncidents.length > 0) {
        inc = props.call.callIncidents[0].name;
        if (props.call.callIncidents.length > 1) {
            const left = props.call.callIncidents.length - 1;
            inc = `${inc} + ${left}`;
        }
    }
    let loc = 'No locations';
    if (props.call.callLocations.length > 0) {
        loc = props.call.callLocations[0].name;
        if (props.call.callLocations.length > 1) {
            const left = props.call.callLocations.length - 1;
            loc = `${loc} + ${left}`;
        }
    }
    return (
        <React.Fragment>
            <div className={props.classes.departmentIcon}>
                <DepartmentIcon department={props.call.DepartmentId} loadingSize={20} />
            </div>
            <div className={props.classes.callNameColumn}>
                <Typography style={{ ...styles.callHeading }} variant={'h6'}>
                    {inc}
                </Typography>
            </div>
            <div className={props.classes.callLocationsColumn}>
                <Typography
                    variant={'h6'}
                    className={props.classes.secondaryHeading}
                >
                    {loc}
                </Typography>
            </div>
            <div className={props.classes.callAssignedColumn}>
                {props.call.assignedUnits.length > 0 && (
                    <Typography>
                        <SupervisorAccount title={props.call.assignedUnits.length === 1 ? 'Unit assigned' : 'Units assigned'} />
                    </Typography>
                )}
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(CallSummary);
