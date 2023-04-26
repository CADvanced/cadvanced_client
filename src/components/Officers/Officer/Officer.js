import React, { useState, useEffect, useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import withSnacks from '../../../hoc/withSnacks';

import {
    CREATE_OFFICER,
    UPDATE_OFFICER,
    DELETE_OFFICER
} from '../../../graphql/Officers/mutations';
import { AppContext } from '../../../hoc/ContextProvider';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing.unit / 2
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '80%',
        flexShrink: 0
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    mainTitle: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 5
    },
    officerName: {
        backgroundColor: theme.palette.primary.main
    },
    officerNameText: {
        color: '#fff'
    },
    panel: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    panelDetails: {
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.mid
    },
    buttonBarLeft: {
        marginTop: theme.spacing.unit * 2
    },
    buttonBarRight: {
        textAlign: 'right',
        marginTop: theme.spacing.unit * 2
    },
    buttonLeft: {
        marginRight: theme.spacing.unit
    },
    buttonRight: {
        marginLeft: theme.spacing.unit
    },
    setActive: {
        textAlign: 'center'
    }
});

const Officer = ({
    classes,
    officer,
    expanded,
    idx,
    setExpanded,
    removeIncomplete,
    updateActive,
    sendMessage
}) => {
    const context = useContext(AppContext);
    const [locOfficer, setLocOfficer] = useState(officer);
    const [createOfficer] = useMutation(CREATE_OFFICER);
    const [updateOfficer] = useMutation(UPDATE_OFFICER);
    const [deleteOfficer] = useMutation(DELETE_OFFICER, {
        onError: () => {
            sendMessage(
                'The operation failed. You may be trying to delete something that is in use.'
            );
        }
    });

    useEffect(() => {
        setLocOfficer(officer);
    }, [officer]);

    const handleExpandToggle = () => {
        const newExpanded = expanded === idx ? null : idx;
        setExpanded(newExpanded);
    };

    const nukeOfficer = () => {
        if (locOfficer.id) {
            deleteOfficer({
                variables: { id: locOfficer.id }
            });
        } else {
            removeIncomplete(idx);
        }
    };

    const handleUpdate = (prop, value) => {
        const newOfficer = {
            ...locOfficer,
            [prop]: value
        };
        setLocOfficer(newOfficer);
    };

    const handleSave = () => {
        const mut = locOfficer.id ? updateOfficer : createOfficer;
        const toSend = { ...locOfficer, UserId: context.userSession.id };
        mut({ variables: toSend });
    };

    return (
        <ExpansionPanel
            className={classes.root}
            expanded={expanded === idx ? true : false}
            onChange={handleExpandToggle}
        >
            <ExpansionPanelSummary
                className={classes.officerName}
                expandIcon={
                    <ExpandMoreIcon className={classes.officerNameText} />
                }
            >
                <Typography
                    className={classes.officerNameText}
                    variant="button"
                >
                    {officer.firstName} {officer.lastName}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
                <Paper className={classes.panel}>
                    <Grid container className={classes.root}>
                        <Grid item lg={10} xs={10}></Grid>
                        <Grid item lg={2} xs={2}>
                            {officer.id && (
                                <Paper className={classes.setActive}>
                                    <FormControlLabel
                                        labelPlacement="start"
                                        control={
                                            <Switch
                                                onChange={() =>
                                                    updateActive(officer.id)
                                                }
                                                checked={officer.active}
                                                value={true}
                                            />
                                        }
                                        label="Active character"
                                    />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container className={classes.root} spacing={40}>
                        <Grid item lg={6} xs={12}>
                            <TextField
                                value={locOfficer.firstName}
                                label="First name"
                                onChange={event =>
                                    handleUpdate(
                                        'firstName',
                                        event.target.value
                                    )
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <TextField
                                value={locOfficer.lastName}
                                label="Last name"
                                onChange={event =>
                                    handleUpdate('lastName', event.target.value)
                                }
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container spacing={0}>
                    <Grid item lg={6} xs={6}>
                        <div className={classes.buttonBarLeft}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={nukeOfficer}
                                className={classes.buttonLeft}
                            >
                                Delete officer
                            </Button>
                        </div>
                    </Grid>
                    <Grid item lg={6} xs={6}>
                        <div className={classes.buttonBarRight}>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                className={classes.buttonRight}
                            >
                                Save
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withSnacks(withStyles(styles)(Officer));
