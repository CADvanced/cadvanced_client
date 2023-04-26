import React from 'react';

import { Grid, Typography } from '@material-ui/core';

const BoloCitizenDetails = ({ bolo }) => {
    return (
        <Grid container spacing={24}>
            <Grid item xs={6}>
                <Typography gutterBottom={true} variant={'h6'}>
                    Known name:
                </Typography>
                <Typography paragraph={true}>
                    {bolo.details.knownName || '-'}
                </Typography>
                <Typography gutterBottom={true} variant={'h6'}>
                    Weapons:
                </Typography>
                <Typography paragraph={true}>
                    {bolo.details.weapons || '-'}
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

export default BoloCitizenDetails;