import React from 'react';

import { Grid, Typography } from '@material-ui/core';

const BoloVehicleDetails = ({ bolo }) => {
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                <Typography variant={'h6'}>
                    Vehicle description:
                </Typography>
                <Typography paragraph={true}>
                    {bolo.details.description || '-'}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom={true} variant={'h6'}>
                    Driver description:
                </Typography>
                <Typography paragraph={true}>
                    {bolo.details.driverDescription || '-'}
                </Typography>
                <Typography gutterBottom={true} variant={'h6'}>
                    Occupants:
                </Typography>
                <Typography paragraph={true}>
                    {bolo.details.occupants || '-'}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography gutterBottom={true} variant={'h6'}>
                    Last known location:
                </Typography>
                <Typography paragraph={true}>
                    {bolo.details.lastLocation || '-'}
                </Typography>
                <Typography gutterBottom={true} variant={'h6'}>
                    Reason for BOLO:
                </Typography>
                <Typography paragraph={true}>
                    {bolo.details.reason || '-'}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default BoloVehicleDetails;