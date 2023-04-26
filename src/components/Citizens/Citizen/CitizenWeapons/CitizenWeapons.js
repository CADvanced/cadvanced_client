import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { ALL_CITIZEN_WEAPONS_BRIEF } from '../../../../graphql/Citizens/queries';
import {
    WEAPON_ADDED,
    WEAPON_UPDATED,
    WEAPON_DELETED
} from '../../../../graphql/Weapons/subscriptions';
import Weapon from './Weapon';

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
    WeaponTypeId: null,
    WeaponStatusId: null
};

const CitizenWeapons = ({ classes, doSave, updateSaved, citizen }) => {
    const [weapons, setWeapons] = useState([]);

    const { data, subscribeToMore, refetch } = useQuery(
        ALL_CITIZEN_WEAPONS_BRIEF,
        {
            variables: { CitizenId: citizen.id },
            skip: !citizen.id
        }
    );

    // If an update comes from the API, update our local state
    useEffect(() => {
        if (data && data.hasOwnProperty('allCitizenWeapons')) {
            setWeapons([...data.allCitizenWeapons, empty]);
        }
    }, [data]);

    useEffect(() => {
        if (doSave === 'Weapons') {
            updateSaved(true);
        }
    }, [doSave]);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: WEAPON_ADDED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: WEAPON_UPDATED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: WEAPON_DELETED,
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
                        {weapons &&
                            weapons.map((weapon, idx) => (
                                <Weapon
                                    key={idx}
                                    weapon={weapon}
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

export default withStyles(styles)(CitizenWeapons);
