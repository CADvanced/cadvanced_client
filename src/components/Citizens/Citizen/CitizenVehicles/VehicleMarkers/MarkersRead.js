import React from 'react';

import Typography from '@material-ui/core/Typography';

import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';

const MarkersRead = ({ markers }) => {
    if (!markers) {
        return <LoadingSpinner />;
    }

    return (
        <Typography variant="subtitle1">
            Markers: {markers && markers.map(m => m.name).join(', ')}
        </Typography>
    );
};

export default MarkersRead;
