import React from 'react';

import Select from 'react-select';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    input: {
        display: 'flex',
        padding: 0
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontFamily: theme.typography.fontFamily,
        fontSize: 16
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
        fontFamily: theme.typography.fontFamily
    },
    paper: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        zIndex: 9999
    }
});

const NoOptionsMessage = props => {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
};

const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
};

const Control = props => {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
};

const SingleValue = props => {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
};

const ValueContainer = props => {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
};

const Menu = props => {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
};

const Placeholder = props => {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
};

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Placeholder,
    SingleValue,
    ValueContainer
};

const FilteredSelect = ({
    classes,
    loading,
    theme,
    options,
    selected,
    update,
    placeholder,
    isClearable,
    noOptionsMessage,
    open
}) => {
    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit'
            }
        }),
        option: (base, { data, isFocused }) => {
            return {
                ...base,
                fontFamily: theme.typography.fontFamily,
                color: data.colour
            };
        }
    };
    return (
        <div onClick={e => e.stopPropagation()}>
            <Select
                isLoading={loading}
                menuIsOpen={open}
                styles={selectStyles}
                variant="outlined"
                classes={classes}
                options={options}
                components={components}
                value={options.find(op => op.value === selected)}
                onChange={event => update(event.value)}
                placeholder={placeholder}
                isClearable={isClearable}
                noOptionsMessage={() =>
                    noOptionsMessage
                        ? noOptionsMessage + ', please define some'
                        : 'No options defined, please define some'
                }
            />
        </div>
    );
};

export default withStyles(styles, { withTheme: true })(FilteredSelect);
