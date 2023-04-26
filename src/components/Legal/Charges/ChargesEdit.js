import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import { ALL_CHARGES } from '../../../graphql/Charges/queries';

const styles = theme => ({
    inputRoot: {
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing.unit / 2
    }
});

const renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput
                },
                ...InputProps
            }}
            {...other}
        />
    );
};

const Charges = ({ charges, updateCharges, classes }) => {
    const [allCharges, setAllCharges] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [locCharges, setLocCharges] = useState(charges);

    // Query to get all charges
    const { data: allChargesData } = useQuery(ALL_CHARGES);

    // When we receive the list of all possible charges
    // update our state
    useEffect(() => {
        if (allChargesData) {
            setAllCharges(allChargesData.allCharges);
        }
    }, [allChargesData]);

    useEffect(() => {
        updateCharges(locCharges);
    }, [locCharges]);

    const renderSuggestion = ({
        suggestion,
        index,
        itemProps,
        highlightedIndex
    }) => {
        const isHighlighted = highlightedIndex === index;
        const isSelected =
            locCharges.findIndex(c => Number(c.id) === Number(suggestion.id)) >
            -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.id}
                value={suggestion}
                selected={isHighlighted}
                component="div"
                style={{
                    opacity: isSelected ? 0.5 : 1
                }}
            >
                {suggestion.name}
            </MenuItem>
        );
    };

    const getSuggestions = value => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        return inputLength === 0
            ? []
            : allCharges.filter(suggestion => {
                const contains = suggestion.name.toLowerCase().includes(inputValue.toLowerCase());
                const keep = count < 5 && contains;
                if (keep) {
                    count += 1;
                }
                return keep;
            });
    };

    const handleKeyDown = event => {
        if (
            locCharges.length &&
            !inputValue.length &&
            event.key === 'Backspace'
        ) {
            const chargesCopy = [...locCharges];
            setLocCharges(chargesCopy.slice(0, chargesCopy.length - 1));
        }
    };

    const handleInputChange = event => {
        setInputValue(event.target.value);
    };

    const handleChange = item => {
        let newCharges = [...locCharges];
        const added = allCharges.find(chg => Number(chg.id) === Number(item));
        if (newCharges.indexOf(added) === -1) {
            newCharges = [...newCharges, added];
            setLocCharges(newCharges);
        }
        setInputValue('');
    };

    const handleDelete = item => () => {
        const newLocCharges = [...locCharges];
        newLocCharges.splice(newLocCharges.indexOf(item), 1);
        setLocCharges(newLocCharges);
    };

    return (
        <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={handleChange}
            selectedCharges={locCharges}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                isOpen,
                inputValue: inputValue2,
                selectedCharges: selectedCharges2,
                highlightedIndex
            }) => {
                const {
                    onBlur,
                    onChange,
                    onFocus,
                    ...inputProps
                } = getInputProps({
                    onKeyDown: handleKeyDown,
                    placeholder: 'Enter charges'
                });

                return (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            label: 'Charges',
                            InputLabelProps: getLabelProps(),
                            InputProps: {
                                startAdornment: locCharges.map(item => (
                                    <Chip
                                        color="secondary"
                                        key={item.id}
                                        tabIndex={-1}
                                        label={item.name}
                                        className={classes.chip}
                                        onDelete={handleDelete(item)}
                                    />
                                )),
                                onBlur,
                                onChange: event => {
                                    handleInputChange(event);
                                    onChange(event);
                                },
                                onFocus
                            },
                            inputProps
                        })}

                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2).map(
                                    (suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({
                                                item: suggestion.id
                                            }),
                                            highlightedIndex
                                        })
                                )}
                            </Paper>
                        ) : null}
                    </div>
                );
            }}
        </Downshift>
    );
};

export default withStyles(styles)(Charges);
