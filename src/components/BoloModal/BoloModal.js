import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { useMutation } from '@apollo/react-hooks';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';

import BoloVehicleForm from './BoloVehicleForm/BoloVehicleForm';
import BoloCitizenForm from './BoloCitizenForm/BoloCitizenForm';
import DepartmentsDropdown from '../../lib/DepartmentsDropdown';

import { CREATE_BOLO, UPDATE_BOLO } from '../../graphql/Bolos/mutations';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formRow: {
        marginTop: `${theme.spacing.unit}px`,
        marginBottom: `${theme.spacing.unit}px`
    }
});

const BoloModal = ({
    open,
    activeBolo,
    cancelHandler,
    classes,
    department
}) => {

    const emptyBolo = {
        boloType: '',
        details: {
            description: '',
            knownName: '',
            weapons: '',
            lastLocation: '',
            reason: '',
            licencePlate: '',
            driverDescription: '',
            occupants: ''
        }
    };

    const [createBolo] = useMutation(CREATE_BOLO);
    const [updateBolo] = useMutation(UPDATE_BOLO);

    const [bolo, setBolo] = useState(emptyBolo);
    const [deptId, setDeptId] = useState(department.id);

    useEffect(() => {
        if (activeBolo && activeBolo.id) {
            setBolo(Object.assign({}, { ...activeBolo }));
        }
    }, [activeBolo]);

    useEffect(() => {
        if (bolo.DepartmentId) {
            setDeptId(bolo.DepartmentId);
        }
    }, [bolo]);

    const types = [
        { name: 'Citizen', value: 'citizen' },
        { name: 'Vehicle', value: 'vehicle' }
    ];

    const title = activeBolo ? 'Edit BOLO' : 'Create BOLO';

    const handleTypeChange = e => {
        setBolo({
            ...bolo,
            boloType: e.target.value
        })
    };

    const handleFieldUpdate = (field, value) => {
        setBolo({
            ...bolo,
            details: {
                ...bolo.details,
                [field]: value
            }
        })
    };

    const handleBoloSave = () => {
        const mutation = bolo.id ?
            updateBolo :
            createBolo;
        mutation({
            variables: {
                ...bolo,
                DepartmentId: deptId
            }
        }).then(() => cancelHandler());
    }

    const hasBoloFilter = toFilter => toFilter.bolo;

    return (
        <Dialog
            open={open}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                >
                    <Grid
                        className={classes.formRow}
                        container
                        spacing={16}
                    >
                        {!department.id && (
                            <Grid item xs={12}>
                                <DepartmentsDropdown
                                    selectedDepartment={deptId}
                                    setSelectedDepartment={id => setDeptId(id)}
                                    dropdownStyles={{ select: { width: '100%' } }}
                                    filter={hasBoloFilter}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="boloType">BOLO type</InputLabel>
                                <Select
                                    value={bolo.boloType}
                                    onChange={handleTypeChange}
                                >
                                    {types.map(type =>
                                        <MenuItem key={type.value} value={type.value}>{type.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        {bolo.boloType === 'vehicle' && (
                            <BoloVehicleForm bolo={bolo} handleFieldUpdate={handleFieldUpdate} />
                        )}
                        {bolo.boloType === 'citizen' && (
                            <BoloCitizenForm bolo={bolo} handleFieldUpdate={handleFieldUpdate} />
                        )}
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <React.Fragment>
                    <Button
                        onClick={cancelHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!deptId}
                        onClick={handleBoloSave}
                    >
                        Save
                    </Button>
                </React.Fragment>
            </DialogActions>

        </Dialog >
    );

};

export default withStyles(styles)(BoloModal);