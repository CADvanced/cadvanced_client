import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import SearchCitizenOffences from './SearchCitizenOffences';

const styles = theme => ({
    heading: {
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: 18
    },
    result: {
        boxShadow: 'none',
        borderRadius: 0,
        background: '#aaa'
    },
    resultDetails: {
        background: theme.palette.mdt.darkShade,
        paddingTop: theme.spacing.unit * 4,
        paddingBottom: theme.spacing.unit * 4
    },
    info: {
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: 16
    },
    infoHeading: {
        fontSize: 18,
        marginBottom: theme.spacing.unit
    },
    fieldGroup: {
        background: theme.palette.mdt.mid,
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    },
    detailLabel: {
        color: theme.palette.primary.mid
    },
    citizenId: {
        paddingLeft: theme.spacing.unit * 5,
        color: theme.palette.primary.mid
    },
    markers: {
        paddingLeft: theme.spacing.unit * 5
    }
});

const SearchCitizenResult = ({
    citizen,
    classes,
    expanded,
    updateExpanded
}) => {
    const makeField = data => (
        <Grid item lg={3} xs={6}>
            <Typography
                inline
                variant="h5"
                className={`${classes.info} ${classes.detailLabel}`}
            >
                {data.label}:{' '}
            </Typography>
            <Typography inline variant="h5" className={classes.info}>
                {data.value ? data.value : 'unknown'}
            </Typography>
        </Grid>
    );

    const makeWeapon = data => (
        <React.Fragment>
            <div>
                <Typography variant="h5" className={classes.info}>
                    {data.weaponType ? data.weaponType.name : 'Unknown type'}
                </Typography>
            </div>
            <div>
                <Typography
                    inline
                    variant="h5"
                    className={`${classes.info} ${classes.detailLabel}`}
                >
                    Status:
                </Typography>
                <Typography inline variant="h5" className={classes.info}>
                    {data.weaponStatus ? data.weaponStatus.name : 'unknown'}
                </Typography>
            </div>
        </React.Fragment>
    );

    const makeVehicle = data => (
        <React.Fragment>
            <div>
                <Typography variant="h5" className={classes.info}>
                    {data.licencePlate ? data.licencePlate : 'Unknown licence'}
                    {data.markers && data.markers.length > 0 && (
                        <span>
                            {' '}
                            [{data.markers.map(m => m.name).join(', ')}]
                        </span>
                    )}
                </Typography>
            </div>
            <div>
                <Typography inline variant="h5" className={classes.info}>
                    {data.colour || 'Unknown colour'}
                </Typography>{' '}
                <Typography inline variant="h5" className={classes.info}>
                    {data.vehicleModel
                        ? data.vehicleModel.name
                        : 'unknown model'}
                </Typography>
            </div>
            <div>
                <Typography
                    inline
                    variant="h5"
                    className={`${classes.info} ${classes.detailLabel}`}
                >
                    Insurance:
                </Typography>
                <Typography inline variant="h5" className={classes.info}>
                    {data.insuranceStatus
                        ? data.insuranceStatus.name
                        : 'unknown'}
                </Typography>
            </div>
        </React.Fragment>
    );

    const makeLicence = data => (
        <React.Fragment>
            <div>
                <Typography inline variant="h5" className={classes.info}>
                    {data.licenceType ? data.licenceType.name : 'Unknown type'}
                </Typography>
            </div>
            <div>
                <Typography
                    inline
                    variant="h5"
                    className={`${classes.info} ${classes.detailLabel}`}
                >
                    Status:
                </Typography>
                <Typography inline variant="h5" className={classes.info}>
                    {data.licenceStatus ? data.licenceStatus.name : 'unknown'}
                </Typography>
            </div>
        </React.Fragment>
    );

    const makeWarrant = data => (
        <React.Fragment>
            <div>
                <Typography inline variant="h5" className={classes.info}>
                    {data.validFrom || 'Unknown date'}
                </Typography>
                {' - '}
                <Typography inline variant="h5" className={classes.info}>
                    {data.validTo || 'Unknown date'}
                </Typography>
            </div>
            <div>
                <Typography
                    inline
                    variant="h5"
                    className={`${classes.info} ${classes.detailLabel}`}
                >
                    Details:
                </Typography>
                <Typography inline variant="h5" className={classes.info}>
                    {data.details || 'No details available'}
                </Typography>
            </div>
        </React.Fragment>
    );

    const makeVehicles = data =>
        citizen.vehicles && citizen.vehicles.length > 0 ? (
            citizen.vehicles.map(vehicle => (
                <Grid key={vehicle.id} item lg={3} xs={6}>
                    {makeVehicle(vehicle)}
                </Grid>
            ))
        ) : (
                <Grid item lg={3} xs={6}>
                    <Typography variant="h5" className={classes.info}>
                        No known vehicles
                </Typography>
                </Grid>
            );

    const makeWeapons = data =>
        citizen.weapons && citizen.weapons.length > 0 ? (
            citizen.weapons.map(weapon => (
                <Grid key={weapon.id} item lg={3} xs={6}>
                    {makeWeapon(weapon)}
                </Grid>
            ))
        ) : (
                <Grid item lg={3} xs={6}>
                    <Typography variant="h5" className={classes.info}>
                        No known weapons
                </Typography>
                </Grid>
            );

    const makeLicences = data =>
        data && data.length > 0 ? (
            data.map(licence => (
                <Grid key={licence.id} item lg={3} xs={6}>
                    {makeLicence(licence)}
                </Grid>
            ))
        ) : (
                <Grid item lg={3} xs={6}>
                    <Typography variant="h5" className={classes.info}>
                        No known licences
                </Typography>
                </Grid>
            );

    const makeWarrants = data =>
        data && data.length > 0 ? (
            data.map(warrant => (
                <Grid key={warrant.id} item lg={3} xs={6}>
                    {makeWarrant(warrant)}
                </Grid>
            ))
        ) : (
                <Grid item lg={3} xs={6}>
                    <Typography variant="h5" className={classes.info}>
                        No warrants
                </Typography>
                </Grid>
            );
    return (
        <ExpansionPanel
            expanded={expanded === citizen.id}
            onChange={() => updateExpanded(citizen.id)}
            square={true}
            className={classes.result}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                    {citizen.firstName} {citizen.lastName}
                    <span className={classes.citizenId}>
                        [ ID: {citizen.id} ]
                    </span>
                    <span className={classes.markers}>
                        {citizen.markers &&
                            citizen.markers.map(m => m.name).join(', ')}
                    </span>
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.resultDetails}>
                {expanded === citizen.id && (
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container className={classes.fieldGroup}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        className={`${classes.info} ${classes.infoHeading}`}
                                    >
                                        Details:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={32}>
                                        {makeField({
                                            label: 'Ethnicity',
                                            value: citizen.ethnicity
                                                ? citizen.ethnicity.name
                                                : null
                                        })}
                                        {makeField({
                                            label: 'Gender',
                                            value: citizen.gender
                                                ? citizen.gender.name
                                                : null
                                        })}
                                        {makeField({
                                            label: 'Height',
                                            value: citizen.height
                                        })}
                                        {makeField({
                                            label: 'Weight',
                                            value: citizen.weight
                                        })}
                                        {makeField({
                                            label: 'Hair',
                                            value: citizen.hair
                                        })}
                                        {makeField({
                                            label: 'Eyes',
                                            value: citizen.eyes
                                        })}
                                        {makeField({
                                            label: 'Address',
                                            value: citizen.address
                                        })}
                                        {makeField({
                                            label: 'Postal code',
                                            value: citizen.postalCode
                                        })}
                                        {makeField({
                                            label: 'Date of birth',
                                            value: citizen.dateOfBirth
                                        })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.fieldGroup}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        className={`${classes.info} ${classes.infoHeading}`}
                                    >
                                        Vehicles:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={32}>
                                        {makeVehicles(citizen.vehicles)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.fieldGroup}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        className={`${classes.info} ${classes.infoHeading}`}
                                    >
                                        Weapons:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={32}>
                                        {makeWeapons(citizen.weapons)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.fieldGroup}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        className={`${classes.info} ${classes.infoHeading}`}
                                    >
                                        Licences:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={32}>
                                        {makeLicences(citizen.licences)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.fieldGroup}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        className={`${classes.info} ${classes.infoHeading}`}
                                    >
                                        Warrants:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={32}>
                                        {makeWarrants(citizen.warrants)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.fieldGroup}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h4"
                                        className={`${classes.info} ${classes.infoHeading}`}
                                    >
                                        Criminal record:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <SearchCitizenOffences citizen={citizen} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withStyles(styles)(SearchCitizenResult);
