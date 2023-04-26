import React from 'react';

import {
    Grid,
    TextField
} from '@material-ui/core';

const BoloVehicleForm = ({ bolo, handleFieldUpdate }) => {
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="licencePlate"
                    label="Licence plate"
                    value={bolo.details.licencePlate}
                    onChange={(e) => handleFieldUpdate('licencePlate', e.target.value)}
                    margin="normal"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="description"
                    label="Description"
                    value={bolo.details.description}
                    onChange={(e) => handleFieldUpdate('description', e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="driverDescription"
                    label="Driver description"
                    value={bolo.details.driverDescription}
                    onChange={(e) => handleFieldUpdate('driverDescription', e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="occupants"
                    label="Occupants"
                    value={bolo.details.occupants}
                    onChange={(e) => handleFieldUpdate('occupants', e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="lastLocation"
                    label="Last known location"
                    value={bolo.details.lastLocation}
                    onChange={(e) => handleFieldUpdate('lastLocation', e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="reason"
                    label="Reason for BOLO"
                    value={bolo.details.reason}
                    onChange={(e) => handleFieldUpdate('reason', e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
        </React.Fragment>
    );
}

export default BoloVehicleForm;