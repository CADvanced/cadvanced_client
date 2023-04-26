import React, { useState, useContext } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import GavelIcon from '@material-ui/icons/Gavel';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import ChargesRead from './Charges/ChargesRead';
import ChargesEdit from './Charges/ChargesEdit';
import { AppContext } from '../../hoc/ContextProvider';

import { UPDATE_OFFENCE } from '../../graphql/Offences/mutations';

const styles = theme => ({
    title: {
        fontSize: 14
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

const OffenceCharges = ({ charges, offence, citizen, classes }) => {
    const [locCharges, setLocCharges] = useState(charges);
    const [chargesEditing, setChargesEditing] = useState(false);
    const [preEdit, setPreEdit] = useState([]);
    const [updateOffence] = useMutation(UPDATE_OFFENCE);

    const context = useContext(AppContext);

    const enterEditing = () => {
        setPreEdit([...locCharges]);
        setChargesEditing(true);
    };
    const exitEditing = () => {
        setLocCharges([...preEdit]);
        setChargesEditing(false);
    };
    const updateCharges = charges => {
        setLocCharges(charges);
    };
    const saveCharges = () => {
        const toSave = {
            ...offence,
            charges: locCharges,
            CitizenId: citizen.id
        };
        updateOffence({ variables: toSave });
        setChargesEditing(false);
    };
    return (
        <Card>
            <CardHeader
                disableTypography={true}
                className={classes.title}
                avatar={
                    <Avatar aria-label="Charges">
                        <GavelIcon />
                    </Avatar>
                }
                title={
                    <Typography variant="subtitle1" component="span">
                        Charges
                    </Typography>
                }
            ></CardHeader>
            <CardContent>
                {chargesEditing && (
                    <ChargesEdit
                        updateCharges={updateCharges}
                        charges={charges}
                    />
                )}
                {!chargesEditing && <ChargesRead charges={charges} />}
            </CardContent>
            {context.userHasRoles(['OWN_CITIZENS_RECORD', 'CITIZEN_MGR']) && (
                <CardActions className={classes.actions} disableActionSpacing>
                    {!chargesEditing && (
                        <React.Fragment>
                            <Button
                                onClick={() => enterEditing()}
                                color="secondary"
                            >
                                Edit
                            </Button>
                        </React.Fragment>
                    )}
                    {chargesEditing && (
                        <React.Fragment>
                            <Button
                                onClick={() => saveCharges()}
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

export default withStyles(styles)(OffenceCharges);
