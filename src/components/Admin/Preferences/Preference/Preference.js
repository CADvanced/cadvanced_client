import React, { useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Mutation } from 'react-apollo';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { UPDATE_PREFERENCE } from '../../../../graphql/Preferences/mutations';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    itemsPrefContainer: {
        display: 'block',
    },
    itemsContainer: {
        paddingTop: '20px',
        paddingLeft: '20px'
    },
    border: {
        paddingRight: theme.spacing.unit * 2,
        borderRadius: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit * 3,
        backgroundColor: theme.palette.primary.mid
    },
    text: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    menu: {
        width: 200
    }
});

const prefItems = props => {
    const extraData = props.extraData;
    const selectedOptions = JSON.parse(props.preference.value);
    const keyProp = props.keyProp;

    return (
        <Mutation mutation={UPDATE_PREFERENCE}>
            {mutation => (
                <div className={props.classes.itemsPrefContainer}>
                    <Typography component="div" variant="caption">
                        {props.preference.desc}
                    </Typography>
                    <FormGroup row className={props.classes.itemsContainer}>
                        {extraData.map(type => {
                            return (
                                <FormControlLabel
                                    key={type[keyProp]}
                                    className={props.classes.border}
                                    control={
                                        <Checkbox
                                            checked={selectedOptions.includes(
                                                type[keyProp]
                                            )}
                                            onChange={event => {
                                                const isSel = selectedOptions.includes(
                                                    type[keyProp]
                                                );
                                                let toSend = [
                                                    ...selectedOptions
                                                ];
                                                if (isSel) {
                                                    toSend.splice(
                                                        selectedOptions.findIndex(
                                                            s =>
                                                                s ===
                                                                type[keyProp]
                                                        ),
                                                        1
                                                    );
                                                } else {
                                                    toSend = [
                                                        ...toSend,
                                                        type[keyProp]
                                                    ];
                                                }
                                                mutation({
                                                    variables: {
                                                        key:
                                                            props.preference
                                                                .key,
                                                        value: JSON.stringify(
                                                            toSend
                                                        )
                                                    }
                                                });
                                            }}
                                            value={type[keyProp]}
                                        />
                                    }
                                    label={type.name}
                                />
                            );
                        })}
                    </FormGroup>
                </div>
            )}
        </Mutation>
    );
};

const prefText = props => {
    const [mutation] = useMutation(UPDATE_PREFERENCE);
    const [textVal, setTextVal] = useState(props.preference.value);
    const isMountRef = useRef(true);

    useEffect(() => {
        if (!isMountRef.current) {
            mutation({
                variables: {
                    key: props.preference.key,
                    value: textVal.trim()
                }
            })
        }
        isMountRef.current = false;
    }, [textVal])
    return (
        <TextField
            id={props.preference.key}
            type="text"
            label={props.preference.name}
            className={props.classes.text}
            value={props.preference.value}
            onChange={event => setTextVal(event.target.value)}
            helperText={props.preference.desc}
            margin="normal"
            variant="outlined"
        />
    );
};

const prefBoolean = props => (
    <Mutation mutation={UPDATE_PREFERENCE}>
        {mutation => (
            <TextField
                id={props.preference.key}
                select
                label={props.preference.name}
                className={props.classes.text}
                value={props.preference.value}
                onChange={event =>
                    mutation({
                        variables: {
                            key: props.preference.key,
                            value: event.target.value
                        }
                    })
                }
                SelectProps={{
                    MenuProps: {
                        className: props.classes.menu
                    }
                }}
                helperText={props.preference.desc}
                margin="normal"
                variant="outlined"
            >
                <MenuItem key={1} value={'true'}>
                    Yes
                </MenuItem>
                <MenuItem key={0} value={'false'}>
                    No
                </MenuItem>
            </TextField>
        )}
    </Mutation>
);

const Preference = props => {
    switch (props.preference.type) {
        case 'text':
            return prefText(props);
        case 'boolean':
            return prefBoolean(props);
        case 'list':
            return prefItems(props);
        default:
            return null;
    }
};

export default withStyles(styles)(Preference);
