import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';

import { useQuery } from '@apollo/react-hooks';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Done from '@material-ui/icons/Done';

import { ALL_MAPS } from '../../../graphql/Maps/queries';
import { doUpload } from './UploadService';
import Map from './Map/Map';

const styles = theme => ({
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 8
    },
    noMaps: {
        textAlign: 'center',
        color: theme.palette.primary.darkShade
    },
    mapHelp: {
        margin: '1em 0 2em 0'
    },
    uploadError: {
        textAlign: 'center',
        marginBottom: '20px'
    },
    uploadComplete: {
        textAlign: 'center',
        marginBottom: '20px',
        padding: '20px',
        border: '2px solid rgba(0,0,0,0.5)'
    },
    mapsContainer: {
        display: 'flex'
    },
    sectionHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    },
    mapList: {
        marginRight: '10px'
    },
    mapUpload: {
        marginLeft: '10px'
    },
    section: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        flex: 1
    },
    uploadArea: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px'
    },
    mapName: {
        flex: 1
    },
    fileInput: {
        marginTop: '20px'
    },
    fileUploader: {
        display: 'flex',
        height: '1.5em'
    },
    progressBar: {
        margin: '20px 0'
    },
    completed: {
        marginLeft: '15px',
        color: theme.palette.primary.darkShade
    },
    uploadButton: {
        marginTop: '15px'
    }
});

const Maps = ({ classes }) => {

    const [maps, setMaps] = useState([]);
    const [toUpload, setToUpload] = useState([]);
    const [toUploadDisplay, setToUploadDisplay] = useState([]);
    const [uploadErrors, setUploadErrors] = useState([]);
    const [mapNameErrors, setMapNameErrors] = useState([]);
    const [uploadingSize, setUploadingSize] = useState(0);
    const [mapName, setMapName] = useState('');
    const [progress, setProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);

    const { loading, data, subscribeToMore, refetch } = useQuery(
        ALL_MAPS
    );

    // Update our local state when the maps arrive from the API
    useEffect(() => setMaps(data ? data.allMaps : []), [data]);
    // When the user chooses some files, create a new state array for display
    useEffect(() => setToUploadDisplay(Array.from(toUpload).map((el) => ({
        name: el.name,
        size: el.size
    }))), [toUpload])
    // When all files are uploaded, refetch the maps list and reset
    // our state
    useEffect(() => {
        const complete = toUploadDisplay.every((up) => up.completed);
        if (toUploadDisplay.length > 0 && complete) {
            setUploadComplete(true);
            refetch();
            resetState();
        }
    }, [toUploadDisplay]);

    // The files we need
    const expectedFilenames = [
        'minimap_sea_0_0.png',
        'minimap_sea_0_1.png',
        'minimap_sea_1_0.png',
        'minimap_sea_1_1.png',
        'minimap_sea_2_0.png',
        'minimap_sea_2_1.png'
    ];

    // Maximum size of an individual file - 30MB
    const maxFilesize = 30720000;

    const resetState = () => {
        setToUpload([]);
        setToUploadDisplay([]);
        setUploadErrors([]);
        setUploadingSize(0);
        setMapName('');
        setProgress(0);
    };

    // Respond to the user having chosen some files
    // Validate and, if all is well, set our state
    const handleNewFiles = (event) => {

        const uploading = Array.from(event.target.files);
        const errors = [];
        setUploadErrors([]);
        if (uploading.length !== 6) {
            errors.push('You must upload 6 files');
        }

        uploading.forEach((toCheck) => {
            if (toCheck.type !== 'image/png') {
                errors.push('Only .png files can be uploaded');
            }
            if (!expectedFilenames.includes(toCheck.name)) {
                errors.push(`Files can only be ${expectedFilenames.join(', ')}`);
            }
            if (toCheck.size > maxFilesize) {
                errors.push('Individual file cannot be larger than 30MB');
            }
        });

        if (errors.length > 0) {
            setUploadErrors(errors);
            return;
        }
        setToUpload(event.target.files);
    };

    // Handle updating of the map name
    const updateMapName = (event) => {
        const existingNames = maps.map(m => m.name);
        const name = event.target.value;
        const conflicts = existingNames.filter(e => {
            const re = new RegExp('^' + name + '$', 'gi');
            return re.test(e);
        });
        if (conflicts.length > 0) {
            setMapNameErrors(['This name is already is use']);
        } else {
            setMapNameErrors([]);
        }
        setMapName(name);
    };

    // Well, this is convoluted. Because updateProgress is passed as a callback
    // to doUpload, it hangs on to the value of uploadingSize at the point when it
    // is passed to doUpload. So we need to use the fact that the setter, setUploadingSize,
    // receives the current value of uploadingSize as an argument, to get the current
    // version.
    const updateProgress = (event) => {
        setUploadingSize(uS => {
            setProgress(Math.floor((event.loaded / uS) * 100));
            return uS;
        });
    }

    // Update the completed state of an upload 
    const updateCompleted = (toUpdate, i) => {
        return toUpdate.map((upload, index) =>
            index === i ?
                { ...upload, completed: true } :
                upload
        );

    };

    // Commence upload by looping through the uploads
    const startUpload = async () => {
        const id = v4();
        for (let i = 0; i < toUpload.length; i++) {
            setUploadingSize(toUpload[i].size);
            try {
                await doUpload(id, mapName, toUpload[i], updateProgress);
                setToUploadDisplay(current => updateCompleted(current, i));
            } catch (err) {
                setUploadErrors((ul) => [...ul, 'Error uploading map']);
                break;
            }
        }
    }

    return (
        <React.Fragment>
            <Typography
                align="center"
                className={classes.pageHead}
                variant="h2"
                component="h2"
            >
                Maps
            </Typography>
            <div className={classes.mapsContainer}>
                <Paper className={`${classes.section} ${classes.mapList}`}>
                    <Typography className={classes.sectionHead} variant="h3" component="h3" key="error">Your maps</Typography>
                    {maps && maps.length === 0 && (
                        <Typography className={classes.noMaps}>You do not have any maps available</Typography>
                    )}
                    {maps && maps.length > 0 && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Map name</TableCell>
                                    <TableCell align="right">Ready</TableCell>
                                    <TableCell align="right">Active</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {maps.sort((a, b) => a.name.localeCompare(b.name)).map((map) => (
                                    <Map key={map.id} map={map} refetch={refetch} />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
                <Paper className={`${classes.section} ${classes.mapUpload}`}>
                    <Typography className={classes.sectionHead} variant="h3" component="h3" key="error">Upload a map</Typography>
                    <Typography className={classes.mapHelp} variant="h5">For help on how to prepare files for upload, please see <a href="https://www.youtube.com/watch?v=ak-A3laEPQk" target="_blank" rel="noopener noreferrer">this video</a>. If you need further help, please visit <a href="https://cadvanced.app/discord" target="_blank" rel="noopener noreferrer">our Discord server</a></Typography>
                    {uploadErrors.length > 0 && (
                        <div className={classes.uploadError}>
                            {uploadErrors.map((error) => (
                                <Typography variant="h6" key="error">{error}</Typography>
                            ))}
                        </div>
                    )}
                    {mapNameErrors.length > 0 && (
                        <div className={classes.uploadError}>
                            {mapNameErrors.map((error) => (
                                <Typography variant="h6" key="error">{error}</Typography>
                            ))}
                        </div>
                    )}
                    <div className={classes.uploadArea}>
                        <TextField
                            required
                            className={classes.mapName}
                            onChange={updateMapName}
                            value={mapName}
                            placeholder="Map name"
                        />
                        <input className={classes.fileInput} type="file" multiple onChange={handleNewFiles} />
                    </div>
                    {toUploadDisplay.map((file, index) => (
                        <div className={classes.fileUploader} key={index}>
                            {file.name}
                            {file.completed && (
                                <div className={classes.completed}>
                                    <Done />
                                </div>
                            )}
                        </div>
                    ))}
                    {uploadingSize > 0 && (
                        <LinearProgress className={classes.progressBar} color="secondary" variant="determinate" value={progress} />
                    )}
                    {uploadComplete && (
                        <div className={classes.uploadComplete}>
                            <Typography>
                                You map has been uploaded. It will shortly be prepared for use. Please check here again shortly, once the map is listed as "Ready" in the map list, you may activate it
                            </Typography>
                        </div>
                    )}
                    <div className={classes.uploadButton}>
                        <button
                            type="button"
                            disabled={uploadingSize > 0 || mapName.length < 1 || toUpload.length !== 6 || uploadErrors.length > 0 || mapNameErrors.length > 0}
                            onClick={startUpload}
                        >
                            Upload files
                        </button>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
    );
}

export default withStyles(styles)(Maps);
