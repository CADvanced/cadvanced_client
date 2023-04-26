import React, { Component } from 'react';
import { Query, graphql, withApollo } from 'react-apollo';

import compose from 'lodash.flowright';
import { Howl } from 'howler';

import { withStyles } from '@material-ui/core/styles';

import withSnacks from '../../hoc/withSnacks';
import CallModal from '../../components/CallModal/CallModal';
import CallsToolbar from '../../components/CallsToolbar/CallsToolbar';
import Call from '../../components/Call/Call';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { ALL_CALLS, GET_CALL } from '../../graphql/Calls/queries';
import { DELETE_CALL } from '../../graphql/Calls/mutations';
import {
    CALL_ADDED,
    CALL_UPDATED,
    CALL_DELETED,
    ALL_CALLS_DELETED,
    UNIT_CALL_TOGGLE
} from '../../graphql/Calls/subscriptions';

const styles = theme => ({
    root: {
        width: '100%',
        maxHeight: '70vh',
        overflow: 'auto'
    }
});

class Calls extends Component {
    state = {
        callModalOpen: false,
        activeCall: null
    };

    // Get a call, thereby refreshing the cache
    getCall(callId) {
        this.props.client.query({
            query: GET_CALL,
            variables: {
                callId
            },
            // We don't want to use the cache for this fetch,
            // doing so causes us to just use the cache after the
            // first assignment is done
            fetchPolicy: 'network-only'
        });
    }

    // Following receipt of a subscription notifying us of
    // a unit assign/divest, update the cache
    updateAssigned(update) {
        const { callId } = update;
        this.props.sendMessage('Call / Unit assignment updated');
        // Grab the call, which will update the cache
        this.getCall(callId);
    }

    // Following receipt of a subscription notifying us of
    // a unit assign/divest, update the cache
    updateCall(update) {
        const { id } = update;
        this.props.sendMessage('Call updated');
        // Grab the call, which will update the cache
        this.getCall(id);
    }

    // Following receipt of a subscription notifying us of a call
    // having been deleted, find it and remove it
    removeCall() {
        this.props.client.query({
            query: ALL_CALLS,
            // We don't want to use the cache for this fetch,
            // doing so causes us to just use the cache after the
            // first deletion is done
            fetchPolicy: 'network-only'
        });
    }

    playNotification() {
        const sound = new Howl({
            src: ['/sounds/call_notify.ogg']
        });
        sound.play();
    }

    // Following receipt of a subscription, identify what happened
    // and act accordingly.
    componentDidUpdate(prevProps) {
        // Did a subscription trigger this update
        if (
            this.props.hasOwnProperty('unitCallToggle') ||
            this.props.hasOwnProperty('callDeleted') ||
            this.props.hasOwnProperty('allCallsDeleted') ||
            this.props.hasOwnProperty('callUpdated')
        ) {
            if (
                this.props.callDeleted.hasOwnProperty('callDeleted') &&
                this.props.callDeleted.callDeleted !==
                prevProps.callDeleted.callDeleted
            ) {
                this.removeCall();
            } else if (
                this.props.allCallsDeleted.hasOwnProperty('allCallsDeleted')
            ) {
                this.removeCall();
            } else if (
                this.props.unitCallToggle.hasOwnProperty('unitCallToggle') &&
                this.props.unitCallToggle.unitCallToggle !==
                prevProps.unitCallToggle.unitCallToggle
            ) {
                this.updateAssigned(this.props.unitCallToggle.unitCallToggle);
            } else if (
                this.props.callUpdated.hasOwnProperty('callUpdated') &&
                this.props.callUpdated.callUpdated !==
                prevProps.callUpdated.callUpdated
            ) {
                this.updateCall(this.props.callUpdated.callUpdated);
            }
        }
    }

    componentDidMount() {
        this.subscribeToNewCalls();
    }

    deleteCall = call => {
        this.props.deleteCall({ variables: { callId: call.id } });
    };

    modalOpenHandler = call => {
        const callToPass = call ? Number(call.id) : -1;
        this.setState({ activeCall: callToPass, callModalOpen: true });
    };

    modalCloseHandler = refetch => {
        this.setState({
            callModalOpen: false,
            activeCall: null
        });
    };

    closeModal = () => {
        this.setState({
            callModalOpen: false
        });
    };

    filterByDept = toFilter => {
        return !this.props.department.id || (toFilter.DepartmentId === this.props.department.id);
    }

    render() {
        const callModal = !this.state.activeCall ? null : (
            <CallModal
                activeCall={this.state.activeCall}
                open={this.state.callModalOpen}
                saveHandler={this.modalSaveHandler}
                cancelHandler={this.modalCloseHandler}
            />
        );
        return (
            <React.Fragment>
                {callModal}
                <CallsToolbar openCallModal={this.modalOpenHandler} />
                <div className={this.props.classes.root}>
                    <Query query={ALL_CALLS}>
                        {({ subscribeToMore, data, loading, error }) => {
                            this.subscribeToNewCalls = () => {
                                subscribeToMore({
                                    document: CALL_ADDED,
                                    updateQuery: (
                                        prev,
                                        { subscriptionData }
                                    ) => {
                                        if (!subscriptionData.data) return prev;
                                        const newCall =
                                            subscriptionData.data.callAdded;
                                        if (
                                            newCall.callType.code ===
                                            'CITIZEN_CALL'
                                        ) {
                                            this.props.sendMessage(
                                                'CITIZEN SUBMITTED NEW CALL'
                                            );
                                            this.playNotification();
                                        }
                                        return Object.assign({}, prev, {
                                            allCalls: [
                                                ...prev.allCalls,
                                                newCall
                                            ]
                                        });
                                    }
                                });
                            };
                            if (loading) return <LoadingSpinner />;
                            if (error) return <p>Error</p>;
                            const sorted = [...data.allCalls];
                            return sorted
                                .filter(this.filterByDept)
                                .sort((a, b) => b.id - a.id)
                                .map(call => (
                                    <Call
                                        setHighlightedCall={
                                            this.props.setHighlightedCall
                                        }
                                        edit={this.modalOpenHandler}
                                        delete={this.deleteCall}
                                        key={call.id}
                                        callData={call}
                                    />
                                ));
                        }}
                    </Query>
                </div>
            </React.Fragment>
        );
    }
}

export default compose(
    withSnacks,
    withApollo,
    withStyles(styles),
    graphql(DELETE_CALL, { name: 'deleteCall' }),
    graphql(UNIT_CALL_TOGGLE, { name: 'unitCallToggle' }),
    graphql(CALL_DELETED, { name: 'callDeleted' }),
    graphql(ALL_CALLS_DELETED, { name: 'allCallsDeleted' }),
    graphql(CALL_UPDATED, { name: 'callUpdated' })
)(Calls);
