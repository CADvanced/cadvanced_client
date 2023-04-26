import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    warrants: {
        marginTop: theme.spacing.unit
    },
    text: {
        fontFamily: 'Share Tech Mono, monospace',
        color: theme.palette.mdt.light
    }
});

const SearchVehiclesResults = ({ results, classes }) => {
    if (!results || (results && results.length === 0)) {
        return null;
    }
    const getOwner = owner => (
        <React.Fragment>
            <div>
                <Typography className={classes.text} variant="body1">
                    {owner.firstName + ' ' + owner.lastName}
                </Typography>
            </div>
            <div>
                <Typography className={classes.text} variant="body1">
                    {owner.address || 'Unknown address'}
                </Typography>
            </div>
            <div>
                <Typography className={classes.text} variant="body1">
                    {owner.ethnicity && owner.ethnicity.name}
                </Typography>
            </div>
            <div>
                <Typography className={classes.text} variant="body1">
                    DOB: {owner.dateOfBirth}
                </Typography>
            </div>
            {owner.warrants && owner.warrants.length > 0 && (
                <React.Fragment>
                    <div className={classes.warrants}>Warrants:</div>
                    {owner.warrants.map(warrant => (
                        <div key={warrant.id}>
                            <Typography className={classes.text} variant="body1">
                                {owner.ethnicity && owner.ethnicity.name}
                                {warrant.validFrom} - {warrant.validTo}:{' '}
                                {warrant.details}
                            </Typography>
                        </div>
                    ))}
                </React.Fragment>
            )}
        </React.Fragment>
    );

    const getLicences = licences => {
        if (licences && licences.length === 0) return 'No licences';
        return licences.map(licence => (
            <div key={licence.id}>
                <Typography className={classes.text} variant="body1">
                    {licence.licenceType.name} [{licence.licenceStatus.name}]
                </Typography>
            </div>
        ));
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography className={classes.text} variant="h6">
                            Licence plate
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.text} variant="h6">
                            Model
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.text} variant="h6">
                            Markers
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.text} variant="h6">
                            Colour
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.text} variant="h6">
                            Registered owner
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.text} variant="h6">
                            Insurance status
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.text} variant="h6">
                            Owner licences
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {results.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            <Typography className={classes.text} variant="body1">
                                {row.licencePlate || 'Unknown'}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text} variant="body1">
                                {row.vehicleModel
                                    ? row.vehicleModel.name
                                    : 'Unknown'}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text} variant="body1">
                                {row.markers &&
                                    row.markers.map(m => m.name).join(', ')}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text} variant="body1">
                                {row.colour || 'Unknown'}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text} variant="body1">
                                {getOwner(row.citizen)}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text} variant="body1">
                                {row.insuranceStatus
                                    ? row.insuranceStatus.name
                                    : 'Unknown'}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.text} variant="body1">
                                {getLicences(row.citizen.licences)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default withStyles(styles)(SearchVehiclesResults);
