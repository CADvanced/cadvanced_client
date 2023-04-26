import React from 'react';

import useUserLocation from './useUserLocations';

const withUserLocationsNew = Comp => props => {
    const locations = useUserLocation();
    return <Comp {...props} allUserLocations={locations} />;
};

export default withUserLocationsNew;
