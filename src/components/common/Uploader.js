import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress
} from '@material-ui/core';

const styles = theme => ({
    uploadContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    preview: {
        width: '500px',
        height: '500px',
        border: '2px solid rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        maxHeight: '100%',
        maxWidth: '100%',
        display: 'block'
    }
});

const doUpload = (id, fileType, file, onUploadProgress, metadata) => {
    const baseURL = process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL
        : `${window.location.protocol}//${window.location.hostname}`;

    const client = axios.create({
        baseURL,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    let formData = new FormData();
    Object.keys(metadata).forEach(key => formData.append(key, metadata[key]));
    formData.append('id', id);
    formData.append('type', fileType);
    formData.append('file', file);
    return client.post('/logos/upload', formData, {
        onUploadProgress
    });
}

const Uploader = ({
    classes,
    modalTitle,
    maxFiles,
    maxFileSize,
    maxFileSizeReadable,
    validFileTypes,
    fileType,
    metadata,
    buttonVariant = "contained",
    onComplete
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadErrors, setUploadErrors] = useState([]);
    const [allowedFileTypes, setAllowedFileTypes] = useState(validFileTypes);
    const [uploadingSize, setUploadingSize] = useState(0);
    const [progress, setProgress] = useState(0);

    // JPG has a type of image/jpeg, so if jpg is in the allowed
    // filetypes, add jpeg too
    if (allowedFileTypes.includes('jpg') && !allowedFileTypes.includes('jpeg')) {
        setAllowedFileTypes([
            ...allowedFileTypes,
            'jpeg'
        ]);
    }

    const onSelect = (event) => {
        const valid = validateFiles(event);
        if (!valid) return;
        setFiles(event.target.files);
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
    const startUpload = async () => {
        for (let i = 0; i < files.length; i++) {
            setUploadingSize(files[i].size);
            const id = v4();
            try {
                const result = await doUpload(id, fileType, files[i], updateProgress, metadata);
                // Close the modal 2 seconds after the upload is complete
                setTimeout(() => {
                    setModalOpen(false);
                    setFiles([]);
                    setUploadErrors([]);
                    setUploadingSize(0);
                    setProgress(0);
                    if (onComplete) {
                        onComplete();
                    }
                }, 1000);
            } catch (err) {
                setUploadErrors((ul) => [...ul, `Error uploading ${files[i].name}`]);
                break;
            }
        }

    };

    const validateFiles = (event) => {
        setFiles([]);
        setUploadErrors([]);
        setUploadingSize(0);
        setProgress(0);
        const uploading = Array.from(event.target.files);
        const errors = [];
        if (uploading.length > maxFiles) {
            if (maxFiles === 1) {
                errors.push('You can only one file');
            } else {
                errors.push(`You can only upload up to ${maxFiles} files`);
            }
        }

        uploading.forEach((toCheck) => {
            const ext = toCheck.type.replace("image/", '');
            if (!toCheck.type.startsWith('image/') || !allowedFileTypes.includes(ext)) {
                errors.push(`You can only upload files of the following types: ${validFileTypes.join(', ')}`)
            }
            if (toCheck.size > maxFileSize) {
                errors.push(`Maximum individual file size is ${maxFileSizeReadable}`);
            }
        });

        if (errors.length > 0) {
            setUploadErrors(errors);
            return false;
        }
        return true;
    };

    return (
        <React.Fragment>
            <Button variant={buttonVariant} size="small" color="secondary" onClick={() => setModalOpen(true)}>Upload image</Button>
            <Dialog
                open={modalOpen}
            >
                <DialogTitle>{modalTitle}</DialogTitle>
                <DialogContent className={classes.uploadContainer}>
                    {files.length === 1 && (
                        <div className={classes.preview}>
                            <img
                                className={classes.image}
                                src={URL.createObjectURL(files[0])}
                            />
                        </div>
                    )}
                    {uploadingSize > 0 && (
                        <LinearProgress className={classes.progressBar} color="secondary" variant="determinate" value={progress} />
                    )}
                    {uploadErrors.length > 0 && (
                        <div>
                            {uploadErrors.map((error, i) => (
                                <Typography key={i} variant="h6">{error}</Typography>
                            ))}
                        </div>
                    )}
                    <input className={classes.fileInput} type="file" multiple onChange={onSelect} />
                    <Typography>Maximum file size: {maxFileSizeReadable}. Valid image types: {validFileTypes.join(', ')}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={startUpload} color="secondary" autoFocus>Upload</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

Uploader.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    maxFiles: PropTypes.number.isRequired,
    maxFileSize: PropTypes.number.isRequired,
    maxFileSizeReadable: PropTypes.string.isRequired,
    validFileTypes: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ),
    metadata: PropTypes.object,
    buttonVariant: PropTypes.string
};

export default withStyles(styles)(Uploader);