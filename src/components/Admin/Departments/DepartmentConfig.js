import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    TextField,
    FormLabel,
    IconButton,
    Button,
    Select,
    MenuItem
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';

import { SketchPicker } from 'react-color';

import Uploader from '../../common/Uploader';
import ConfirmButton from '../../Admin/ConfirmButton';

import {
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT
} from '../../../graphql/Departments/mutations';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    select: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    formRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        background: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 10
    },
    indentedRow: {
        paddingLeft: 18
    },
    iconButton: {
        padding: 10
    },
    clickaway: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    colourPicker: {
        position: 'absolute',
        bottom: 20,
        zIndex: '9999'
    },
    actionRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30,
        background: 'rgba(0,0,0,0.2)',
        padding: 10,
        borderRadius: 10
    },
    logo: {
        maxWidth: 150,
        maxHeight: 150
    },
    legend: {
        minWidth: 100
    },
    flexing: {
        flex: 1
    }
});

const DepartmentConfig = ({ department, classes }) => {
    const [colourPicker, setColourPicker] = useState(false);
    const [editable, setEditable] = useState(department);
    const [logoHash, setLogoHash] = useState(Date.now());
    const [deleteDepartment] = useMutation(DELETE_DEPARTMENT);
    const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);

    useEffect(() => {
        if (department) {
            setEditable(department);
        }
    }, [department]);

    const handleChange = (value, prop) => {
        setEditable({
            ...editable,
            [prop]: value
        });
    }

    const handleDelete = () => {
        deleteDepartment({
            variables: { id: department.id }
        });
    }

    const handleUpdate = () => {
        const variables = {
            ...editable,
            // Remove the timestamp before we send
            logo: editable.logo ? editable.logo.replace(/\?\d+/g, '') : null
        }
        updateDepartment({
            variables
        });
    }

    const removeImage = () => {
        const newObj = {
            ...editable,
            logo: ''
        };
        setEditable(newObj);
        updateDepartment({ variables: newObj });
    };

    return (
        <React.Fragment>
            <div className={classes.formRow}>
                <TextField
                    fullWidth
                    margin="dense"
                    id="department-name"
                    label="Name"
                    className={[classes.textField, classes.flexing].join(' ')}
                    value={editable.name}
                    onChange={e => handleChange(e.target.value, 'name')}
                />
            </div>
            <div className={[classes.formRow, classes.indentedRow].join(' ')}>
                <FormLabel className={classes.legend} component="legend">Has BOLOs:</FormLabel>
                <Select
                    margin="dense"
                    id="department-bolo"
                    className={classes.select}
                    value={editable.bolo}
                    onChange={e => handleChange(e.target.value, 'bolo')}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
            </div>
            <div className={[classes.formRow, classes.indentedRow].join(' ')}>
                <FormLabel className={classes.legend} component="legend">Logo:</FormLabel>
                {editable && editable.logo && editable.logo.length > 0 && (
                    <React.Fragment>
                        <div>
                            <img className={classes.logo} src={`/logo/${editable.logo}?${logoHash}`} />
                        </div>
                        <Button onClick={removeImage}>Remove logo</Button>
                    </React.Fragment>
                )}
                <Uploader
                    modalTitle="Upload a logo"
                    maxFiles={1}
                    maxFileSize={5242880}
                    maxFileSizeReadable='5MB'
                    validFileTypes={['jpg', 'png']}
                    fileType="logo"
                    metadata={({ departmentId: editable.id })}
                    buttonVariant="text"
                    onComplete={() => setLogoHash(Date.now())}
                />
            </div>
            <div className={[classes.formRow, classes.indentedRow].join(' ')}>
                <FormLabel className={classes.legend} component="legend">Dept colour:</FormLabel>
                <IconButton
                    onClick={() => setColourPicker(true)}
                    className={classes.iconButton}
                    aria-label="Dept colour"
                >
                    <FiberManualRecord
                        style={{ color: editable.colour }}
                    />
                </IconButton>
                {colourPicker && (
                    <React.Fragment>
                        <SketchPicker
                            className={classes.colourPicker}
                            color={editable.colour}
                            onChange={obj => handleChange(obj.hex.replace('#', ''), 'colour')}
                            disableAlpha
                        />
                        <div
                            onClick={() => setColourPicker(false)}
                            className={classes.clickaway}
                        />
                    </React.Fragment>
                )}
            </div>
            <div className={classes.actionRow}>
                <Button
                    onClick={handleUpdate}
                    variant="contained"
                    color="primary"
                >
                    Update department
                </Button>
                <ConfirmButton
                    disabled={department.readonly}
                    label="Delete department"
                    icon={<DeleteIcon />}
                    confirmTitle="Are you sure you want to delete this deparment?"
                    confirmBody="Everything associated with this department (e.g call types, officers, calls) will also be deleted."
                    confirmAction={handleDelete}
                />
            </div>
        </React.Fragment>
    );

};

export default withStyles(styles)(DepartmentConfig);