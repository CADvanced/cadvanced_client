import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { ALL_CITIZEN_LICENCES_BRIEF } from '../../../../graphql/Citizens/queries';
import {
    LICENCE_ADDED,
    LICENCE_UPDATED,
    LICENCE_DELETED
} from '../../../../graphql/Licences/subscriptions';
import Licence from './Licence';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    panel: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

const empty = {
    LicenceTypeId: null,
    LicenceStatusId: null
};

const CitizenLicences = ({ classes, doSave, updateSaved, citizen }) => {
    const [licences, setLicences] = useState([]);

    const { data, subscribeToMore, refetch } = useQuery(
        ALL_CITIZEN_LICENCES_BRIEF,
        {
            variables: { CitizenId: citizen.id },
            skip: !citizen.id
        }
    );

    // If an update comes from the API, update our local state
    useEffect(() => {
        if (data && data.hasOwnProperty('allCitizenLicences')) {
            setLicences([...data.allCitizenLicences, empty]);
        }
    }, [data]);

    useEffect(() => {
        if (doSave === 'Licences') {
            updateSaved(true);
        }
    }, [doSave]);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: LICENCE_ADDED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: LICENCE_UPDATED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: LICENCE_DELETED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <React.Fragment>
            <Grid
                container
                justify="center"
                className={classes.root}
                spacing={40}
            >
                <Grid item lg={12} xs={12}>
                    <Paper className={classes.panel}>
                        {licences &&
                            licences.map((licence, idx) => (
                                <Licence
                                    key={idx}
                                    licence={licence}
                                    citizen={citizen}
                                    empty={empty}
                                />
                            ))}
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(CitizenLicences);
