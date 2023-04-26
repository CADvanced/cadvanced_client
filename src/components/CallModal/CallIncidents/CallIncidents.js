import React from 'react';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { ALL_INCIDENT_TYPES } from '../../../graphql/Calls/queries';

const tempId = 0;

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minHeight: theme.spacing.unit * 5
    },
    inputLabel: {
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    chip: {
        margin: theme.spacing.unit / 2
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    }
});

const CallIncidents = ({
    callIncidents,
    handleUpdate,
    classes,
    department
}) => {
    const handleChange = (data, event) => {
        const toPush = data.allIncidentTypes.find(
            i => Number(i.id) === Number(event.target.value)
        );
        const incidentCopy = [...callIncidents];
        incidentCopy.push(toPush);
        handleUpdate('callIncidents', incidentCopy);
    };

    const isSelected = candidate => {
        return (
            callIncidents.findIndex(
                ex => Number(ex.id) === Number(candidate.id)
            ) > -1
        );
    };

    const handleDelete = deleteMe => {
        const incidentCopy = [...callIncidents];
        const targetIndex = incidentCopy.findIndex(
            incident => Number(incident.id) === Number(deleteMe.id)
        );
        incidentCopy.splice(targetIndex, 1);
        handleUpdate('callIncidents', incidentCopy);
    };

    const filterByDept = toFilter => {
        return !department || (toFilter.DepartmentId === department);
    }

    return (
        <FormControl className={classes.formControl}>
            <Query query={ALL_INCIDENT_TYPES}>
                {({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner />;
                    if (error) return <p>Error</p>;
                    if (data.allIncidentTypes.filter(filterByDept).length === 0)
                        return (
                            <Typography>No incident types defined</Typography>
                        );
                    return (
                        <React.Fragment>
                            <Typography
                                variant={'caption'}
                                className={classes.inputLabel}
                            >
                                Call incidents
                            </Typography>
                            <div>
                                {callIncidents.map(incident => {
                                    return (
                                        <Chip
                                            color="secondary"
                                            key={incident.id}
                                            label={incident.name}
                                            onDelete={() =>
                                                handleDelete(incident)
                                            }
                                            className={classes.chip}
                                        />
                                    );
                                })}
                                <Select
                                    value={tempId}
                                    onChange={e => handleChange(data, e)}
                                >
                                    {data.allIncidentTypes.filter(filterByDept).map(incident => (
                                        <MenuItem
                                            key={incident.id}
                                            disabled={isSelected(incident)}
                                            value={incident.id}
                                        >
                                            {incident.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </React.Fragment>
                    );
                }}
            </Query>
        </FormControl>
    );
};

export default withStyles(styles)(CallIncidents);
