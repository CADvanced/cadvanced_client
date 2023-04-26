import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CallDescription from './CallDescription/CallDescription';
import CallSummary from './CallSummary/CallSummary';
import CallInfo from './CallInfo/Callinfo';
import CallIncidents from './CallIncidents/CallIncidents';
import CallLocations from './CallLocations/CallLocations';
import CallUnits from './CallUnits/CallUnits';
import CallMarkerButton from './CallMarkerButton/CallMarkerButton';

const styles = theme => ({
    callDetails: {
        flexDirection: 'column'
    },
    actions: {
        paddingBottom: 0
    },
    divider: {
        marginTop: theme.spacing.unit * 2
    },
    expansionPanelSummary: {
        alignItems: 'center'
    }
});

const Call = props => {
    return (
        <ExpansionPanel
            onMouseEnter={() => props.setHighlightedCall(props.callData.id)}
            onMouseLeave={() => props.setHighlightedCall(null)}
        >
            <ExpansionPanelSummary
                classes={{ content: props.classes.expansionPanelSummary }}
                expandIcon={<ExpandMoreIcon />}>
                <CallSummary call={props.callData} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={props.classes.callDetails}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Description(s):
                        </Typography>
                        {props.callData.callDescriptions.map(description => {
                            return (
                                <Typography
                                    paragraph={true}
                                    key={description.id}
                                >
                                    <CallDescription
                                        description={description}
                                    />
                                </Typography>
                            );
                        })}
                        <Typography gutterBottom={true} variant={'h6'}>
                            Incident(s):
                        </Typography>
                        <Typography paragraph={true}>
                            <CallIncidents
                                incidents={props.callData.callIncidents}
                            />
                        </Typography>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Assigned unit(s):
                        </Typography>
                        <CallUnits
                            units={props.callData.assignedUnits}
                            callId={props.callData.id}
                            department={props.callData.DepartmentId}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Call ID:
                        </Typography>
                        <Typography paragraph={true}>
                            {props.callData.id}
                        </Typography>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Call grade:
                        </Typography>
                        <Typography paragraph={true}>
                            {props.callData.callGrade.name}
                        </Typography>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Caller information:
                        </Typography>
                        <Typography paragraph={true}>
                            <CallInfo info={props.callData.callerInfo} />
                        </Typography>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Locations(s):
                        </Typography>
                        <Typography paragraph={true}>
                            <CallLocations
                                locations={props.callData.callLocations}
                            />
                        </Typography>
                        <CallMarkerButton
                            className={props.classes.callMarkerButton}
                            call={props.callData}
                        />
                    </Grid>
                </Grid>
                <Divider className={props.classes.divider} variant="middle" />
                <ExpansionPanelActions className={props.classes.actions}>
                    <Button
                        size="small"
                        onClick={() => props.edit(props.callData)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        onClick={() => props.delete(props.callData)}
                    >
                        Delete
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withStyles(styles)(Call);
