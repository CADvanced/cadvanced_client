import React, { useState, useEffect, createRef } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import GavelIcon from '@material-ui/icons/Gavel';

import withContext from '../../hoc/ContextConsumer';
import Officer from './Officer/Officer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import DepartmentsDropdown from '../../lib/DepartmentsDropdown';
import { GET_USER_OFFICERS } from '../../graphql/Officers/queries';
import { SET_CHARACTER } from '../../graphql/Character/mutations';
import { CHARACTER_ACTIVE_UPDATED } from '../../graphql/Character/subscriptions';
import {
    OFFICER_ADDED,
    OFFICER_UPDATED,
    OFFICER_DELETED
} from '../../graphql/Officers/subscriptions';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 5,
        flexGrow: 1
    },
    headerPad: {
        height: theme.spacing.unit * 2
    },
    pageHead: {
        color: theme.palette.primary.darkShade
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 6,
        right: theme.spacing.unit * 6,
        zIndex: 1100
    },
    noOfficers: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 10,
        color: theme.palette.primary.darkShade
    },
    departmentSelect: {
        margin: '30px 0 0 0',
        display: 'flex',
        justifyContent: 'center'
    }
});

const Officers = props => {
    const { classes, context } = props;

    if (!context.userSession.id) {
        return <LoadingSpinner />;
    }

    const [setCharacter] = useMutation(SET_CHARACTER);

    const [officers, setOfficers] = useState([]);
    const [expanded, setExpanded] = useState();
    const [addedNew, setAddedNew] = useState(false);
    const [department, setDepartment] = useState('1');

    const empty = {
        firstName: '',
        lastName: '',
        DepartmentId: department
    };

    const { loading, data, subscribeToMore, refetch } = useQuery(
        GET_USER_OFFICERS,
        {
            variables: {
                UserId: context.userSession.id,
                DepartmentId: department
            }
        }
    );

    // Subscribe to active updates, so our cache gets updated
    useSubscription(CHARACTER_ACTIVE_UPDATED);

    const refs = officers.reduce((acc, value, idx) => {
        acc[idx] = createRef();
        return acc;
    }, {});

    useEffect(() => {
        setOfficers(data ? data.getUserOfficers : []);
    }, [data]);

    useEffect(() => setExpanded(), [department]);

    [OFFICER_ADDED, OFFICER_UPDATED, OFFICER_DELETED].forEach(query => {
        useEffect(() => {
            const unsubscribe = subscribeToMore({
                document: query,
                updateQuery: prev => {
                    refetch();
                    return prev;
                }
            });
            return () => unsubscribe();
        }, []);
    });

    useEffect(() => {
        if (addedNew) {
            refs[officers.length - 1].current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setAddedNew(false);
        }
    }, [addedNew]);

    const addEmpty = () => {
        if (officers.length === 0 || officers[0].hasOwnProperty('id')) {
            const oldOfficers = [...officers];
            oldOfficers.push(empty);
            setOfficers(oldOfficers);
            setExpanded(officers.length);
            setAddedNew(true);
        }
    };

    const removeIncomplete = idx => {
        let toSet = [...officers];
        toSet.splice(idx, 1);
        setOfficers(toSet);
    };

    const updateActive = id => {
        const current = officers.find(off => off.id === id);
        if (current) {
            const newState = !current.active;
            return setCharacter({
                variables: {
                    type: 'officer',
                    id: id,
                    active: newState
                }
            });
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            <Fab
                onClick={addEmpty}
                color="secondary"
                aria-label="add"
                className={classes.fab}
            >
                <AddIcon />
            </Fab>
            <Grid
                container
                className={classes.pageHead}
                spacing={32}
                justify="center"
                direction="row"
                alignItems="center"
            >
                <Grid className={classes.headerPad} item lg={12} xs={12}></Grid>
                <Grid item>
                    <GavelIcon fontSize="large" />
                </Grid>
                <Grid item>
                    <Typography
                        className={classes.pageHead}
                        variant="h2"
                        component="h2"
                    >
                        Manage my officers
                    </Typography>
                </Grid>
            </Grid>
            <div className={classes.departmentSelect}>
                <DepartmentsDropdown selectedDepartment={department} setSelectedDepartment={setDepartment} />
            </div>
            {data && officers.length === 0 && (
                <Typography
                    className={classes.noOfficers}
                    variant="h3"
                    component="h3"
                    gutterBottom
                >
                    You've got no officers defined :-(
                </Typography>
            )}
            {officers.length > 0 && (
                <Grid container className={classes.root} spacing={0}>
                    <Grid item lg={1} xs={false} />
                    <Grid item lg={10} xs={12}>
                        <div>
                            {officers.map((officer, idx) => (
                                <div ref={refs[idx]} key={idx}>
                                    <Officer
                                        ref={refs[idx]}
                                        empty={empty}
                                        expanded={expanded}
                                        setExpanded={setExpanded}
                                        removeIncomplete={removeIncomplete}
                                        idx={idx}
                                        officer={officer}
                                        updateActive={updateActive}
                                    />
                                </div>
                            ))}
                        </div>
                    </Grid>
                    <Grid item lg={1} xs={false} />
                </Grid>
            )}
        </Typography>
    );
};

export default withStyles(styles)(withContext(Officers));
