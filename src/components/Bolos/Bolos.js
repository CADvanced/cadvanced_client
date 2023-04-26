import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

import BolosToolbar from '../BolosToolbar/BolosToolbar';
import Bolo from '../Bolo/Bolo';
import { ALL_BOLOS } from '../../graphql/Bolos/queries';
import { BOLOS_SUBSCRIPTION } from '../../graphql/Bolos/subscriptions';
import { DELETE_BOLO } from '../../graphql/Bolos/mutations';
import BoloModal from '../BoloModal/BoloModal';

const Bolos = ({ department }) => {
    const [bolos, setBolos] = useState([]);
    const [activeBolo, setActiveBolo] = useState();
    const [boloModalOpen, setBoloModalOpen] = useState(false);

    const { data, subscribeToMore, refetch } = useQuery(
        ALL_BOLOS
    );
    const [deleteBolo] = useMutation(DELETE_BOLO);

    // Update our local state when we get something from the API
    useEffect(() => {
        if (!data) return;
        setBolos(data.allBolos);
    }, [data]);

    const modalOpenHandler = bolo => {
        setActiveBolo(bolo ? bolo : null);
        setBoloModalOpen(true);
    };

    const modalCancelHandler = () => {
        setActiveBolo(null);
        setBoloModalOpen(false);
    };

    const filterByDept = toFilter => {
        return !department.id || toFilter.DepartmentId === department.id;
    };

    // Receive a subscription that something has happened and refetch
    // all our BOLO data
    subscribeToMore({
        document: BOLOS_SUBSCRIPTION,
        updateQuery: () => {
            refetch();
        }
    });

    return (
        <React.Fragment>
            {boloModalOpen && (
                <BoloModal
                    department={department}
                    activeBolo={activeBolo}
                    open={true}
                    cancelHandler={modalCancelHandler}
                />
            )}
            <BolosToolbar openBoloModal={modalOpenHandler} />
            {bolos
                .filter(filterByDept)
                .sort((a, b) => b.id - a.id).map(bolo => (
                    <Bolo
                        key={bolo.id}
                        bolo={bolo}
                        editBolo={modalOpenHandler}
                        deleteBolo={deleteBolo}
                    />
                ))}
        </React.Fragment>
    );
}

export default Bolos;