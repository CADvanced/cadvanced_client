import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import compose from 'lodash.flowright';

import keycode from 'keycode';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Save from '@material-ui/icons/Save';

import withSnacks from '../../hoc/withSnacks';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    editing: {
        backgroundColor: theme.palette.primary.mid
    }
});

class EditableItems extends Component {
    state = {
        editing: 0,
        value: ''
    };
    componentDidUpdate(prevProps) {
        if (this.props.apiError && !prevProps.apiError) {
            this.props.sendMessage(
                'The operation failed. You may be trying to delete something that is in use.'
            );
        }
    }
    handleMove = (item, direction) => {
        if (direction === 'up' && item.position > 0) {
            item.position--;
        } else if (
            direction === 'down' &&
            item.position < this.props.allData.length - 1
        ) {
            item.position++;
        }
        this.props.client.mutate({
            mutation: this.props.mutations.UPDATE,
            variables: item
        });
    };
    handleChange = event => {
        this.setState({ value: event.target.value });
    };
    handleKeyDown = event => {
        if (keycode(event) === 'enter') {
            this.enterButton.click();
        }
    };
    setEditing = (editing, value) => {
        this.setState({
            editing,
            value
        });
    };
    enterClick = e => {
        this.enterButton = e;
    };

    render() {
        const MUTATION =
            this.state.editing === 0
                ? this.props.mutations.CREATE
                : this.props.mutations.UPDATE;
        const valProp = this.props.valProp ? this.props.valProp : 'name';
        let variables = {
            [valProp]: this.state.value
        };
        if (this.state.editing !== 0) {
            variables.id = this.state.editing;
        }
        if (this.props.alwaysPass) {
            variables = {
                ...variables,
                ...this.props.alwaysPass
            };
        }
        let allData = [];
        let reordering = false;
        if (
            this.props.allData.length > 0 &&
            this.props.allData[0].hasOwnProperty('position')
        ) {
            allData = this.props.allData.sort(
                (a, b) => a.position - b.position
            );
            reordering = true;
        } else {
            // Sort the values if necessary
            if (
                this.props.alphaSort &&
                this.props.allData.length > 0 &&
                this.props.allData[0].hasOwnProperty(this.props.alphaSort)
            ) {
                allData = this.props.allData.sort((a, b) => {
                    if (a[this.props.alphaSort] < b[this.props.alphaSort]) {
                        return -1;
                    }
                    if (a[this.props.alphaSort] > b[this.props.alphaSort]) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                allData = this.props.allData;
            }
        }

        // Filter by DepartmentId if necessary
        if (this.props.department) {
            allData = allData.filter(row => row.DepartmentId === this.props.department);
        }
        return (
            <React.Fragment>
                <List>
                    {allData.map((item, index) => (
                        <ListItem
                            className={
                                this.state.editing === item.id
                                    ? this.props.classes.editing
                                    : ''
                            }
                            key={item.id}
                        >
                            {reordering && (
                                <React.Fragment>
                                    <IconButton
                                        onClick={() =>
                                            this.handleMove(item, 'up')
                                        }
                                        disabled={index === 0}
                                        aria-label="Move item up"
                                    >
                                        <ArrowUpward />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            this.handleMove(item, 'down')
                                        }
                                        disabled={index === allData.length - 1}
                                        aria-label="Move item down"
                                    >
                                        <ArrowDownward />
                                    </IconButton>
                                </React.Fragment>
                            )}
                            <ListItemText primary={item[valProp]} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => {
                                        this.setEditing(item.id, item[valProp]);
                                    }}
                                    aria-label="Edit"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    disabled={item.readonly}
                                    onClick={() => {
                                        this.props.deleteItem({
                                            variables: {
                                                id: item.id,
                                                [valProp]: item[valProp]
                                            }
                                        });
                                    }}
                                    color="secondary"
                                    aria-label="Delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <div className={this.props.classes.container}>
                    <Mutation mutation={MUTATION}>
                        {mut => (
                            <TextField
                                onChange={this.handleChange}
                                value={this.state.value}
                                label={this.props.label}
                                placeholder={this.props.label}
                                className={this.props.classes.textField}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                buttonRef={this.enterClick}
                                                onClick={() => {
                                                    if (
                                                        variables[valProp] &&
                                                        variables[valProp]
                                                            .length > 0
                                                    ) {
                                                        // Add a department id if necessary
                                                        if (this.props.department) {
                                                            variables = {
                                                                ...variables,
                                                                DepartmentId: this.props.department
                                                            };
                                                        }
                                                        mut({
                                                            variables
                                                        });
                                                        this.setState({
                                                            editing: 0,
                                                            value: ''
                                                        });
                                                    }
                                                }}
                                                title="Save"
                                                aria-label="Save"
                                            >
                                                <Save
                                                    color="secondary"
                                                    fontSize="small"
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    onKeyDown: this.handleKeyDown
                                }}
                            />
                        )}
                    </Mutation>
                </div>
            </React.Fragment>
        );
    }
}
export default compose(withSnacks, withStyles(styles))(EditableItems);
