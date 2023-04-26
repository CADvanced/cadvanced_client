import React from 'react';

import {
    Tooltip,
    Marker,
    Popup
} from 'react-leaflet';

import { withStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import UserPopup from '../../User/UserPopup';
import { fiveM2Leaflet } from '../Conversion';
import { getCharacterName } from '../../../lib/Misc';
import getMarkerIcon from './markerIcon';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit
    },
    tooltip: {
        borderRadius: '20px'
    }
});

const locationSummary = location =>
    getCharacterName(location) + (location.alias ? ` (${location.alias})` : '');

const MarkerAvatar = ({ location }) => (
    <Avatar
        alt={locationSummary(location)}
        src={location.avatarUrl}
    />
);

const MarkerChip = props => {
    const { location, classes } = props;
    return <Chip
        avatar={<MarkerAvatar {...props} />}
        label={locationSummary(location)}
        className={classes.chip}
    />;
};

const UserMarker = props => {
    const {
        location,
        openUserModal,
    } = props;

    if (
        location.x &&
        location.y &&
        location.character &&
        location.character.__typename === 'Officer'
    ) {
        return (
            <Marker
                icon={getMarkerIcon(location)}
                key={location.id}
                position={[
                    fiveM2Leaflet('y', location.y),
                    fiveM2Leaflet('x', location.x)
                ]}
            >
                <Tooltip>
                    <MarkerChip {...props} />
                </Tooltip>
                <Popup>
                    <UserPopup
                        openUserModal={() => openUserModal(location)}
                        user={location}
                    />
                </Popup>
            </Marker>
        );
    } else {
        return null;
    }

}

export default withStyles(styles)(UserMarker);
