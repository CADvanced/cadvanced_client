import React from 'react';

const CallIncidents = props => {
    const incidentString = props.incidents.map(inc => inc.name).join(', ');
    return <span>{incidentString}</span>;
};

export default CallIncidents;
