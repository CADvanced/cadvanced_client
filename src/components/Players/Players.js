import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

import compose from 'lodash.flowright';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import withSnacks from '../../hoc/withSnacks';
import withUserLocations from '../../hoc/withUserLocations';
import UserUnitsModal from '../../components/User/UserUnitsModal';
import { getCharacterName } from '../../lib/Misc';
import withContext from '../../hoc/ContextConsumer';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: '5%',
        transform: 'translate(-50%, 0)',
        left: '50%',
        width: '80%',
        borderRadius: '5px',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    avatar: {
        margin: theme.spacing.unit * 0.6,
        height: 32,
        width: 32
    },
    label: {
        paddingLeft: 0,
        paddingRight: 0
    },
    playerList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    noActive: {
        padding: theme.spacing.unit
    },
    chip: {
        margin: theme.spacing.unit * 0.6
    }
});

class Players extends Component {
    state = {
        editingUser: null,
        userModalOpen: false,
        filterText: '',
        expanded: 'none',
        allActiveOfficers: []
    };

    openUserModal = user => {
        this.setState({
            editingUser: user,
            userModalOpen: true
        });
    };

    closeUserModal = () => {
        this.setState({
            editingUser: null,
            userModalOpen: false
        });
    };

    populateActive = passedUsers => {
        const passedToKeep = passedUsers
            .filter(ptk => ptk.character && ptk.character.__typename === 'Officer'
                ? true
                : false
            )
            // Only display officers appropriate to the dispatcher's
            // selected department (of which there might not be one)
            .filter(loc => !this.props.department.id || (loc.character && loc.character.DepartmentId === this.props.department.id));
        this.setState({ allActiveOfficers: passedToKeep });
    };

    componentDidMount() {
        if (
            this.props.hasOwnProperty('allUserLocations') &&
            this.props.allUserLocations
        ) {
            this.populateActive(this.props.allUserLocations);
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.hasOwnProperty('allUserLocations') &&
            this.props.allUserLocations !== prevProps.allUserLocations
        ) {
            this.populateActive(this.props.allUserLocations);
        }
    }

    getPlayer = player => {
        if (
            this.state.expanded === player.id ||
            this.state.expanded === 'all'
        ) {
            return (
                <Chip
                    key={player.id}
                    avatar={
                        <Avatar
                            alt={
                                getCharacterName(player) +
                                (player.alias ? ' (' + player.alias + ')' : '')
                            }
                            src={player.avatarUrl}
                        />
                    }
                    label={
                        getCharacterName(player) +
                        (player.alias ? ' (' + player.alias + ')' : '')
                    }
                    onClick={() => this.openUserModal(player)}
                    className={this.props.classes.chip}
                />
            );
        } else {
            return (
                <div
                    onMouseEnter={() => this.setExpanded(player.id)}
                    onMouseLeave={() => this.setExpanded(null)}
                    key={player.id}
                    alt={
                        player.character.firstname +
                        ' ' +
                        player.character.lastName
                    }
                    className={this.props.classes.avatar}
                    style={{ border: `2px solid #${player.character.department.colour}` }}
                >
                    <img src={player.avatarUrl} />
                </div>
            );
        }
    };

    setExpanded = id => {
        if (id && this.state.expanded !== 'all') {
            this.setState({
                ...this.state,
                expanded: id
            });
        } else {
        }
    };

    handleUpdate = (prop, value) => {
        this.setState(
            {
                ...this.state,
                [prop]: value
            },
            () => {
                if (prop === 'filterText') {
                    if (this.state.filterText.length > 0) {
                        this.setState({
                            ...this.state,
                            expanded: 'all'
                        });
                    } else {
                        this.setState({
                            ...this.state,
                            expanded: 'none'
                        });
                    }
                }
            }
        );
    };

    getPlayers = () => {
        let filteredUsers = [];
        if (this.state.filterText.length > 0) {
            filteredUsers = this.state.allActiveOfficers.filter(user => {
                const str = `${user.character.firstName} ${user.character.lastName} + ${user.alias}`;
                return str.toLowerCase().includes(this.state.filterText.toLowerCase());
            });
        } else {
            filteredUsers = this.state.allActiveOfficers;
        }
        return filteredUsers.map(player => {
            return this.getPlayer(player);
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.userModalOpen && (
                    <UserUnitsModal
                        user={this.state.editingUser}
                        open={this.state.userModalOpen}
                        close={this.closeUserModal}
                    />
                )}
                <div className={this.props.classes.root}>
                    <div className={this.props.classes.playerList}>
                        {this.state.allActiveOfficers.length > 0 &&
                            this.getPlayers()}
                        {this.state.allActiveOfficers.length === 0 && (
                            <div className={this.props.classes.noActive}>
                                No active officers
                            </div>
                        )}
                    </div>
                    {this.state.allActiveOfficers.length > 1 && (
                        <div className={this.props.classes.textContainer}>
                            <TextField
                                value={this.state.filterText}
                                onChange={event =>
                                    this.handleUpdate(
                                        'filterText',
                                        event.target.value
                                    )
                                }
                                id="player-filter"
                                label="Filter players"
                                placeholder="Filter players"
                                className={this.props.classes.textField}
                                margin="normal"
                            />
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default compose(
    withContext,
    withSnacks,
    withUserLocations,
    withApollo,
    withStyles(styles)
)(Players);
