import React, { useState, useEffect, useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';

import TicketRead from './TicketRead';
import TicketEdit from './TicketEdit';
import { AppContext } from '../../../hoc/ContextProvider';

import { DELETE_TICKET } from '../../../graphql/Tickets/mutations';

const styles = theme => ({
    root: {
        overflow: 'visible'
    },
    title: {
        fontSize: 14
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

const Ticket = ({ ticket, offence, citizen, classes }) => {
    const [ticketEditing, setTicketEditing] = useState(false);
    const [locTicket, setLocTicket] = useState(ticket);
    const [doSave, setDoSave] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [deleteTicket] = useMutation(DELETE_TICKET);

    const context = useContext(AppContext);

    const empty = {
        date: offence.date,
        time: offence.time,
        location: offence.location,
        points: '',
        fine: '',
        notes: '',
        OfficerId: 0
    };

    const doAdd = () => {
        setLocTicket(empty);
        setTicketEditing(true);
    };

    const exitEditing = () => {
        if (locTicket === empty) {
            setLocTicket(null);
        }
        setTicketEditing(false);
    };

    useEffect(() => {
        setLocTicket(ticket);
    }, [ticket]);

    const doDelete = () => {
        return deleteTicket({
            variables: { id: locTicket.id, CitizenId: citizen.id }
        });
    };
    return (
        <Card className={classes.root}>
            <CardHeader
                disableTypography={true}
                avatar={
                    <Avatar aria-label="Ticket">
                        <DescriptionIcon />
                    </Avatar>
                }
                title={
                    <Typography variant="subtitle1" component="span">
                        Ticket
                    </Typography>
                }
            ></CardHeader>
            <CardContent>
                {locTicket && ticketEditing && (
                    <TicketEdit
                        offenceId={offence.id}
                        doSave={doSave}
                        setDoSave={setDoSave}
                        setCanSave={setCanSave}
                        setTicketEditing={setTicketEditing}
                        ticket={locTicket}
                        citizen={citizen}
                    />
                )}
                {locTicket && !ticketEditing && (
                    <TicketRead ticket={locTicket} />
                )}
            </CardContent>
            {context.userHasRoles(['OWN_CITIZENS_RECORD', 'CITIZEN_MGR']) && (
                <CardActions className={classes.actions} disableActionSpacing>
                    {!locTicket && (
                        <React.Fragment>
                            <Button onClick={() => doAdd()} color="secondary">
                                Add new
                            </Button>
                        </React.Fragment>
                    )}
                    {locTicket && !ticketEditing && (
                        <React.Fragment>
                            <Button
                                onClick={() => setTicketEditing(true)}
                                color="secondary"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => doDelete()}
                                color="secondary"
                            >
                                Delete
                            </Button>
                        </React.Fragment>
                    )}
                    {locTicket && ticketEditing && (
                        <React.Fragment>
                            <Button
                                disabled={!canSave}
                                onClick={() => setDoSave(true)}
                                color="secondary"
                            >
                                Save
                            </Button>
                            <Button onClick={() => exitEditing()}>
                                Cancel
                            </Button>
                        </React.Fragment>
                    )}
                </CardActions>
            )}
        </Card>
    );
};

export default withStyles(styles)(Ticket);
