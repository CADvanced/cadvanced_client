import React, { useState, useEffect } from 'react';

import { Query } from 'react-apollo';

import { useLazyQuery } from '@apollo/react-hooks';

import compose from 'lodash.flowright';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Preference from './Preference/Preference';
import withPreferences from '../../../hoc/withPreferences';
import { ALL_USER_TYPES } from '../../../graphql/Users/queries';
import { INITIALISE_FIVEM } from '../../../graphql/Preferences/queries';
import {
    ALL_UNIT_TYPES,
    ALL_UNIT_STATES
} from '../../../graphql/Units/queries';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    },
    section: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    sectionHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    },
    field: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    button: {
        marginLeft: '10px'
    },
    initialiseResultSuccess: {
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        background: theme.palette.primary.success
    },
    initialiseResultError: {
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        background: theme.palette.primary.error
    }
});

// Map preference to query for preferences that need
// a canonical list to choose from
const prefMap = {
    default_roles: {
        query: ALL_USER_TYPES,
        resultProperty: 'allUserTypes',
        keyProp: 'id'
    },
    panic_assigned_unit_types: {
        query: ALL_UNIT_TYPES,
        resultProperty: 'allUnitTypes',
        keyProp: 'id'
    },
    panic_assigned_unit_states: {
        query: ALL_UNIT_STATES,
        resultProperty: 'allUnitStates',
        keyProp: 'id'
    }
};

// Return a preference component, optionally wrapped with it's
// canonical list query
const getPrefComponent = (key, prefs) => {
    if (prefMap.hasOwnProperty(key)) {
        const pref = prefs.find(p => p.key === key);
        const thisPrefMap = prefMap[key];
        const dataProp = thisPrefMap.resultProperty;
        const query = thisPrefMap.query;
        const keyProp = thisPrefMap.keyProp;
        return (
            <Query query={query}>
                {({ data }) => {
                    if (
                        !data ||
                        !data.hasOwnProperty(dataProp) ||
                        !data[dataProp]
                    ) {
                        return null;
                    }
                    const prepped = data[dataProp];
                    return (
                        <Preference
                            keyProp={keyProp}
                            preference={pref}
                            extraData={prepped}
                        />
                    );
                }}
            </Query>
        );
    } else {
        return <Preference preference={prefs.find(p => p.key === key)} />;
    }
};

const InitialiseResult = ({ response, props }) => {
    if (!response || !response.initialiseFiveM) {
        return null;
    } else if (response.initialiseFiveM.message.match(/ECONNREFUSED/)) {
        return <div className={props.classes.initialiseResultError}><Typography>Unable to contact FiveM server, please check your details</Typography></div>;
    } else if (response.initialiseFiveM.message === 'FAIL') {
        return <div className={props.classes.initialiseResultError}><Typography>Unable to create config file on server - please contact support</Typography></div>;
    } else if (response.initialiseFiveM.message !== 'OK') {
        return <div className={props.classes.initialiseResultError}><Typography>Unknown error</Typography></div>;
    } else if (response.initialiseFiveM.message === 'OK') {
        return <div className={props.classes.initialiseResultSuccess}><Typography>FiveM server successfully initialised. Please restart the CADvanced resource.</Typography></div>;
    }
};

const Prefs = (props) => {
    const [fivemIsInvalid, setFivemIsInvalid] = useState(true);

    // Handle the user clicking "Initialise FiveM server"
    const [go, { data }] = useLazyQuery(INITIALISE_FIVEM, {
        fetchPolicy: "no-cache"
    });

    useEffect(() => {
        if (!props.allPreferences) {
            return;
        }
        const ip = props.allPreferences.find(p => p.key === 'fivem_server_ip').value;
        const port = props.allPreferences.find(p => p.key === 'fivem_server_port').value;
        if (
            !ip || ip.length === 0 ||
            !port || port.length === 0
        ) {
            setFivemIsInvalid(true);
        } else {
            setFivemIsInvalid(false);
        }
    }, [props.allPreferences]);

    return (
        <Grid container className={props.classes.root} spacing={40}>
            <Grid item lg={12} xs={12}>
                <Typography
                    align="center"
                    className={props.classes.pageHead}
                    variant="h2"
                    component="h2"
                >
                    Preferences
                </Typography>
            </Grid>
            {props.allPreferences && (
                <React.Fragment>
                    <Grid item xs={12}>
                        <Paper className={props.classes.section}>
                            <Typography
                                className={props.classes.sectionHead}
                                variant="h3"
                                component="h3"
                            >
                                New user roles
                            </Typography>
                            <div className={props.classes.field}>
                                {getPrefComponent(
                                    'default_roles',
                                    props.allPreferences
                                )}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Paper className={props.classes.section}>
                            <Typography
                                className={props.classes.sectionHead}
                                variant="h3"
                                component="h3"
                            >
                                FiveM integration
                            </Typography>
                            <div className={props.classes.field}>
                                {getPrefComponent(
                                    'fivem_server_ip',
                                    props.allPreferences
                                )}
                            </div>
                            <div className={props.classes.field}>
                                {getPrefComponent(
                                    'fivem_server_port',
                                    props.allPreferences
                                )}
                            </div>
                            <div className={[props.classes.field, props.classes.button].join(' ')}>
                                <Button
                                    onClick={() => go()}
                                    disabled={fivemIsInvalid}
                                    color="secondary"
                                    variant="contained"
                                    aria-label="Initialise FiveM server"
                                >
                                    <Typography>Initialise FiveM server</Typography>
                                </Button>
                                <InitialiseResult
                                    className={props.classes.initialiseResult}
                                    response={data}
                                    props={props}
                                />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Paper className={props.classes.section}>
                            <Typography
                                className={props.classes.sectionHead}
                                variant="h3"
                                component="h3"
                            >
                                Panic button
                            </Typography>
                            <div className={props.classes.field}>
                                {getPrefComponent(
                                    'panic_assigned_unit_types',
                                    props.allPreferences
                                )}
                            </div>
                            <div className={props.classes.field}>
                                {getPrefComponent(
                                    'panic_assigned_unit_states',
                                    props.allPreferences
                                )}
                            </div>
                            <Typography>
                                Only units with the selected unit types AND
                                selected unit states will be assigned
                            </Typography>
                            <div className={props.classes.field}>
                                {getPrefComponent(
                                    'panic_assign_unit_state',
                                    props.allPreferences
                                )}
                            </div>
                        </Paper>
                        <Paper className={props.classes.section}>
                            <Typography
                                className={props.classes.sectionHead}
                                variant="h3"
                                component="h3"
                            >
                                Dispatcher
                            </Typography>
                            <div className={props.classes.field}>
                                {getPrefComponent(
                                    'user_picker',
                                    props.allPreferences
                                )}
                            </div>
                        </Paper>
                    </Grid>
                </React.Fragment>
            )}
        </Grid>
    );
}

export default compose(withPreferences, withStyles(styles))(Prefs);
