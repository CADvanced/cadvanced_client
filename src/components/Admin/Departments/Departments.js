import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { ALL_DEPARTMENTS } from '../../../graphql/Departments/queries';
import {
    DEPARTMENT_ADDED,
    DEPARTMENT_UPDATED,
    DEPARTMENT_DELETED
} from '../../../graphql/Departments/subscriptions';
import {
    CREATE_DEPARTMENT
} from '../../../graphql/Departments/mutations';

import Department from './Department';

const styles = theme => ({
    root: {
        width: '100%'
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 8
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 6,
        right: theme.spacing.unit * 6,
        zIndex: 1100
    }
});

const alphaSort = (a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
};

const appendTimestamp = image => {
    const stripped = image.replace(/\?\d+/g, '');
    return stripped + '?' + Date.now();
};


const Departments = ({ classes }) => {
    const { loading, data, subscribeToMore, refetch } = useQuery(ALL_DEPARTMENTS);
    const [openDepartment, setOpenDepartment] = useState();
    const [createDepartment] = useMutation(CREATE_DEPARTMENT);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        let out = data && data.allDepartments ? data.allDepartments : [];
        // Add a timestamp to the querystring of all logos
        /*
        out = out.map(dept => ({
            ...dept,
            logo: dept && dept.logo && dept.logo.length > 0 ? appendTimestamp(dept.logo) : dept.logo
        }));
        */
        setDepartments(out);
    }, [data]);

    [DEPARTMENT_ADDED, DEPARTMENT_UPDATED, DEPARTMENT_DELETED].forEach(query => {
        useEffect(() => {
            const unsubscribe = subscribeToMore({
                document: query,
                updateQuery: prev => {
                    refetch();
                    return prev;
                }
            });
            return () => unsubscribe();
        }, []);
    });

    const handleOpen = () => {
        setDialogOpen(true);
    }

    const handleClose = () => {
        setDialogOpen(false);
    }

    const handleSave = async () => {
        if (name.length === 0) return;
        const created = await createDepartment({
            variables: { name }
        });
        setOpenDepartment(created.data.createDepartment.id);
        handleClose();
    };

    const handleUpdate = (e) => {
        setName(e.target.value);
    };

    return (
        <React.Fragment>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>Add new department</DialogTitle>
                <DialogContent>
                    <DialogContentText>Please name your department</DialogContentText>
                    <TextField
                        onChange={handleUpdate}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Department name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button disabled={name.length === 0} onClick={handleSave} color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Fab
                onClick={handleOpen}
                color="secondary"
                aria-label="add"
                className={classes.fab}
            >
                <AddIcon />
            </Fab>
            <Typography
                align="center"
                className={classes.pageHead}
                variant="h2"
                component="h2"
            >
                Manage Departments
            </Typography>
            {loading && !data && <LoadingSpinner />}
            {departments.sort(alphaSort).map(department => (
                <Department
                    expanded={openDepartment === department.id}
                    setExpanded={setOpenDepartment}
                    key={department.id}
                    department={department}
                />
            ))}
        </React.Fragment>
    );
};

export default withStyles(styles)(Departments);
