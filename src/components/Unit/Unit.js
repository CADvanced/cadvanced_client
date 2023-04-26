import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';

import UnitStatesDropdown from '../../lib/UnitStatesDropdown';
import UnitCalls from '../Unit/UnitCalls/UnitCalls';
import UnitUsers from '../Unit/UnitUsers/UnitUsers';
import DepartmentIcon from '../../lib/DepartmentIcon';
import { UPDATE_UNIT } from '../../graphql/Units/mutations';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexShrink: 0,
        color: theme.palette.text.primary,
        textAlign: 'left'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary,
        marginLeft: 'auto'
    },
    unitDetails: {
        paddingTop: theme.spacing.unit * 4,
        flexDirection: 'column'
    },
    divider: {
        marginTop: theme.spacing.unit * 2
    },
    actions: {
        paddingBottom: 0
    },
    unitBadgeText: {
        background: 'rgba(0,0,0,0.4)',
        color: '#fff'
    },
    unitBadgeRoot: {
        verticalAlign: 'super'
    },
    expansionSummaryContent: {
        alignItems: 'center'
    },
    unitState: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary,
    },
    unitHeading: {
        alignItems: 'center'
    }
});

const Unit = props => {
    const [editingState, setEditingState] = useState(false);
    const [updateUnit] = useMutation(UPDATE_UNIT);
    const styles = {
        unitBackground: {
            backgroundColor: fade('#' + props.unit.unitState.colour, 0.5)
        },
        unitContentBackground: {
            backgroundColor: fade('#' + props.unit.unitState.colour, 0.3)
        },
        unitColour: {
            color: 'rgba(0,0,0,0.7)'
        }
    };
    const getMutationObj = () => ({
        id: props.unit.id,
        callSign: props.unit.callSign,
        unitTypeId: props.unit.unitType.id,
        unitStateId: props.unit.unitState.id,
        DepartmentId: props.unit.DepartmentId
    });
    const setEditing = (state, event) => {
        event.stopPropagation();
        setEditingState(state);
    };
    const update = obj => {
        updateUnit({ variables: { ...getMutationObj(), ...obj } });
    };
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                style={{ ...styles.unitBackground }}
                expandIcon={<ExpandMoreIcon />}
                classes={{
                    content: props.classes.expansionSummaryContent
                }}
            >
                <Grid container spacing={16} className={props.classes.unitHeading}>
                    <Grid item lg={2}>
                        <DepartmentIcon department={props.unit.DepartmentId} />
                    </Grid>
                    <Grid item lg={1}>
                        <Badge
                            title={
                                `${props.unit.users.length} officer` +
                                (props.unit.users.length === 1 ? '' : 's') +
                                ' assigned'
                            }
                            showZero
                            badgeContent={props.unit.users.length}
                            color="primary"
                            classes={{
                                root: props.classes.unitBadgeRoot,
                                colorPrimary: props.classes.unitBadgeText
                            }}
                        >
                            <span></span>
                        </Badge>
                    </Grid>
                    <Grid item lg={4}>
                        {editingState && (
                            <UnitStatesDropdown
                                open={true}
                                update={update}
                                setOpen={setEditingState}
                                value={props.unit.unitState.id}
                                departmentId={props.unit.DepartmentId}
                            />
                        )}
                        {!editingState && (
                            <Button
                                onClick={e => setEditing(true, e)}
                                style={{ ...styles.unitColour }}
                                className={props.classes.heading}
                            >
                                {props.unit.callSign}
                            </Button>
                        )}
                    </Grid>
                    <Grid item lg={2}>
                        <div className={props.classes.unitState}>
                            <Typography>
                                {props.unit.unitState.name}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item lg={3}>
                        <Button disabled className={props.classes.secondaryHeading}>
                            {props.unit.unitType.name}
                        </Button>
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                style={{ ...styles.unitContentBackground }}
                className={props.classes.unitDetails}
            >
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Assigned calls:
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <UnitCalls calls={props.unit.assignedCalls} />
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography gutterBottom={true} variant={'h6'}>
                            Assigned officers:
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <UnitUsers unit={props.unit} users={props.unit.users} />
                    </Grid>
                </Grid>
                <Divider className={props.classes.divider} variant="middle" />
                <ExpansionPanelActions className={props.classes.actions}>
                    <Button
                        size="small"
                        onClick={() => props.edit(props.unit)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        onClick={() => props.delete(props.unit)}
                    >
                        Delete
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withStyles(styles)(Unit);
