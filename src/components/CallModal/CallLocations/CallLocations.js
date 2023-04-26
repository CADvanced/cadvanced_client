import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import keycode from 'keycode';
import Downshift from 'downshift';

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { ALL_LOCATIONS } from '../../../graphql/Locations/queries';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minHeight: theme.spacing.unit * 5
    },
    inputLabel: {
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    chip: {
        margin: theme.spacing.unit / 2
    },
    inputRoot: {
        flexWrap: 'wrap'
    }
});

const renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot
                },
                ...InputProps
            }}
            {...other}
        />
    );
};

class CallLocations extends Component {
    state = {
        inputValue: ''
    };

    renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex }) => {
        const isHighlighted = highlightedIndex === index;
        const isSelected =
            this.props.callLocations.findIndex(
                l => Number(l.id) === Number(suggestion.id)
            ) > -1;
        return (
            <MenuItem
                {...itemProps}
                key={suggestion.id}
                value={suggestion}
                selected={isHighlighted}
                component="div"
                disabled={isSelected}
            >
                {suggestion.name}
            </MenuItem>
        );
    };

    getSuggestions = (inputValue, allLocations) => {
        let count = 0;

        return allLocations.filter(suggestion => {
            const keep =
                (!inputValue ||
                    suggestion.name
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) !== -1) &&
                count < 5;

            if (keep) {
                count += 1;
            }

            return keep;
        });
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    handleKeyDown = event => {
        if (
            this.props.callLocations.length &&
            !this.state.inputValue.length &&
            keycode(event) === 'backspace'
        ) {
            const locationsCopy = [...this.props.callLocations];
            locationsCopy.splice(locationsCopy.length - 1, 1);
            this.props.handleUpdate('callLocations', locationsCopy);
        }
    };

    handleChange = (location, allLocations) => {
        let locationsCopy = [...this.props.callLocations];
        const added = allLocations.find(
            loc => Number(loc.id) === Number(location)
        );
        if (locationsCopy.indexOf(added) === -1) {
            locationsCopy.push(added);
            this.props.handleUpdate('callLocations', locationsCopy);
        }
        this.setState({
            inputValue: ''
        });
    };

    handleDelete = item => () => {
        const locationsCopy = [...this.props.callLocations];
        locationsCopy.splice(locationsCopy.indexOf(item), 1);
        this.props.handleUpdate('callLocations', locationsCopy);
    };

    render() {
        const { classes } = this.props;
        const { inputValue } = this.state;
        return (
            <React.Fragment>
                <Typography
                    variant={'caption'}
                    className={this.props.classes.inputLabel}
                >
                    Call locations
                </Typography>
                <Query query={ALL_LOCATIONS}>
                    {({ loading, error, data }) => {
                        if (loading) return <LoadingSpinner />;
                        if (error) return <p>Error</p>;
                        return (
                            <Downshift
                                inputValue={inputValue}
                                onChange={selection =>
                                    this.handleChange(
                                        selection,
                                        data.allLocations
                                    )
                                }
                                selectedLocations={this.props.callLocations}
                            >
                                {({
                                    getInputProps,
                                    getItemProps,
                                    isOpen,
                                    inputValue: inputValue2,
                                    selectedLocations: selectedLocations2,
                                    highlightedIndex
                                }) => (
                                    <div className={classes.container}>
                                        {renderInput({
                                            fullWidth: true,
                                            classes,
                                            InputProps: getInputProps({
                                                startAdornment: this.props.callLocations.map(
                                                    item => (
                                                        <Chip
                                                            color="secondary"
                                                            key={item.id}
                                                            tabIndex={-1}
                                                            label={item.name}
                                                            className={
                                                                classes.chip
                                                            }
                                                            onDelete={this.handleDelete(
                                                                item
                                                            )}
                                                        />
                                                    )
                                                ),
                                                onChange: this
                                                    .handleInputChange,
                                                onKeyDown: this.handleKeyDown,
                                                placeholder: 'Select locations',
                                                id:
                                                    'integration-downshift-multiple'
                                            })
                                        })}
                                        {isOpen ? (
                                            <Paper
                                                className={classes.paper}
                                                square
                                            >
                                                {this.getSuggestions(
                                                    inputValue2,
                                                    data.allLocations
                                                ).map((suggestion, index) =>
                                                    this.renderSuggestion({
                                                        suggestion,
                                                        index,
                                                        itemProps: getItemProps(
                                                            {
                                                                item:
                                                                    suggestion.id
                                                            }
                                                        ),
                                                        highlightedIndex
                                                    })
                                                )}
                                            </Paper>
                                        ) : null}
                                    </div>
                                )}
                            </Downshift>
                        );
                    }}
                </Query>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CallLocations);
