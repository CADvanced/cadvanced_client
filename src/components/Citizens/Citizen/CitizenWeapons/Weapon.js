import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import FilteredSelect from '../../../../lib/FilteredSelect';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import { ALL_WEAPON_TYPES } from '../../../../graphql/WeaponTypes/queries';
import { ALL_WEAPON_STATUSES } from '../../../../graphql/WeaponStatuses/queries';
import {
    CREATE_WEAPON,
    UPDATE_WEAPON,
    DELETE_WEAPON
} from '../../../../graphql/Weapons/mutations';

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'flex-end'
    },
    button: {
        margin: theme.spacing.unit
    },
    actions: {
        textAlign: 'right'
    }
});

const Weapon = ({ weapon, citizen, classes }) => {
    const [dirty, setDirty] = useState(false);
    const [weaponState, setWeaponState] = useState(weapon);
    const { data: weaponTypes } = useQuery(ALL_WEAPON_TYPES);
    const { data: weaponStatuses } = useQuery(ALL_WEAPON_STATUSES);
    const [createWeapon] = useMutation(CREATE_WEAPON);
    const [updateWeapon] = useMutation(UPDATE_WEAPON);
    const [deleteWeapon] = useMutation(DELETE_WEAPON);

    useEffect(() => {
        setWeaponState(weapon);
    }, [weapon]);

    const update = (field, value) => {
        setWeaponState({
            ...weaponState,
            [field]: value
        });
        setDirty(true);
    };

    if (!weaponState) {
        return <LoadingSpinner />;
    }

    const saveChanges = () => {
        let toSend = { ...weaponState, CitizenId: citizen.id };
        const mutation = toSend.hasOwnProperty('id')
            ? updateWeapon
            : createWeapon;
        mutation({ variables: toSend }).then(ret => {
            setDirty(false);
        });
    };

    const doDelete = () => {
        return deleteWeapon({
            variables: { id: weaponState.id, CitizenId: citizen.id }
        });
    };

    return (
        <React.Fragment>
            <Grid container className={classes.root} spacing={32}>
                <Grid item lg={5} xs={12}>
                    {weaponTypes && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value => update('WeaponTypeId', value)}
                                options={weaponTypes.allWeaponTypes.map(op => ({
                                    label: op.name,
                                    value: op.id
                                }))}
                                selected={weaponState.WeaponTypeId || 0}
                                placeholder="Weapon type"
                                noOptionsMessage="No weapon types defined"
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid item lg={5} xs={12}>
                    {weaponStatuses && (
                        <FormControl fullWidth>
                            <FilteredSelect
                                update={value =>
                                    update('WeaponStatusId', value)
                                }
                                options={weaponStatuses.allWeaponStatuses.map(
                                    op => ({
                                        label: op.name,
                                        value: op.id
                                    })
                                )}
                                selected={weaponState.WeaponStatusId || 0}
                                placeholder="Weapon status"
                                noOptionsMessage="No weapon statuses defined"
                            />
                        </FormControl>
                    )}
                </Grid>
                <Grid item lg={2} xs={12} className={classes.actions}>
                    <Button
                        onClick={saveChanges}
                        variant="outlined"
                        className={classes.button}
                        disabled={
                            (weaponState.id && !dirty) ||
                            !weaponState.WeaponTypeId ||
                            !weaponState.WeaponStatusId
                        }
                    >
                        Save
                    </Button>
                    <Button
                        disabled={!weaponState.id}
                        onClick={doDelete}
                        className={classes.button}
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(Weapon);
