import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { SketchPicker } from 'react-color';

import keycode from 'keycode';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import IconButton from '@material-ui/core/IconButton';
import Save from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import withSnacks from '../../../../../hoc/withSnacks';

const styles = theme => ({
    root: {
        width: '100%'
    },
    activeBadgeRoot: {
        marginRight: '30px',
        cursor: 'pointer'
    },
    activeBadgeText: {
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '800'
    },
    activeBadge: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    editing: {
        backgroundColor: theme.palette.primary.mid
    },
    inputRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4
    },
    clickaway: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
    },
    colourPicker: {
        position: 'absolute',
        bottom: '20px',
        zIndex: '9999'
    }
});

class EditableUnitStates extends Component {
    state = {
        displayColourPicker: false,
        editing: 0,
        name: '',
        colour: '#000000',
        active: true
    };
    componentDidUpdate(prevProps) {
        if (this.props.apiError && !prevProps.apiError) {
            this.props.sendMessage(
                'The operation failed. You may be trying to delete something that is in use.'
            );
        }
    }
    setColourPicker = state => {
        this.setState({
            displayColourPicker: state
        });
    };
    changeColour = (obj, event) => {
        event.stopPropagation();
        this.setState({
            colour: obj.hex
        });
    };
    handleName = event => {
        this.setState({
            name: event.target.value
        });
    };
    setEditing = item => {
        this.setState({
            editing: item.id,
            name: item.name,
            colour: item.colour,
            active: item.active
        });
    };
    handleKeyDown = event => {
        if (keycode(event) === 'enter') {
            this.enterButton.click();
        }
    };
    enterClick = e => {
        this.enterButton = e;
    };
    render() {
        const MUTATION =
            this.state.editing === 0
                ? this.props.mutations.CREATE
                : this.props.mutations.UPDATE;
        let variables = {
            name: this.state.name,
            colour: this.state.colour,
            active: this.state.active
        };
        if (this.state.editing !== 0) {
            variables.id = this.state.editing;
        }
        let allData = [];
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

        // Filter by DepartmentId if necessary
        if (this.props.department) {
            allData = allData.filter(row => row.DepartmentId === this.props.department);
        }
        return (
            <div className={this.props.classes.root}>
                <List className={this.props.classes.list}>
                    {allData.map(item => {
                        return (
                            <ListItem
                                className={
                                    this.state.editing === item.id
                                        ? this.props.classes.editing
                                        : ''
                                }
                                key={item.id}
                            >
                                <ListItemIcon>
                                    <FiberManualRecord
                                        style={{ color: '#' + item.colour }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <Mutation mutation={this.props.mutations.UPDATE}>
                                        {mut => (
                                            <Badge
                                                onClick={() => mut({
                                                    variables: { ...item, active: !item.active }
                                                })}
                                                classes={{
                                                    badge: this.props.classes.activeBadge,
                                                    root: this.props.classes.activeBadgeRoot,
                                                    colorSecondary: this.props.classes.activeBadgeText
                                                }}
                                                badgeContent={item.active ? 'ACTIVE' : 'INACTIVE'}
                                                color={item.active ? 'secondary' : 'error'}
                                            ><span></span></Badge>
                                        )}
                                    </Mutation>
                                    <IconButton
                                        onClick={() => {
                                            this.setEditing(item);
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
                                                    name: item.name,
                                                    colour: item.colour
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
                        );
                    })}
                </List>
                <Paper className={this.props.classes.inputRoot} elevation={1}>
                    <IconButton
                        onClick={() => this.setColourPicker(true)}
                        className={this.props.classes.iconButton}
                        aria-label="Colour"
                    >
                        <FiberManualRecord
                            style={{ color: this.state.colour }}
                        />
                    </IconButton>
                    {this.state.displayColourPicker && (
                        <React.Fragment>
                            <SketchPicker
                                className={this.props.classes.colourPicker}
                                color={this.state.colour}
                                onChange={this.changeColour}
                                disableAlpha
                            />
                            <div
                                onClick={() => this.setColourPicker(false)}
                                className={this.props.classes.clickaway}
                            />
                        </React.Fragment>
                    )}
                    <Divider
                        color={this.state.colour}
                        className={this.props.classes.divider}
                    />
                    <InputBase
                        className={this.props.classes.input}
                        placeholder="Unit state"
                        label="Unit state"
                        value={this.state.name}
                        onChange={this.handleName}
                        onKeyDown={this.handleKeyDown}
                    />
                    <Divider className={this.props.classes.divider} />
                    <Mutation mutation={MUTATION}>
                        {mut => (
                            <IconButton
                                buttonRef={this.enterClick}
                                onClick={() => {
                                    if (
                                        variables.name &&
                                        variables.name.length > 0
                                    ) {
                                        const apiColour = variables.colour.replace(
                                            /^#/,
                                            ''
                                        );
                                        variables = {
                                            ...variables,
                                            colour: apiColour
                                        };
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
                                            name: '',
                                            colour: '#000000'
                                        });
                                    }
                                }}
                                color="secondary"
                                className={this.props.classes.iconButton}
                                aria-label="Save"
                            >
                                <Save />
                            </IconButton>
                        )}
                    </Mutation>
                </Paper>
            </div>
        );
    }
}
export default withSnacks(withStyles(styles)(EditableUnitStates));
