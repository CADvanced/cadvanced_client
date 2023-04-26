import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import FilteredSelect from '../../../../lib/FilteredSelect';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import { ALL_LICENCE_TYPES } from '../../../../graphql/LicenceTypes/queries';
import { ALL_LICENCE_STATUSES } from '../../../../graphql/LicenceStatuses/queries';
import {
    CREATE_LICENCE,
    UPDATE_LICENCE,
    DELETE_LICENCE
} from '../../../../graphql/Licences/mutations';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    button: {
        margin: theme.spacing.unit
    },
    actions: {
        textAlign: 'right'
    }
});

const Licence = ({ licence, citizen, classes }) => {
    const [dirty, setDirty] = useState(false);
    const [licenceState, setLicenceState] = useState(licence);
    const { data: licenceTypes } = useQuery(ALL_LICENCE_TYPES);
    const { data: licenceStatuses } = useQuery(ALL_LICENCE_STATUSES);
    const [createLicence] = useMutation(CREATE_LICENCE);
    const [updateLicence] = useMutation(UPDATE_LICENCE);
    const [deleteLicence] = useMutation(DELETE_LICENCE);

    useEffect(() => {
        setLicenceState(licence);
    }, [licence]);

    const update = (field, value) => {
        setLicenceState({
            ...licenceState,
            [field]: value
        });
        setDirty(true);
    };

    if (!licenceState) {
        return <LoadingSpinner />;
    }

    const saveChanges = () => {
        let toSend = { ...licenceState, CitizenId: citizen.id };
        const mutation = toSend.hasOwnProperty('id')
            ? updateLicence
            : createLicence;
        mutation({ variables: toSend }).then(ret => {
            setDirty(false);
        });
    };

    const doDelete = () => {
        return deleteLicence({
            variables: { id: licenceState.id, CitizenId: citizen.id }
        });
    };

    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={32}>
                <Grid item lg={5} xs={12}>
                    {licenceTypes && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value => update('LicenceTypeId', value)}
                                options={licenceTypes.allLicenceTypes.map(
                                    op => ({
                                        label: op.name,
                                        value: op.id
                                    })
                                )}
                                selected={licenceState.LicenceTypeId || 0}
                                placeholder="Licence type"
                                noOptionsMessage="No licence types defined"
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid item lg={5} xs={12}>
                    {licenceStatuses && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value =>
                                    update('LicenceStatusId', value)
                                }
                                options={licenceStatuses.allLicenceStatuses.map(
                                    op => ({
                                        label: op.name,
                                        value: op.id
                                    })
                                )}
                                selected={licenceState.LicenceStatusId || 0}
                                placeholder="Licence status"
                                noOptionsMessage="No licence statuses defined"
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid item lg={2} xs={12} className={classes.actions}>
                    <Button
                        onClick={saveChanges}
                        variant="outlined"
                        className={classes.button}
                        disabled={
                            (licenceState.id && !dirty) ||
                            !licenceState.LicenceTypeId ||
                            !licenceState.LicenceStatusId
                        }
                    >
                        Save
                    </Button>
                    <Button
                        disabled={!licenceState.id}
                        onClick={doDelete}
                        className={classes.button}
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(Licence);
