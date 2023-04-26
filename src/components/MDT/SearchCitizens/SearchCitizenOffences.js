import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { GET_CITIZEN_OFFENCES } from '../../../graphql/Citizens/queries';

const styles = theme => ({
    detailLabel: {
        fontFamily: 'Share Tech Mono, monospace',
        color: theme.palette.primary.mid
    },
    info: {
        fontFamily: 'Share Tech Mono, monospace'
    },
    details: {
        width: '30%'
    }
});

const SearchCitizenOffences = ({ classes, citizen }) => {
    const { loading, data } = useQuery(GET_CITIZEN_OFFENCES, {
        variables: { id: citizen.id }
    });

    if (loading) {
        return null;
    }

    if (
        data &&
        data.getCitizen.offences &&
        data.getCitizen.offences.length === 0
    ) {
        return <span className={classes.info}>No offences recorded</span>;
    }

    const makeField = ({ label, value }) => (
        <React.Fragment>
            <Typography inline className={classes.detailLabel}>
                {label}:{' '}
            </Typography>
            <Typography inline className={classes.info}>
                {value ? value : 'unknown'}
            </Typography>
        </React.Fragment>
    );

    const getArrest = arrest => {
        if (!arrest) {
            return 'No arrest made';
        }
        return (
            <React.Fragment>
                <div>
                    {makeField({
                        label: 'Arrested',
                        value: arrest.date + ' - ' + arrest.time
                    })}
                </div>
                <div>
                    {makeField({
                        label: 'Arresting officer',
                        value:
                            arrest.officer.firstName +
                            ' ' +
                            arrest.officer.lastName
                    })}
                </div>
                <div>
                    {makeField({
                        label: 'Charges',
                        value: arrest.charges
                            .map(charge => charge.name)
                            .join(', ')
                    })}
                </div>
            </React.Fragment>
        );
    };

    const getCharges = charges => {
        if (charges && charges.length === 0) {
            return 'No charges filed';
        }
        return charges.map(charge => charge.name).join(', ');
    };

    const getTicket = ticket => {
        if (!ticket) {
            return 'No ticket issued';
        }
        return (
            <React.Fragment>
                <div>
                    {makeField({
                        label: 'Issued',
                        value: ticket.date + ' - ' + ticket.time
                    })}
                </div>
                <div>
                    {makeField({
                        label: 'Issuing location',
                        value: ticket.location
                    })}
                </div>
                <div>
                    {makeField({
                        label: 'Issuing officer',
                        value:
                            ticket.officer.firstName +
                            ' ' +
                            ticket.officer.lastName
                    })}
                </div>
                <div>
                    {makeField({
                        label: 'Points issued',
                        value: ticket.points || 0
                    })}
                </div>
                <div>
                    {makeField({
                        label: 'Fine issued',
                        value: ticket.fine || 0
                    })}
                </div>
                <div>
                    {makeField({
                        label: 'Notes',
                        value: ticket.notes || 'No notes'
                    })}
                </div>
            </React.Fragment>
        );
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Arrest details</TableCell>
                    <TableCell>Charge details</TableCell>
                    <TableCell className={classes.details}>
                        Ticket details
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data &&
                    data.getCitizen.offences.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.date}
                            </TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.location}</TableCell>
                            <TableCell>{getArrest(row.arrest)}</TableCell>
                            <TableCell>{getCharges(row.charges)}</TableCell>
                            <TableCell>{getTicket(row.ticket)}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default withStyles(styles)(SearchCitizenOffences);
