import React from 'react';

import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import { REMOVE_USER_FROM_UNIT } from '../../../graphql/Units/mutations';
import { Typography } from '@material-ui/core';

import { getCharacterName } from '../../../lib/Misc';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit
    },
    noUsers: {
        marginBottom: '1em'
    }
});

const UnitUsers = props => {
    const { classes, unit, users } = props;
    const handleDelete = (mut, user) => {
        mut({ variables: { UserId: user.id, UnitId: unit.id } });
    };
    return (
        <Mutation mutation={REMOVE_USER_FROM_UNIT}>
            {(mut, { loading }) => {
                const filtered = users.filter(
                    user =>
                        user.hasOwnProperty('character') &&
                        user.character &&
                        user.character.__typename === 'Officer'
                );
                return filtered.length > 0 ? (
                    filtered.map(user => {
                        return (
                            <Chip
                                title={
                                    'Remove ' +
                                    getCharacterName(user) +
                                    ' from ' +
                                    unit.callSign
                                }
                                key={user.id}
                                avatar={
                                    <Avatar
                                        alt={getCharacterName(user)}
                                        src={user.avatarUrl}
                                    />
                                }
                                label={
                                    loading
                                        ? 'Deleting...'
                                        : getCharacterName(user)
                                }
                                onDelete={() => handleDelete(mut, user)}
                                className={classes.chip}
                            />
                        );
                    })
                ) : (
                    <Typography className={classes.noUsers}>
                        No officers assigned
                    </Typography>
                );
            }}
        </Mutation>
    );
};

export default withStyles(styles)(UnitUsers);
