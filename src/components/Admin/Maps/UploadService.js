import axios from 'axios';

const doUpload = (id, name, file, onUploadProgress) => {
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
    formData.append('id', id);
    formData.append('name', name);
    formData.append('map', file);
    return client.post('/maps/upload', formData, {
        onUploadProgress
    });

}

export { doUpload };