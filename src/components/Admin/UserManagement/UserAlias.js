import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';

const UserAlias = ({ user, updateUser, loading }) => {
    const [alias, setAlias] = useState(user.alias || '');
    useEffect(() => {
        if (alias !== user.alias) {
            let timeout = setTimeout(
                () => updateUser({ ...user, alias }),
                1000
            );
            return () => clearTimeout(timeout);
        }
    }, [alias]);
    const updateState = e => {
        setAlias(e.target.value);
    };
    return (
        <TextField
            margin="normal"
            variant="outlined"
            disabled={loading}
            value={alias}
            onChange={e => updateState(e)}
            label="Alias"
        />
    );
};

export default UserAlias;
