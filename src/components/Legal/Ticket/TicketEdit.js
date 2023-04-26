import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import { ALL_OFFICERS } from '../../../graphql/Officers/queries';
import {
    CREATE_TICKET,
    UPDATE_TICKET
} from '../../../graphql/Tickets/mutations';
import FilteredSelect from '../../../lib/FilteredSelect';

const TicketEdit = ({
    ticket,
    offenceId,
    setTicketEditing,
    doSave,
    setDoSave,
    setCanSave,
    citizen
}) => {
    const [locTicket, setLocTicket] = useState({
        ...ticket,
        OffenceId: offenceId
    });

    const { data: officers } = useQuery(ALL_OFFICERS);
    const [createTicketMut] = useMutation(CREATE_TICKET);
    const [updateTicketMut] = useMutation(UPDATE_TICKET);

    useEffect(() => {
        if (ticket) {
            setLocTicket({
                ...ticket,
                OffenceId: offenceId
            });
        }
    }, []);

    useEffect(() => {
        if (doSave) {
            saveChanges().then(() => {
                setDoSave(false);
                setTicketEditing(false);
            });
        }
    }, [doSave]);

    // When our local state changes, update the 'canSave' state
    // in the parent (controlling the enabled/disabled "Save" button)
    useEffect(() => {
        setCanSave(locTicket.OfficerId ? true : false);
    }, [locTicket]);

    const updateTicket = (field, value) => {
        setLocTicket({
            ...locTicket,
            [field]: value
        });
    };

    const saveChanges = () => {
        let mutation = null;
        if (locTicket.hasOwnProperty('id')) {
            mutation = updateTicketMut;
        } else {
            mutation = createTicketMut;
        }
        const toSend = { ...locTicket, CitizenId: citizen.id };
        return mutation({ variables: toSend });
    };

    return (
        <React.Fragment>
            <Grid container spacing={32}>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={event =>
                            updateTicket('location', event.target.value)
                        }
                        value={locTicket.location}
                        label="Location"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={event =>
                            updateTicket('date', event.target.value)
                        }
                        value={locTicket.date}
                        label="Date"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={event =>
                            updateTicket('time', event.target.value)
                        }
                        value={locTicket.time}
                        label="Time"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={event =>
                            updateTicket('points', event.target.value)
                        }
                        value={locTicket.points}
                        label="Points"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        onChange={event =>
                            updateTicket('fine', event.target.value)
                        }
                        value={locTicket.fine}
                        label="Fine"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        multiline
                        onChange={event =>
                            updateTicket('notes', event.target.value)
                        }
                        value={locTicket.notes}
                        label="Notes"
                        fullWidth
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    {officers && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value =>
                                    updateTicket('OfficerId', value)
                                }
                                options={officers.allOfficers.map(op => ({
                                    label: op.firstName + ' ' + op.lastName,
                                    value: op.id
                                }))}
                                selected={locTicket.OfficerId || 0}
                                placeholder="Issuing officer"
                                noOptionsMessage="No officers defined"
                            />
                        </FormControl>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default TicketEdit;
