import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';

import {
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

import { ALL_DEPARTMENTS } from '../../../graphql/Departments/queries';
import DepartmentIcon from '../../../lib/DepartmentIcon';

const styles = theme => ({
    icon: {
        color: theme.palette.text.primary
    },
    listItemRoot: {
        background: 'rgba(0,0,0,0.1)'
    }

});

const DispatchButtons = ({ classes }) => {
    const [dispatchOpen, setDispatchOpen] = useState(false);
    const { data: departments } = useQuery(ALL_DEPARTMENTS);
    const history = useHistory();

    const showDepartments = e => {
        if (departments && departments.allDepartments.length > 1) {
            // Prevent the main Drawer receiving the click
            // and collapsing
            e.stopPropagation();
            setDispatchOpen(true);
        } else {
            const departmentId = departments && departments.allDepartments[0].id;
            if (departmentId) {
                history.push(`/dispatcher/${departmentId}`);
            }
        }
    };

    return (
        <React.Fragment>
            <ListItem
                button
                onClick={showDepartments}
                classes={{ root: dispatchOpen ? classes.listItemRoot : null }}
            >
                <PersonPinIcon className={classes.icon} />
                <ListItemText primary="Dispatcher" />
            </ListItem>
            {dispatchOpen && (
                <ListItem
                    button
                    component={Link}
                    to={'/dispatcher'}
                    classes={{ root: dispatchOpen ? classes.listItemRoot : null }}
                >
                    <AllInclusiveIcon className={classes.icon} />
                    <ListItemText primary="All departments" />
                </ListItem>
            )}
            {dispatchOpen && departments && departments.allDepartments && departments.allDepartments.map(dept => (
                <ListItem
                    key={dept.id}
                    button
                    component={Link}
                    onClick={() => setDispatchOpen(false)}
                    to={`/dispatcher/${dept.id}`}
                    classes={{ root: dispatchOpen ? classes.listItemRoot : null }}
                >
                    <DepartmentIcon department={dept.id} />
                    <ListItemText primary={dept.name} />
                </ListItem>
            ))}
        </React.Fragment>
    );
};

export default withStyles(styles)(DispatchButtons);