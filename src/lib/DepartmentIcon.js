import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Avatar } from '@material-ui/core';

import { ALL_DEPARTMENTS } from '../graphql/Departments/queries';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const DepartmentIcon = props => {
    const { department, loadingSize, hideSpinner } = props;
    if (!department) return null;

    const { loading, data } = useQuery(ALL_DEPARTMENTS);

    if (!data) return null;

    if (loading) return hideSpinner ? null : <LoadingSpinner size={loadingSize} />;

    const foundDept = data.allDepartments.find(dept => dept.id === department);

    const style = {
        background: `#${foundDept.colour}`,
        height: '20px',
        width: '20px',
        fontSize: '13px'
    };

    return <Avatar style={style}>{foundDept.name.charAt(0)}</Avatar>;
};

export default DepartmentIcon;