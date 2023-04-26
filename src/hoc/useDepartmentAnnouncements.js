import { useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { ALL_DEPARTMENT_ANNOUNCEMENTS } from '../graphql/Departments/queries';
import {
    DEPARTMENT_ANNOUNCEMENT_ADDED,
    DEPARTMENT_ANNOUNCEMENT_DELETED
} from '../graphql/Departments/subscriptions';

const useDepartmentAnnouncements = (department) => {
    const { loading, data, subscribeToMore } = useQuery(ALL_DEPARTMENT_ANNOUNCEMENTS, {
        variables: { id: department ? department.id : 0 }
    });

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: DEPARTMENT_ANNOUNCEMENT_ADDED,
            variables: { id: department ? department.id : 0 },
            updateQuery: (prev, { subscriptionData }) => {
                if (!department || subscriptionData.data.departmentAnnouncementAdded.DepartmentId !== department.id) {
                    return prev;
                }
                return Object.assign({}, prev, {
                    allDepartmentAnnouncements: [
                        ...prev.allDepartmentAnnouncements,
                        subscriptionData.data.departmentAnnouncementAdded
                    ]
                });
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: DEPARTMENT_ANNOUNCEMENT_DELETED,
            variables: { id: department ? department.id : 0 },
            updateQuery: (prev, { subscriptionData }) => {
                const deleted = subscriptionData.data.departmentAnnouncementDeleted;
                return Object.assign({}, prev, {
                    allDepartmentAnnouncements: prev.allDepartmentAnnouncements.filter(ann => ann.id !== deleted)
                })
            }
        });
        return () => unsubscribe();
    }, []);

    return {
        loading,
        data
    };
};

export default useDepartmentAnnouncements;