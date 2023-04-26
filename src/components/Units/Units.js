import React, { Component } from 'react';
import { Query, graphql, withApollo } from 'react-apollo';

import compose from 'lodash.flowright';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import UnitsToolbar from '../../components/UnitsToolbar/UnitsToolbar';
import Unit from '../../components/Unit/Unit';
import CreateUnitModal from '../../components/Unit/CreateUnitModal/CreateUnitModal';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ALL_UNITS, GET_UNIT } from '../../graphql/Units/queries';
import { DELETE_UNIT } from '../../graphql/Units/mutations';
import {
    UNIT_CALL_TOGGLE,
    CALL_DELETED,
    ALL_CALLS_DELETED,
    CALL_UPDATED
} from '../../graphql/Calls/subscriptions';
import {
    UNIT_ADDED,
    UNIT_DELETED,
    UNIT_UPDATED,
    UNIT_TYPE_UPDATED,
    UNIT_STATE_UPDATED
} from '../../graphql/Units/subscriptions';
import { USER_UNIT_ASSIGNED } from '../../graphql/Users/subscriptions';

const styles = theme => ({
    root: {
        width: '100%',
        maxHeight: '70vh',
        overflowY: 'auto'
    },
    unitGroupHeader: {
        fontFamily: '"Jura", sans-serif',
    },
    unitGroup: {
        background: theme.palette.primary.mid,
        fontWeight: 800,
        padding: '20px',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    unitGroupIcon: {
        flex: 1,
        textAlign: 'right',
        color: theme.palette.primary.light
    }
});

class Units extends Component {
    state = {
        createUnitModalOpen: false,
        activeUnit: null,
        activeVisible: true,
        inactiveVisible: true,
        sorting: 'name',
        filter: ''
    };

    // Following receipt of a subscription notifying us of
    // a unit change, update the cache
    updateUnit(update) {
        const { unitId } = update;
        // Grab the unit, which will update the cache
        this.props.client.query({
            query: GET_UNIT,
            variables: {
                unitId
            },
            // We don't want to use the cache for this fetch,
            // doing so causes us to just use the cache after the
            // first assignment is done
            fetchPolicy: 'network-only'
        });
    }

    // Update all units
    updateAllUnits() {
        // Grab all units, which will update the cache
        this.props.client.query({
            query: ALL_UNITS,
            // We don't want to use the cache for this fetch,
            // doing so causes us to just use the cache after the
            // first deletion
            fetchPolicy: 'network-only'
        });
    }

    deleteUnit = unit => {
        this.props.deleteUnit({ variables: { unitId: unit.id } });
    };

    openCreateUnitModal = unit => {
        const unitToPass = unit ? Number(unit.id) : -1;
        this.setState({ createUnitModalOpen: true, activeUnit: unitToPass });
    };

    closeCreateUnitModal = () => {
        this.setState({ createUnitModalOpen: false, activeUnit: null });
    };

    // Following receipt of a subscription, identify what happened
    // and act accordingly.
    componentDidUpdate() {
        const subs = {
            callDeleted: 'updateAllUnits',
            allCallsDeleted: 'updateAllUnits',
            callUpdated: 'updateAllUnits',
            unitDeleted: 'updateAllUnits',
            unitAdded: 'updateAllUnits',
            userUnitAssigned: 'updateAllUnits',
            unitCallToggle: 'updateUnit'
        };
        // Did a subscription trigger this update
        const subType = Object.keys(subs).find(sub => {
            return (
                this.props.hasOwnProperty(sub) &&
                this.props[sub].hasOwnProperty(sub) &&
                this.props[sub][sub]
            );
        });
        // Call the appropriate update method, passing the
        // subscription contents
        if (
            subType &&
            this.props.hasOwnProperty(subType) &&
            this.props[subType].hasOwnProperty(subType)
        ) {
            this[subs[subType]](this.props[subType][subType]);
        }
    }

    componentDidMount() {
        const activeInit = this.getVisibility('active');
        const inactiveInit = this.getVisibility('inactive');
        this.setState({ activeVisible: activeInit });
        this.setState({ inactiveVisible: inactiveInit });
    }

    getActive = units => {
        const active = units.filter(isActive => isActive.unitState.active);
        return this.doSorting(active);
    };

    getInactive = units => {
        const inactive = units.filter(
            isInactive => !isInactive.unitState.active
        );
        return this.doSorting(inactive);
    };

    getFiltered = units => {
        if (this.state.filter.length === 0) {
            return units.map(unit => this.getUnit(unit));
        }
        const filtered = units.filter(unit =>
            unit.callSign
                .toLowerCase()
                .includes(this.state.filter.toLowerCase())
        );
        return filtered.map(unit => this.getUnit(unit));
    };

    getUnit = unit => (
        <Unit
            edit={this.openCreateUnitModal}
            delete={this.deleteUnit}
            key={unit.id}
            unit={unit}
        />
    );

    toggleVisibility = type => {
        const prop = `${type}Visible`;
        const newState = !this.state[prop];
        this.setState({ [prop]: newState });
        document.cookie = `${prop}=${newState}`;
    };

    getCookies = () => {
        const cookies = {};
        document.cookie
            .split(';')
            .map(c => c.trim())
            .forEach(i => {
                const [k, v] = i.split('=');
                cookies[k] = v === 'true' ? true : v === 'false' ? false : v;
            });
        return cookies;
    };

    getVisibility = type => {
        const prop = `${type}Visible`;
        const cookies = this.getCookies();
        return cookies.hasOwnProperty(prop) ? cookies[prop] : true;
    };

    toggleSorting = () => {
        this.setState({
            sorting: this.state.sorting === 'name' ? 'edited' : 'name'
        });
    };

    doSorting = items => {
        if (this.state.sorting === 'name') {
            return items.sort((a, b) => {
                return (
                    /[A-Za-z]/.test(a.callSign) - /[A-Za-z]/.test(b.callSign) ||
                    (a.callSign.toUpperCase() < b.callSign.toUpperCase()
                        ? -1
                        : a.callSign.toUpperCase() > b.callSign.toUpperCase()
                            ? 1
                            : 0)
                );
            });
        } else {
            return items.sort((a, b) => {
                const aDate = Date.parse(a.updatedAt);
                const bDate = Date.parse(b.updatedAt);
                return bDate - aDate;
            });
        }
    };

    updateFilter = filter => {
        this.setState({ filter });
    };

    filterUnitsByDept = toFilter => !this.props.department.id || (toFilter.DepartmentId === this.props.department.id);

    render() {
        return (
            <React.Fragment>
                {this.state.activeUnit && (
                    <CreateUnitModal
                        activeUnit={this.state.activeUnit}
                        open={this.state.createUnitModalOpen}
                        saveHandler={this.modalSaveHander}
                        cancelHandler={this.closeCreateUnitModal}
                    />
                )}
                <UnitsToolbar
                    openCreateUnitModal={this.openCreateUnitModal}
                    toggleSorting={this.toggleSorting}
                    sorting={this.state.sorting}
                    updateFilter={this.updateFilter}
                />
                <div className={this.props.classes.root}>
                    <Query query={ALL_UNITS}>
                        {({ loading, error, data }) => {
                            if (!data) return null;
                            const inDepartment = data.allUnits.filter(this.filterUnitsByDept);
                            const active = this.getFiltered(
                                this.getActive(inDepartment)
                            );
                            const inactive = this.getFiltered(
                                this.getInactive(inDepartment)
                            );
                            if (loading) return <LoadingSpinner />;
                            if (error) return <p>Error</p>;
                            return (
                                <React.Fragment>
                                    <div
                                        className={this.props.classes.unitGroup}
                                    >
                                        <Typography variant="h6" className={this.props.classes.unitGroupHeader}>Active units</Typography>
                                        <div
                                            onClick={() =>
                                                this.toggleVisibility('active')
                                            }
                                            className={
                                                this.props.classes.unitGroupIcon
                                            }
                                        >
                                            {this.state.activeVisible ? (
                                                <VisibilityIcon
                                                    className={
                                                        this.props.classes
                                                            .unitGroupIcon
                                                    }
                                                />
                                            ) : (
                                                <VisibilityOffIcon
                                                    className={
                                                        this.props.classes
                                                            .unitGroupIcon
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {this.state.activeVisible && active}
                                    <div
                                        className={this.props.classes.unitGroup}
                                    >
                                        <Typography variant="h6" className={this.props.classes.unitGroupHeader}>Inactive units</Typography>
                                        <div
                                            onClick={() =>
                                                this.toggleVisibility(
                                                    'inactive'
                                                )
                                            }
                                            className={
                                                this.props.classes.unitGroupIcon
                                            }
                                        >
                                            {this.state.inactiveVisible ? (
                                                <VisibilityIcon
                                                    className={
                                                        this.props.classes
                                                            .unitGroupIcon
                                                    }
                                                />
                                            ) : (
                                                <VisibilityOffIcon
                                                    className={
                                                        this.props.classes
                                                            .unitGroupIcon
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                    {this.state.inactiveVisible && inactive}
                                </React.Fragment>
                            );
                        }}
                    </Query>
                </div>
            </React.Fragment>
        );
    }
}

export default compose(
    withApollo,
    withStyles(styles),
    graphql(UNIT_CALL_TOGGLE, { name: 'unitCallToggle' }),
    graphql(CALL_DELETED, { name: 'callDeleted' }),
    graphql(ALL_CALLS_DELETED, { name: 'allCallsDeleted' }),
    graphql(CALL_UPDATED, { name: 'callUpdated' }),
    graphql(UNIT_ADDED, { name: 'unitAdded' }),
    graphql(UNIT_UPDATED, { name: 'unitUpdated' }),
    graphql(UNIT_TYPE_UPDATED, { name: 'unitTypeUpdated' }),
    graphql(UNIT_STATE_UPDATED, { name: 'unitStateUpdated' }),
    graphql(DELETE_UNIT, { name: 'deleteUnit' }),
    graphql(UNIT_DELETED, { name: 'unitDeleted' }),
    graphql(USER_UNIT_ASSIGNED, { name: 'userUnitAssigned' })
)(Units);
