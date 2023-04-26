import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import FilteredSelect from '../lib/FilteredSelect';
import { ALL_UNIT_STATES } from '../graphql/Units/queries';

const UnitStatesDropdown = ({ value, open, setOpen, update, departmentId }) => {
    const { loading, data } = useQuery(ALL_UNIT_STATES);

    const doUpdate = obj => {
        update(obj);
        setOpen(false);
    };

    const filterByDept = toFilter => departmentId === toFilter.DepartmentId;

    return data ? (
        <FilteredSelect
            loading={loading}
            open={open}
            update={value => doUpdate({ unitStateId: value })}
            options={data.allUnitStates
                .filter(filterByDept)
                .map(op => ({
                    label: op.name,
                    value: op.id,
                    colour: `#${op.colour}`
                }))}
            selected={value || 0}
            placeholder=""
        />
    ) : null;
};

export default UnitStatesDropdown;
