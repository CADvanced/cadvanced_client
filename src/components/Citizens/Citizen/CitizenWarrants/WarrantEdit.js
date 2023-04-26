import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

import {
    CREATE_WARRANT,
    UPDATE_WARRANT,
    DELETE_WARRANT
} from '../../../../graphql/Warrants/mutations';

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

const WarrantEdit = ({ warrant, citizen, classes }) => {
    const [dirty, setDirty] = useState(false);
    const [warrantState, setWarrantState] = useState(warrant);
    const [createWarrant] = useMutation(CREATE_WARRANT);
    const [updateWarrant] = useMutation(UPDATE_WARRANT);
    const [deleteWarrant] = useMutation(DELETE_WARRANT);

    useEffect(() => {
        setWarrantState(warrant);
    }, [warrant]);

    const update = (field, value) => {
        setWarrantState({
            ...warrantState,
            [field]: value
        });
        setDirty(true);
    };

    if (!warrantState) {
        return <LoadingSpinner />;
    }

    const saveChanges = () => {
        let toSend = { ...warrantState, CitizenId: citizen.id };
        const mutation = toSend.hasOwnProperty('id')
            ? updateWarrant
            : createWarrant;
        mutation({ variables: toSend }).then(ret => {
            setDirty(false);
        });
    };

    const doDelete = () => {
        return deleteWarrant({
            variables: { id: warrantState.id, CitizenId: citizen.id }
        });
    };

    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={32}>
                <Grid item lg={2} xs={12}>
                    <TextField
                        onChange={event =>
                            update('validFrom', event.target.value)
                        }
                        value={warrantState.validFrom}
                        label="Valid from"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} xs={12}>
                    <TextField
                        onChange={event =>
                            update('validTo', event.target.value)
                        }
                        value={warrantState.validTo}
                        label="Valid to"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <TextField
                        onChange={event =>
                            update('details', event.target.value)
                        }
                        value={warrantState.details}
                        label="Details"
                        fullWidth
                        multiline
                    />
                </Grid>
                <Grid item lg={2} xs={12} className={classes.actions}>
                    <Button
                        onClick={saveChanges}
                        variant="outlined"
                        className={classes.button}
                        disabled={
                            (warrantState.id && !dirty) || !warrantState.details
                        }
                    >
                        Save
                    </Button>
                    <Button
                        disabled={!warrantState.id}
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

export default withStyles(styles)(WarrantEdit);
