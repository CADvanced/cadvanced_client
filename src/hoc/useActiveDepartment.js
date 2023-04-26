import { useState, useEffect, useContext } from 'react';

import { useQuery, useSubscription } from '@apollo/react-hooks';

import { AppContext } from './ContextProvider';
import { GET_CHARACTER } from '../graphql/Character/queries';
import { CHARACTER_ACTIVE_UPDATED } from '../graphql/Character/subscriptions';
import useCadvancedLogo from './useCadvancedLogo';

const useActiveDepartment = () => {
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [logo, setLogo] = useState();
    const [colour, setColour] = useState();
    const context = useContext(AppContext);
    const cadvancedLogo = useCadvancedLogo();

    const { loading, data: character, refetch } = useQuery(GET_CHARACTER, {
        variables: { UserId: context.userSession.id || 0 }
    });

    // Subscribe to active updates, so our cache gets updated
    useSubscription(CHARACTER_ACTIVE_UPDATED, {
        onSubscriptionData: () => {
            refetch();
        }
    });

    // This ensures we populate our active character on login
    useEffect(() => {
        refetch();
    }, [context.userSession]);

    useEffect(() => {
        if (loading) return;
        if (character && character.getCharacter && character.getCharacter.department) {
            const { id, name, logo: deptLogo, colour } = character.getCharacter.department;
            setId(id);
            setColour(colour);
            setName(name);
            if (deptLogo && deptLogo.length > 0) {
                setLogo(`/logo/${deptLogo}?${Date.now()}`);
            } else {
                setLogo(cadvancedLogo);
            }
        } else {
            setId(0);
            setName('CADvanced');
            setColour('#fff');
            setLogo(cadvancedLogo);
        }
    }, [character]);

    return {
        id,
        name,
        logo,
        colour
    };
};

export default useActiveDepartment;