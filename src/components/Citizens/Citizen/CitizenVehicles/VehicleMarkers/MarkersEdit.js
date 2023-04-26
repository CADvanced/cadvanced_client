import React from 'react';
import { Query, graphql } from 'react-apollo';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import compose from 'lodash.flowright';

import LoadingSpinner from '../../../../LoadingSpinner/LoadingSpinner';
import { ALL_VEHICLE_MARKERS } from '../../../../../graphql/Markers/queries';
import {
    ATTACH_MARKER_TO_VEHICLE,
    DETACH_MARKER_FROM_VEHICLE
} from '../../../../../graphql/Vehicles/mutations';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250
    },
    container: {
        flexGrow: 1,
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    inputRoot: {
        flexWrap: 'wrap'
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1
    }
});

function renderInput(inputProps) {
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
}

class MarkersEdit extends React.Component {
    state = {
        allMarkers: [],
        vehiclesMarkers: [],
        inputValue: '',
        selectedItem: []
    };

    renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex }) => {
        const isHighlighted = highlightedIndex === index;
        const isSelected =
            this.props.markers.findIndex(
                m => Number(m.id) === Number(suggestion.id)
            ) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.name}
                value={suggestion}
                selected={isHighlighted}
                component="div"
                disabled={isSelected}
            >
                {suggestion.name}
            </MenuItem>
        );
    };

    getSuggestions = (value, suggestions) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : suggestions.filter(suggestion => {
                  const keep =
                      count < 5 &&
                      suggestion.name.slice(0, inputLength).toLowerCase() ===
                          inputValue;

                  if (keep) {
                      count += 1;
                  }

                  return keep;
              });
    };

    handleKeyDown = event => {
        const { inputValue, selectedItem } = this.state;
        if (
            selectedItem.length &&
            !inputValue.length &&
            event.key === 'Backspace'
        ) {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1)
            });
        }
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    handleChange = item => {
        this.props.attach({
            variables: {
                VehicleId: this.props.vehicle.id,
                MarkerId: item
            }
        });
        this.setState({ inputValue: '' });
    };

    handleDelete = item => () => {
        this.props.detach({
            variables: {
                VehicleId: this.props.vehicle.id,
                MarkerId: item.id
            }
        });
        this.setState(state => {
            const selectedItem = [...state.selectedItem];
            selectedItem.splice(selectedItem.indexOf(item), 1);
            return { selectedItem };
        });
    };

    render() {
        const { classes } = this.props;
        const { inputValue, selectedItem } = this.state;
        return (
            <Query query={ALL_VEHICLE_MARKERS}>
                {({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner />;
                    if (error) return <p>Error</p>;
                    return (
                        <Downshift
                            inputValue={inputValue}
                            onChange={this.handleChange}
                            selectedItem={selectedItem}
                        >
                            {({
                                getInputProps,
                                getItemProps,
                                isOpen,
                                inputValue: inputValue2,
                                selectedItem: selectedItem2,
                                highlightedIndex
                            }) => (
                                <div className={classes.container}>
                                    {renderInput({
                                        fullWidth: true,
                                        classes,
                                        InputProps: getInputProps({
                                            startAdornment: this.props.markers.map(
                                                item => (
                                                    <Chip
                                                        color="secondary"
                                                        key={item.id}
                                                        tabIndex={-1}
                                                        label={item.name}
                                                        className={classes.chip}
                                                        onDelete={this.handleDelete(
                                                            item
                                                        )}
                                                    />
                                                )
                                            ),
                                            onChange: this.handleInputChange,
                                            onKeyDown: this.handleKeyDown,
                                            placeholder: 'Select markers'
                                        })
                                    })}
                                    {isOpen ? (
                                        <React.Fragment>
                                            {this.getSuggestions(
                                                inputValue2,
                                                data.allVehicleMarkers
                                            ).map((suggestion, index) =>
                                                this.renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({
                                                        item: suggestion.id
                                                    }),
                                                    highlightedIndex,
                                                    selectedItem: selectedItem2
                                                })
                                            )}
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            )}
                        </Downshift>
                    );
                }}
            </Query>
        );
    }
}

export default compose(
    graphql(ATTACH_MARKER_TO_VEHICLE, { name: 'attach' }),
    graphql(DETACH_MARKER_FROM_VEHICLE, { name: 'detach' }),
    withStyles(styles)
)(MarkersEdit);
