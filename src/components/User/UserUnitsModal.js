import React, { Component } from 'react';

import { Query, Mutation, graphql, withApollo } from 'react-apollo';

import compose from 'lodash.flowright';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { ALL_USER_RANKS } from '../../graphql/Users/queries';
import { UPDATE_USER_ASSIGNMENTS } from '../../graphql/Users/mutations';
import { USER_UNIT_ASSIGNED } from '../../graphql/Users/subscriptions';
import withUserUnits from '../../hoc/withUserUnits';
import UserUnitAssign from './UserUnitAssign';
import withSnacks from '../../hoc/withSnacks';
import { getCharacterName } from '../../lib/Misc';

const styles = theme => ({
    rankDropdown: {
        textAlign: 'right'
    },
    overflow: {
        overflow: 'visible'
    }
});

class UserUnitsModal extends Component {
    state = {
        assignments: [],
        defaultUserRank: null
    };
    componentDidMount() {
        if (
            this.props.hasOwnProperty('allUserUnits') &&
            this.props.allUserUnits
        ) {
            this.populateAssignments();
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if (
                this.props.hasOwnProperty('allUserUnits') &&
                this.props.allUserUnits
            ) {
                this.populateAssignments();
            }
            if (
                this.props.hasOwnProperty('allUserRanks') &&
                this.props.allUserRanks &&
                this.props.allUserRanks.hasOwnProperty('allUserRanks')
            ) {
                this.setDefaultRank();
            }
            if (this.props.hasOwnProperty('userUnitAssigned')) {
                if (
                    this.props.userUnitAssigned.hasOwnProperty(
                        'userUnitAssigned'
                    )
                ) {
                    this.props.updateUserUnits();
                }
            }
        }
    }
    setDefaultRank = () => {
        if (
            this.props.hasOwnProperty('allUserRanks') &&
            this.props.allUserRanks.length > 0
        ) {
            this.setState({
                defaultUserRank: this.props.allUserRanks.allUserRanks[0].id
            });
        }
    };
    populateAssignments = () => {
        let assignments = [];
        this.props.allUserUnits.forEach(userUnit => {
            if (userUnit.UserId === this.props.user.id) {
                assignments.push({
                    unitId: userUnit.UnitId,
                    rankId: userUnit.UserRankId
                });
            }
        });
        this.setState({ assignments }, () => this.saveDisabled());
    };
    saveDisabled = () => {
        const invalid = this.state.assignments.filter(ass => ass.rankId === 0);
        return invalid.length > 0 ? true : false;
    };

    toggleAssignment = unit => {
        let final = this.state.assignments;
        const idx = this.state.assignments.findIndex(
            assgn => assgn.unitId === unit.id
        );
        if (idx > -1) {
            final.splice(idx, 1);
        } else {
            final.push({ unitId: unit.id, rankId: 0 });
        }
        this.setState({ assignments: final }, () => this.saveDisabled());
    };

    /// INITIAL MODAL POPULATION SEEMS BORKED

    setRank = (unit, rankId) => {
        let final = this.state.assignments;
        const idx = this.state.assignments.findIndex(
            assgn => assgn.unitId === unit.id
        );
        if (idx > -1) {
            final[idx] = { unitId: unit.id, rankId: rankId };
        } else {
            final.push({ unitId: unit.id, rankId: rankId });
        }
        this.setState({ assignments: final }, () => this.saveDisabled());
    };
    save = mutation => {
        const assignments = this.state.assignments.map(assg => {
            if (assg.rankId && assg.rankId > 0) {
                return {
                    UserId: this.props.user.id,
                    UnitId: assg.unitId,
                    UserRankId: assg.rankId
                };
            } else {
                return {
                    UserId: this.props.user.id,
                    UnitId: assg.unitId,
                    UserRankId: this.state.defaultUserRank
                };
            }
        });
        mutation({
            variables: { assignments, userId: this.props.user.id }
        })
            .then(() => {
                this.props.close();
            })
            .catch(err =>
                this.props.sendMessage(
                    err.message.replace(/^GraphQL error:/, '')
                )
            );
    };
    render() {
        const dept = (this.props.user.character && this.props.user.character.department) ?
            this.props.user.character.department :
            null;
        return (
            <Dialog
                classes={{ paperScrollPaper: this.props.classes.overflow }}
                scroll="paper"
                open={this.props.open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="userunits-modal-title"
                fullWidth
            >
                <DialogTitle id="userunits-modal-title">
                    Assign {getCharacterName(this.props.user)}
                    {dept && (
                        <span style={{ marginLeft: '1em', color: `#${dept.colour || 'inherit'}` }}>
                            [ {dept.name} ]
                        </span>
                    )}
                </DialogTitle>
                <DialogContent className={this.props.classes.overflow}>
                    <UserUnitAssign
                        classes={this.props.classes}
                        toggleAssignment={this.toggleAssignment}
                        setRank={this.setRank}
                        assignments={this.state.assignments}
                        department={dept}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close}>
                        Cancel
                    </Button>
                    <Mutation mutation={UPDATE_USER_ASSIGNMENTS}>
                        {(mut, { loading, error }) => {
                            return (
                                <Button
                                    disabled={this.saveDisabled()}
                                    onClick={() => this.save(mut)}
                                >
                                    {loading ? 'Saving' : 'Save'}
                                </Button>
                            );
                        }}
                    </Mutation>
                </DialogActions>
            </Dialog>
        );
    }
}

export default compose(
    withSnacks,
    withApollo,
    withUserUnits,
    withStyles(styles),
    graphql(USER_UNIT_ASSIGNED, { name: 'userUnitAssigned' }),
    graphql(ALL_USER_RANKS, { name: 'allUserRanks' })
)(UserUnitsModal);
