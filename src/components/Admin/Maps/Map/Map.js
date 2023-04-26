import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/react-hooks';

import {
    TableRow,
    TableCell,
    IconButton,
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { withStyles } from '@material-ui/core/styles';

import {
    UPDATE_MAP,
    DELETE_MAP
} from '../../../../graphql/Maps/mutations';

const styles = theme => ({
    mapName: {
        display: 'flex',
        alignItems: 'center'
    }
});

const Map = ({ map, refetch, classes }) => {

    const [updateMap] = useMutation(UPDATE_MAP);
    const [deleteMap] = useMutation(DELETE_MAP);
    const [editing, setEditing] = useState(false);
    const [localMap, setLocalMap] = useState();

    // Keep our local map in sync with what's coming from
    // the API
    useEffect(() => setLocalMap(map), [map]);

    const toggleActive = async () => {
        const toSend = { ...localMap, active: !map.active };
        await updateMap({ variables: toSend });
        refetch();
    };

    const sendUpdatedMap = async () => {
        await updateMap({ variables: localMap });
        setEditing(false);
        refetch();
    };

    const doDelete = async () => {
        await deleteMap({ variables: { id: map.id } });
        refetch();
    };

    const handleMapName = (e) => {
        setLocalMap({
            ...localMap,
            name: e.target.value
        });
    }

    return (
        <TableRow hover>
            <TableCell className={classes.mapName}>
                {!editing && (
                    <React.Fragment>
                        <Typography>
                            {localMap && localMap.name}
                        </Typography>
                        <IconButton onClick={() => setEditing(true)}>
                            <EditIcon />
                        </IconButton>
                    </React.Fragment>
                )}
                {editing && (
                    <React.Fragment>
                        <TextField
                            required
                            value={localMap.name}
                            onChange={handleMapName}
                            placeholder="Map name"
                        />
                        <IconButton onClick={() => setEditing(false)}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton onClick={sendUpdatedMap}>
                            <DoneIcon />
                        </IconButton>
                    </React.Fragment>
                )}
            </TableCell>
            <TableCell align="right">{map.processed ? 'Yes' : 'No'}</TableCell>
            <TableCell align="right">
                <Button onClick={toggleActive} disabled={!map.processed} color="primary" size="small" variant="contained">
                    {map.active ? 'Yes' : 'No'}
                </Button>
            </TableCell>
            <TableCell align="right">
                <IconButton onClick={doDelete} disabled={!map.processed || map.readonly}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>

        </TableRow >
    );
}

export default withStyles(styles)(Map);