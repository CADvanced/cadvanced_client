import React from 'react';

import {
    Grid,
    TextField
} from '@material-ui/core';

const BoloCitizenForm = ({ bolo, handleFieldUpdate }) => {
    return (
        <React.Fragment>
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
                    id="knownName"
                    label="Known name"
                    value={bolo.details.knownName}
                    onChange={(e) => handleFieldUpdate('knownName', e.target.value)}
                    margin="normal"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="weapons"
                    label="Weapons"
                    value={bolo.details.weapons}
                    onChange={(e) => handleFieldUpdate('weapons', e.target.value)}
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

export default BoloCitizenForm;