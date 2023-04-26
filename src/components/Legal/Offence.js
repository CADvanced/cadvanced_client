import React, { useState, useEffect, useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Typography from '@material-ui/core/Typography';

import Arrest from './Arrest/Arrest';
import Ticket from './Ticket/Ticket';
import OffenceCharges from './OffenceCharges';
import { AppContext } from '../../hoc/ContextProvider';

import {
    CREATE_OFFENCE,
    UPDATE_OFFENCE,
    DELETE_OFFENCE
} from '../../graphql/Offences/mutations';

const styles = theme => ({
    card: {
        marginBottom: theme.spacing.unit * 5,
        overflow: 'inherit'
    },
    actions: {
        display: 'flex'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    offenceDetail: {
        display: 'flex'
    },
    offenceItem: {
        flexGrow: 1,
        marginBottom: 0,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        maxWidth: '33%'
    },
    summary: {
        display: 'inline',
        float: 'right'
    },
    summaryField: {
        marginRight: theme.spacing.unit / 2
    }
});

const Offence = ({ offence, citizen, classes }) => {
    const [editing, setEditing] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [locOffence, setLocOffence] = useState(offence);

    const [createOffence] = useMutation(CREATE_OFFENCE);
    const [updateOffence] = useMutation(UPDATE_OFFENCE);
    const [deleteOffence] = useMutation(DELETE_OFFENCE);

    const context = useContext(AppContext);

    useEffect(() => {
        if (!locOffence.id) {
            setEditing(true);
        }
    }, []);

    useEffect(() => {
        setLocOffence(offence);
    }, [offence]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const doDelete = () => {
        deleteOffence({
            variables: { id: locOffence.id, CitizenId: citizen.id }
        });
    };

    const updateDetail = (field, value) => {
        setLocOffence({
            ...locOffence,
            [field]: value
        });
    };

    const doSave = () => {
        const mut = locOffence.id ? updateOffence : createOffence;
        const toSend = { ...locOffence, CitizenId: citizen.id };
        mut({ variables: toSend });
        setEditing(false);
        setExpanded(true);
    };

    return (
        <Card className={classes.card}>
            <CardHeader
                disableTypography={true}
                title={
                    <React.Fragment>
                        <Typography variant="h5" component="span" inline={true}>
                            Offence
                        </Typography>
                        {!editing && (
                            <Typography
                                variant="h6"
                                component="span"
                                color="textSecondary"
                                inline={true}
                                className={classes.summary}
                            >
                                {locOffence.date || 'Unknown date'} at{' '}
                                {locOffence.time || 'unknown time'} -{' '}
                                {locOffence.location || 'Unknown location'}
                            </Typography>
                        )}
                        {editing && (
                            <div className={classes.summary}>
                                <TextField
                                    className={classes.summaryField}
                                    onChange={event =>
                                        updateDetail('date', event.target.value)
                                    }
                                    value={locOffence.date}
                                    label="Date"
                                />
                                <TextField
                                    className={classes.summaryField}
                                    onChange={event =>
                                        updateDetail('time', event.target.value)
                                    }
                                    value={locOffence.time}
                                    label="Time"
                                />
                                <TextField
                                    className={classes.summaryField}
                                    onChange={event =>
                                        updateDetail(
                                            'location',
                                            event.target.value
                                        )
                                    }
                                    value={locOffence.location}
                                    label="Location"
                                />
                                <Button
                                    variant="contained"
                                    className={classes.summaryField}
                                    onClick={() => doSave()}
                                    color="secondary"
                                >
                                    Save
                                </Button>
                            </div>
                        )}
                    </React.Fragment>
                }
                avatar={
                    <Avatar aria-label="Offence">
                        <DirectionsRunIcon />
                    </Avatar>
                }
            />
            {locOffence.id && (
                <React.Fragment>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent className={classes.offenceDetail}>
                            <div className={classes.offenceItem}>
                                <Arrest
                                    className={classes.offenceItem}
                                    arrest={locOffence.arrest}
                                    offence={locOffence}
                                    citizen={citizen}
                                ></Arrest>
                            </div>
                            <div className={classes.offenceItem}>
                                <OffenceCharges
                                    className={classes.offenceItem}
                                    charges={locOffence.charges}
                                    offence={locOffence}
                                    citizen={citizen}
                                ></OffenceCharges>
                            </div>
                            <div className={classes.offenceItem}>
                                <Ticket
                                    className={classes.offenceItem}
                                    ticket={locOffence.ticket}
                                    offence={locOffence}
                                    citizen={citizen}
                                ></Ticket>
                            </div>
                        </CardContent>
                    </Collapse>
                    <CardActions
                        className={classes.actions}
                        disableActionSpacing
                    >
                        {!expanded &&
                            context.userHasRoles([
                                'OWN_CITIZENS_RECORD',
                                'CITIZEN_MGR'
                            ]) && (
                                <React.Fragment>
                                    <Button
                                        onClick={() => setEditing(true)}
                                        color="secondary"
                                    >
                                        Edit offence
                                    </Button>
                                    <Button
                                        onClick={doDelete}
                                        color="secondary"
                                    >
                                        Delete offence
                                    </Button>
                                </React.Fragment>
                            )}
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: expanded
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </React.Fragment>
            )}
        </Card>
    );
};

export default withStyles(styles)(Offence);
