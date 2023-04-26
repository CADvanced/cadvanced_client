import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AppContext } from './ContextProvider';

import { ALL_USER_LOCATIONS } from '../graphql/Users/queries';

const useUserLocation = () => {
    const context = useContext(AppContext);
    const mustHaveLocation =
        context.preferences.enable_fivem.value === 'true' ? true : false;
    const { data } = useQuery(ALL_USER_LOCATIONS, {
        variables: { mustHaveLocation },
        pollInterval: 5000
    });
    return data
        ? data.allUserLocations.filter(
              user => user.character && user.character.__typename === 'Officer'
          )
        : [];
};

export default useUserLocation;
