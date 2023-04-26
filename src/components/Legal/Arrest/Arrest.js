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
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import ArrestRead from './ArrestRead';
import ArrestEdit from './ArrestEdit';
import { AppContext } from '../../../hoc/ContextProvider';

import { DELETE_ARREST } from '../../../graphql/Arrests/mutations';

const styles = theme => ({
    root: {
        overflow: 'inherit'
    },
    title: {
        fontSize: 14
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

const Arrest = ({ arrest, offence, citizen, classes }) => {
    const [arrestEditing, setArrestEditing] = useState(false);
    const [locArrest, setLocArrest] = useState(arrest);
    const [doSave, setDoSave] = useState(false);
    const [canSave, setCanSave] = useState(false);

    const context = useContext(AppContext);

    const empty = {
        date: offence.date,
        time: offence.time,
        OfficerId: 0,
        charges: []
    };

    const [deleteArrest] = useMutation(DELETE_ARREST);

    const doAdd = () => {
        setLocArrest(empty);
        setArrestEditing(true);
    };

    const exitEditing = () => {
        if (locArrest === empty) {
            setLocArrest(null);
        }
        setArrestEditing(false);
    };

    useEffect(() => {
        setLocArrest(arrest);
    }, [arrest]);

    const doDelete = () => {
        return deleteArrest({
            variables: { id: locArrest.id, CitizenId: citizen.id }
        });
    };
    return (
        <Card className={classes.root}>
            <CardHeader
                disableTypography={true}
                avatar={
                    <Avatar aria-label="Arrested">
                        <FingerprintIcon />
                    </Avatar>
                }
                title={
                    <Typography variant="subtitle1" component="span">
                        Arrest
                    </Typography>
                }
            ></CardHeader>
            <CardContent>
                {locArrest && arrestEditing && (
                    <ArrestEdit
                        offenceId={offence.id}
                        doSave={doSave}
                        setDoSave={setDoSave}
                        setCanSave={setCanSave}
                        setArrestEditing={setArrestEditing}
                        arrest={locArrest}
                        citizen={citizen}
                    />
                )}
                {locArrest && !arrestEditing && (
                    <ArrestRead arrest={locArrest} />
                )}
            </CardContent>

            {context.userHasRoles(['OWN_CITIZENS_RECORD', 'CITIZEN_MGR']) && (
                <CardActions className={classes.actions} disableActionSpacing>
                    {!locArrest && (
                        <React.Fragment>
                            <Button onClick={() => doAdd()} color="secondary">
                                Add new
                            </Button>
                        </React.Fragment>
                    )}
                    {locArrest && !arrestEditing && (
                        <React.Fragment>
                            <Button
                                onClick={() => setArrestEditing(true)}
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
                    {locArrest && arrestEditing && (
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

export default withStyles(styles)(Arrest);
