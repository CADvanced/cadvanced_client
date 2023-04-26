import React, { useState, useEffect, useContext } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FilteredSelect from '../../../../lib/FilteredSelect';

import { AppContext } from '../../../../hoc/ContextProvider';
import { ALL_GENDERS } from '../../../../graphql/Genders/queries';
import { ALL_ETHNICITIES } from '../../../../graphql/Ethnicities/queries';
import {
    CREATE_CITIZEN,
    UPDATE_CITIZEN_DETAILS
} from '../../../../graphql/Citizens/mutations';

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'flex-end'
    },
    panel: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

const CitizenDetails = ({ citizen, classes, doSave, updateSaved, empty }) => {
    const [details, setDetails] = useState(empty);
    const context = useContext(AppContext);

    const { data: dataGenders } = useQuery(ALL_GENDERS);
    const { data: dataEthnicities } = useQuery(ALL_ETHNICITIES);
    const [updateDetails] = useMutation(UPDATE_CITIZEN_DETAILS);
    const [createCitizen] = useMutation(CREATE_CITIZEN);

    // If an update of the data from the API changes, update it here
    useEffect(() => {
        setDetails(citizen);
    }, [citizen]);

    // If we get a told to save our data, do it
    useEffect(() => {
        if (doSave === 'Details') {
            saveChanges().then(() => {
                // Let our parent know that we've saved
                updateSaved(true);
            });
        }
    }, [doSave]);

    // Perform the mutation to send the details to the API
    const saveChanges = () => {
        let mutation = null;
        if (details.hasOwnProperty('id')) {
            mutation = updateDetails;
        } else {
            mutation = createCitizen;
            details.UserId = context.userSession.id;
        }
        return mutation({ variables: details });
    };

    // Handle form changes
    const updateDetail = (field, value) => {
        setDetails({
            ...details,
            [field]: value
        });
    };

    if (!details) {
        return null;
    }

    return (
        <React.Fragment>
            <Grid
                container
                justify="center"
                className={classes.root}
                spacing={40}
            >
                <Grid item lg={6} xs={12}>
                    <Paper className={classes.panel}>
                        <Grid container className={classes.root} spacing={32}>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail(
                                            'firstName',
                                            event.target.value
                                        )
                                    }
                                    value={details.firstName}
                                    label="First name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail(
                                            'lastName',
                                            event.target.value
                                        )
                                    }
                                    value={details.lastName}
                                    label="Last name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                {dataGenders && (
                                    <FormControl fullWidth>
                                        <FilteredSelect
                                            update={value =>
                                                updateDetail('GenderId', value)
                                            }
                                            options={dataGenders.allGenders.map(
                                                op => ({
                                                    label: op.name,
                                                    value: op.id
                                                })
                                            )}
                                            selected={details.GenderId || 0}
                                            placeholder="Gender"
                                            noOptionsMessage="No genders defined"
                                        />
                                    </FormControl>
                                )}
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                {dataEthnicities && (
                                    <FormControl fullWidth>
                                        <FilteredSelect
                                            update={value =>
                                                updateDetail(
                                                    'EthnicityId',
                                                    value
                                                )
                                            }
                                            options={dataEthnicities.allEthnicities.map(
                                                op => ({
                                                    label: op.name,
                                                    value: op.id
                                                })
                                            )}
                                            selected={details.EthnicityId || 0}
                                            placeholder="Ethnicitity"
                                            noOptionsMessage="No ethnicities defined"
                                        />
                                    </FormControl>
                                )}
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail(
                                            'weight',
                                            event.target.value
                                        )
                                    }
                                    value={details.weight}
                                    label="Weight"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail(
                                            'height',
                                            event.target.value
                                        )
                                    }
                                    value={details.height}
                                    label="Height"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Paper className={classes.panel}>
                        <Grid container className={classes.root} spacing={32}>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail('hair', event.target.value)
                                    }
                                    value={details.hair}
                                    label="Hair"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail('eyes', event.target.value)
                                    }
                                    value={details.eyes}
                                    label="Eyes"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail(
                                            'address',
                                            event.target.value
                                        )
                                    }
                                    value={details.address}
                                    label="Address"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail(
                                            'postalCode',
                                            event.target.value
                                        )
                                    }
                                    value={details.postalCode}
                                    label="Postal code"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                                <TextField
                                    onChange={event =>
                                        updateDetail(
                                            'dateOfBirth',
                                            event.target.value
                                        )
                                    }
                                    value={details.dateOfBirth}
                                    label="Date of birth"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(CitizenDetails);
