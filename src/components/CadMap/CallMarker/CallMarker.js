import React from 'react';

import { withApollo } from 'react-apollo';
import { Marker } from 'react-leaflet';

import { UPDATE_CALL_MARKER } from '../../../graphql/Calls/mutations';
import { fiveM2Leaflet, leaflet2FiveM } from '../Conversion';

const CallMarker = props => {
    const { call, client, highlightedCall } = props;

    const updateMarkerLocation = marker => {
        const latLng = marker.getLatLng();
        client.mutate({
            mutation: UPDATE_CALL_MARKER,
            variables: {
                id: call.id,
                markerX: leaflet2FiveM('x', latLng.lng),
                markerY: leaflet2FiveM('y', latLng.lat)
            }
        });
    };

    return call.markerX !== null && call.markerY !== null ? (
        <Marker
            opacity={highlightedCall === call.id ? 1 : 0.7}
            onMoveEnd={({ target }) => updateMarkerLocation(target)}
            draggable
            key={call.id}
            position={[
                fiveM2Leaflet('y', props.call.markerY),
                fiveM2Leaflet('x', props.call.markerX)
            ]}
        />
    ) : null;
};

export default withApollo(CallMarker);
