import React from 'react';
import { useQuery } from 'react-apollo';

import {
    Grid,
    Checkbox,
    Typography,
} from '@material-ui/core';

import UserRankDropdown from '../../lib/UserRankDropdown';
import { ALL_UNITS } from '../../graphql/Units/queries';

const AssignRow = ({
    classes,
    toggleAssignment,
    setRank,
    assignments,
    unit
}) => {
    const userInUnit = unit => {
        return assignments.find(assgn => assgn.unitId === unit.id)
            ? true
            : false;
    };

    const userRank = unit => {
        const found = assignments.find(
            assgn => assgn.unitId === unit.id
        );
        return found ? found.rankId : null;
    };

    return (
        <Grid
            className={classes.row}
            container
            alignItems="center"
            spacing={32}
            key={unit.id}
        >
            <Grid item xs={6}>
                <Checkbox
                    checked={userInUnit(unit)}
                    onChange={() => toggleAssignment(unit)}
                />
                <Typography variant="subtitle1" inline>
                    {unit.callSign}
                </Typography>
            </Grid>
            <Grid
                item
                xs={6}
                className={classes.rankDropdown}
            >
                <UserRankDropdown
                    handleUpdate={rank => setRank(unit, rank)}
                    userRank={userRank(unit)}
                    departmentId={unit.DepartmentId}
                />
            </Grid>
        </Grid>
    );
};

const UserUnitAssign = (props) => {
    const { department } = props;
    const { data: dataAllUnits } = useQuery(
        ALL_UNITS,
        { fetchPolicy: 'network-only' }
    );

    if (!dataAllUnits) return null;

    const filterByDept = toFilter => !department || (department.id === toFilter.DepartmentId);

    if (dataAllUnits && dataAllUnits.allUnits.length === 0) {
        return <Typography>No units defined</Typography>;
    }

    return dataAllUnits && dataAllUnits.allUnits.filter(filterByDept).map(unit => (
        <AssignRow
            {...props}
            key={unit.id}
            unit={unit}
        />
    ));
};

export default UserUnitAssign;