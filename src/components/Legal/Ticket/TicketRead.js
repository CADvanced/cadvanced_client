import React from 'react';

import Typography from '@material-ui/core/Typography';

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const TicketRead = ({ ticket }) => {
    if (!ticket.id) return <LoadingSpinner />;
    return (
        <React.Fragment>
            <Typography variant="body1" component="p" gutterBottom>
                {ticket.location}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                Ticket issued on
                <span> </span>
                {ticket.date || 'Unknown date'}
                <span> </span>
                at
                <span> </span>
                {ticket.time || 'unknown time'}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                Issuing officer:
                <span> </span>
                {ticket.officer.firstName}
                <span> </span>
                {ticket.officer.lastName}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                {ticket.points || 0} points
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                {ticket.fine || 0} fine
            </Typography>
            {ticket.notes && (
                <Typography variant="body2" component="p" gutterBottom>
                    {ticket.notes}
                </Typography>
            )}
        </React.Fragment>
    );
};

export default TicketRead;
