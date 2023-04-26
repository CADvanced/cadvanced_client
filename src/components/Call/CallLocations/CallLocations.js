import React from 'react';

const CallLocations = props => {
    const locationString = props.locations.map(loc => loc.name).join(', ');
    return <span>{locationString}</span>;
};

export default CallLocations;
