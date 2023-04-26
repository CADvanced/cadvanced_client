import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';

import { DELETE_CITIZEN } from '../../../graphql/Citizens/mutations';

import CitizenDetails from './CitizenDetails/CitizenDetails';
import CitizenVehicles from './CitizenVehicles/CitizenVehicles';
import CitizenWeapons from './CitizenWeapons/CitizenWeapons';
import CitizenLicences from './CitizenLicences/CitizenLicences';
import CitizenWarrants from './CitizenWarrants/CitizenWarrants';
import CitizenMarkers from './CitizenMarkers/CitizenMarkers';
import CitizenLegal from './CitizenLegal/CitizenLegal';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing.unit / 2
    },
    citizenName: {
        backgroundColor: theme.palette.primary.main
    },
    citizenNameText: {
        color: '#fff'
    },
    citizenId: {
        paddingLeft: theme.spacing.unit * 2,
        color: 'rgba(255,255,255,0.6)'
    },
    citizenMarkers: {
        paddingLeft: theme.spacing.unit * 2
    },
    panelDetails: {
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.mid
    },
    stepper: {
        marginBottom: theme.spacing.unit,
        backgroundColor: theme.palette.primary.mid,
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4,
        paddingRight: 0,
        paddingLeft: 0
    },
    setActive: {
        marginBottom: theme.spacing.unit,
        textAlign: 'center'
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
    }
});

const Citizen = ({
    classes,
    citizen,
    expanded,
    idx,
    setExpanded,
    removeIncomplete,
    updateActive,
    selectActive,
    empty
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [saved, setSaved] = useState(false);
    const [doSave, setDoSave] = useState();
    const [direction, setDirection] = useState();
    const [deleteCitizen] = useMutation(DELETE_CITIZEN);

    const steps = [
        { name: 'Details', save: true },
        { name: 'Vehicles', save: false },
        { name: 'Weapons', save: false },
        { name: 'Licences', save: false },
        { name: 'Warrants', save: false },
        { name: 'Citizen markers', save: false },
        { name: 'Legal', save: false }
    ];

    // When we are alerted that the current form is saved
    // (saved), identify which direction the user was going and
    // go in that direction
    useEffect(() => {
        if (saved) {
            if (direction === 'f') {
                goForwards();
            } else if (direction === 'b') {
                goBackwards();
            }
            setDirection();
            setSaved(false);
        }
    }, [saved]);

    const handleExpandToggle = () => {
        const newExpanded = expanded === idx ? null : idx;
        setExpanded(newExpanded);
    };

    const updateSaved = isSaved => {
        setSaved(isSaved);
    };

    const goForwards = () => {
        setActiveStep(
            activeStep < steps.length - 1 ? activeStep + 1 : steps.length - 1
        );
    };

    const goBackwards = () => {
        setActiveStep(activeStep >= 1 ? activeStep - 1 : 0);
    };

    const nukeCitizen = () => {
        if (citizen.id) {
            deleteCitizen({ variables: { id: citizen.id } });
        } else {
            removeIncomplete(idx);
        }
    };

    function getStepComponent(step) {
        switch (step) {
            case 0:
                return (
                    <CitizenDetails
                        doSave={doSave}
                        updateSaved={updateSaved}
                        empty={empty}
                        citizen={citizen}
                    />
                );
            case 1:
                return (
                    <CitizenVehicles
                        doSave={doSave}
                        updateSaved={updateSaved}
                        citizen={citizen}
                    />
                );
            case 2:
                return (
                    <CitizenWeapons
                        doSave={doSave}
                        updateSaved={updateSaved}
                        citizen={citizen}
                    />
                );
            case 3:
                return (
                    <CitizenLicences
                        doSave={doSave}
                        updateSaved={updateSaved}
                        citizen={citizen}
                    />
                );
            case 4:
                return (
                    <CitizenWarrants
                        doSave={doSave}
                        updateSaved={updateSaved}
                        citizen={citizen}
                    />
                );
            case 5:
                return (
                    <CitizenMarkers
                        doSave={doSave}
                        updateSaved={updateSaved}
                        citizen={citizen}
                    />
                );
            case 6:
                return (
                    <CitizenLegal
                        doSave={doSave}
                        updateSaved={updateSaved}
                        citizen={citizen}
                    />
                );
            default:
                return 'Unknown step';
        }
    }

    const handleNext = () => {
        setDirection('f');
        setDoSave(steps[activeStep].name);
    };

    const handlePrevious = () => {
        setDirection('b');
        setDoSave(steps[activeStep].name);
    };

    return (
        <ExpansionPanel
            className={classes.root}
            expanded={expanded === idx ? true : false}
            onChange={handleExpandToggle}
        >
            <ExpansionPanelSummary
                className={classes.citizenName}
                expandIcon={
                    <ExpandMoreIcon className={classes.citizenNameText} />
                }
            >
                <Typography
                    className={classes.citizenNameText}
                    variant="button"
                >
                    {citizen.firstName} {citizen.lastName}
                    {citizen.id && (
                        <React.Fragment>
                            <span className={classes.citizenId}>
                                [ ID: {citizen.id} ]
                            </span>
                            <span className={classes.citizenMarkers}>
                                {citizen.markers &&
                                    citizen.markers.map(m => m.name).join(', ')}
                            </span>
                        </React.Fragment>
                    )}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
                {expanded === idx && (
                    <React.Fragment>
                        <Grid
                            alignItems="center"
                            justify="flex-end"
                            spacing={32}
                            container
                        >
                            <Grid
                                item
                                lg={selectActive ? 10 : 12}
                                xs={selectActive ? 10 : 12}
                            >
                                <Stepper
                                    className={classes.stepper}
                                    activeStep={activeStep}
                                    nonLinear
                                >
                                    {steps.map((step, index) => {
                                        return (
                                            <Step key={step.name}>
                                                <StepButton
                                                    disabled={!citizen.id}
                                                    onClick={() =>
                                                        setActiveStep(index)
                                                    }
                                                >
                                                    {step.name}
                                                </StepButton>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </Grid>
                            {selectActive && (
                                <Grid item lg={2} xs={2}>
                                    {citizen.id && (
                                        <Paper className={classes.setActive}>
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        onChange={() =>
                                                            updateActive(
                                                                citizen.id
                                                            )
                                                        }
                                                        checked={citizen.active}
                                                        value={true}
                                                    />
                                                }
                                                label="Active character"
                                            />
                                        </Paper>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                        <div>{getStepComponent(activeStep)}</div>
                        <Grid container className={classes.root} spacing={32}>
                            <Grid item lg={6} xs={6}>
                                <div className={classes.buttonBarLeft}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={nukeCitizen}
                                        className={classes.buttonLeft}
                                    >
                                        Delete citizen
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item lg={6} xs={6}>
                                <div className={classes.buttonBarRight}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handlePrevious}
                                        className={classes.buttonRight}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        disabled={
                                            activeStep === steps.length - 1
                                        }
                                        variant="contained"
                                        onClick={handleNext}
                                        className={classes.buttonRight}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withStyles(styles)(Citizen);
