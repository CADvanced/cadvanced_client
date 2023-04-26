import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import ChargesEdit from '../Charges/ChargesEdit';
import FilteredSelect from '../../../lib/FilteredSelect';

import { ALL_OFFICERS } from '../../../graphql/Officers/queries';
import {
    CREATE_ARREST,
    UPDATE_ARREST
} from '../../../graphql/Arrests/mutations';

const ArrestEdit = ({
    arrest,
    offenceId,
    setArrestEditing,
    doSave,
    setCanSave,
    setDoSave,
    citizen
}) => {
    const [locArrest, setLocArrest] = useState({
        ...arrest,
        OffenceId: offenceId
    });

    const { data: officers } = useQuery(ALL_OFFICERS);
    const [createArrestMut] = useMutation(CREATE_ARREST);
    const [updateArrestMut] = useMutation(UPDATE_ARREST);

    useEffect(() => {
        if (arrest) {
            setLocArrest({
                ...arrest,
                OffenceId: offenceId
            });
        }
    }, []);

    useEffect(() => {
        if (doSave) {
            saveChanges().then(() => {
                setDoSave(false);
                setArrestEditing(false);
            });
        }
    }, [doSave]);

    // When our local state changes, update the 'canSave' state
    // in the parent (controlling the enabled/disabled "Save" button)
    useEffect(() => {
        setCanSave(locArrest.OfficerId ? true : false);
    }, [locArrest]);

    const updateArrest = (field, value) => {
        setLocArrest({
            ...locArrest,
            [field]: value
        });
    };

    const updateCharges = charges => {
        setLocArrest({ ...locArrest, charges });
    };

    const saveChanges = () => {
        let mutation = null;
        if (locArrest.hasOwnProperty('id')) {
            mutation = updateArrestMut;
        } else {
            mutation = createArrestMut;
        }
        const toSend = { ...locArrest, CitizenId: citizen.id };
        return mutation({ variables: toSend });
    };

    return (
        <React.Fragment>
            <Grid container spacing={32}>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={event =>
                            updateArrest('date', event.target.value)
                        }
                        value={locArrest.date}
                        label="Date"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={event =>
                            updateArrest('time', event.target.value)
                        }
                        value={locArrest.time}
                        label="Time"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    {officers && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value =>
                                    updateArrest('OfficerId', value)
                                }
                                options={officers.allOfficers.map(op => ({
                                    label: op.firstName + ' ' + op.lastName,
                                    value: op.id
                                }))}
                                selected={locArrest.OfficerId || 0}
                                placeholder="Arresting officer"
                                noOptionsMessage="No officers defined"
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid item md={12} xs={12}>
                    <ChargesEdit
                        charges={locArrest.charges}
                        updateCharges={updateCharges}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default ArrestEdit;
