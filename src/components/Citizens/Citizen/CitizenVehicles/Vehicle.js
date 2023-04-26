import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { ALL_VEHICLE_MODELS } from '../../../../graphql/VehicleModels/queries';
import { ALL_INSURANCE_STATUSES } from '../../../../graphql/InsuranceStatuses/queries';
import {
    CREATE_VEHICLE,
    UPDATE_VEHICLE,
    DELETE_VEHICLE
} from '../../../../graphql/Vehicles/mutations';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import FilteredSelect from '../../../../lib/FilteredSelect';
import VehicleMarkers from './VehicleMarkers/VehicleMarkers';

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'flex-end',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    actions: {
        textAlign: 'right'
    }
});

const Vehicle = ({ vehicle, citizen, classes }) => {
    const [dirty, setDirty] = useState(false);
    const [vehicleState, setVehicleState] = useState(vehicle);
    const { data: vehicleModels } = useQuery(ALL_VEHICLE_MODELS);
    const { data: insuranceStatuses } = useQuery(ALL_INSURANCE_STATUSES);
    const [createVehicle] = useMutation(CREATE_VEHICLE);
    const [updateVehicle] = useMutation(UPDATE_VEHICLE);
    const [deleteVehicle] = useMutation(DELETE_VEHICLE);

    useEffect(() => {
        setVehicleState(vehicle);
    }, [vehicle]);

    const update = (field, value) => {
        setVehicleState({
            ...vehicleState,
            [field]: value
        });
        setDirty(true);
    };

    if (!vehicleState) {
        return <LoadingSpinner />;
    }

    const saveChanges = () => {
        let toSend = { ...vehicleState, CitizenId: citizen.id };
        const mutation = toSend.hasOwnProperty('id')
            ? updateVehicle
            : createVehicle;
        mutation({ variables: toSend }).then(ret => {
            setDirty(false);
        });
    };

    const doDelete = () => {
        return deleteVehicle({
            variables: { id: vehicleState.id, CitizenId: citizen.id }
        });
    };

    return (
        <React.Fragment>
            <Grid className={classes.root} container spacing={32}>
                <Grid item lg={3} xs={12}>
                    <TextField
                        onChange={event =>
                            update('licencePlate', event.target.value)
                        }
                        value={vehicleState.licencePlate}
                        placeholder="Licence plate"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    {vehicleModels && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value =>
                                    update('VehicleModelId', value)
                                }
                                options={vehicleModels.allVehicleModels.map(
                                    op => ({
                                        label: op.name,
                                        value: op.id
                                    })
                                )}
                                selected={vehicleState.VehicleModelId || 0}
                                placeholder="Vehicle model"
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid item lg={2} xs={12}>
                    <TextField
                        onChange={event => update('colour', event.target.value)}
                        value={vehicleState.colour}
                        placeholder="Colour"
                        fullWidth
                    />
                </Grid>
                <Grid item lg={2} xs={12}>
                    {insuranceStatuses && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value =>
                                    update('InsuranceStatusId', value)
                                }
                                options={insuranceStatuses.allInsuranceStatuses.map(
                                    op => ({
                                        label: op.name,
                                        value: op.id
                                    })
                                )}
                                selected={vehicleState.InsuranceStatusId || 0}
                                placeholder="Insurance status"
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid item lg={2} xs={12} className={classes.actions}>
                    <Button
                        onClick={saveChanges}
                        variant="outlined"
                        disabled={
                            (vehicleState.id && !dirty) ||
                            !vehicleState.VehicleModelId ||
                            !vehicleState.InsuranceStatusId
                        }
                    >
                        Save
                    </Button>
                    <Button
                        disabled={!vehicleState.id}
                        onClick={doDelete}
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>
            <div>{vehicle.id && <VehicleMarkers vehicle={vehicle} />}</div>
        </React.Fragment>
    );
};

export default withStyles(styles)(Vehicle);
