import React, { Component } from 'react';
import { graphql, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import compose from 'lodash.flowright';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';

import CallerInfo from './CallerInfo/CallerInfo';
import CallGrade from './CallGrade/CallGrade';
import CallType from './CallType/CallType';
import CallDescriptions from './CallDescriptions/CallDescriptions';
import CallIncidents from './CallIncidents/CallIncidents';
import CallLocations from './CallLocations/CallLocations';
import DepartmentsDropdown from '../../lib/DepartmentsDropdown';

import { GET_CALL } from '../../graphql/Calls/queries';
import { CREATE_CALL, UPDATE_CALL } from '../../graphql/Calls/mutations';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formRow: {
        marginTop: `${theme.spacing.unit}px`,
        marginBottom: `${theme.spacing.unit}px`
    }
});

class CallModal extends Component {
    state = {
        valid: false,
        call: {
            id: null,
            callerInfo: '',
            callGrade: {},
            callType: {},
            callLocations: [],
            callIncidents: [],
            callDescriptions: []
        }
    };

    propUpdateHandler = (changedProp, val) => {
        this.setState(
            {
                call: {
                    ...this.state.call,
                    [changedProp]: val
                }
            },
            () => this.validate()
        );
    };

    validate = () => {
        if (
            this.state.call.callerInfo.length > 0 &&
            Object.keys(this.state.call.callGrade).length > 0 &&
            Object.keys(this.state.call.callType).length > 0 &&
            this.state.call.callLocations.length > 0 &&
            this.state.call.callIncidents.length > 0 &&
            this.state.call.callDescriptions.length > 0 &&
            this.state.call.DepartmentId.length > 0
        ) {
            this.setState({
                valid: true
            });
        } else {
            this.setState({
                valid: false
            });
        }
    };

    componentDidMount() {
        // Catch the case where we already have the call and are opening
        // the modal
        if (!this.props.data.loading && this.props.data.getCall) {
            this.setState({ call: { ...this.props.data.getCall } }, () =>
                this.validate()
            );
        }
        // Populate our department ID if possible
        if (this.props.match.params.deptId) {
            this.propUpdateHandler('DepartmentId', this.props.match.params.deptId);
        }
    }

    componentDidUpdate(prevProps) {
        // Catch the case where the modal opened before the call populated
        // from the API
        if (prevProps.data.getCall !== this.props.data.getCall) {
            if (!this.props.data.loading && this.props.data.getCall) {
                this.setState({ call: { ...this.props.data.getCall } }, () =>
                    this.validate()
                );
            }
        }
    }

    saveClose(mutation) {
        mutation().then(() => {
            this.props.cancelHandler();
        });
    }

    render() {
        // Decide what we're doing
        let title = 'Create new call';
        let MUTATION = CREATE_CALL;
        if (this.props.activeCall > -1) {
            title = 'Edit call';
            MUTATION = UPDATE_CALL;
        }
        return (
            <div className={this.props.classes.root}>
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please complete all fields
                        </DialogContentText>
                        <form
                            className={this.props.classes.container}
                            noValidate
                            autoComplete="off"
                        >
                            {!this.props.match.params.deptId && (
                                <Grid
                                    className={this.props.classes.formRow}
                                    container
                                    spacing={16}
                                >
                                    <Grid item xs={12}>
                                        <DepartmentsDropdown
                                            selectedDepartment={this.state.call.DepartmentId}
                                            setSelectedDepartment={id => this.propUpdateHandler('DepartmentId', id)}
                                            dropdownStyles={{ select: { width: '100%' } }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            <Grid
                                className={this.props.classes.formRow}
                                container
                                spacing={16}
                            >
                                <Grid item xs={12}>
                                    <CallerInfo
                                        handleUpdate={this.propUpdateHandler}
                                        callerInfo={this.state.call.callerInfo}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                className={this.props.classes.formRow}
                                container
                                spacing={16}
                            >
                                <Grid item xs={12} sm={6}>
                                    <CallGrade
                                        handleUpdate={this.propUpdateHandler}
                                        callGrade={this.state.call.callGrade}
                                        department={this.props.match.params.deptId || this.state.call.DepartmentId}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CallType
                                        handleUpdate={this.propUpdateHandler}
                                        callType={this.state.call.callType}
                                        department={this.props.match.params.deptId || this.state.call.DepartmentId}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                className={this.props.classes.formRow}
                                container
                                spacing={16}
                            >
                                <Grid item xs={12}>
                                    <CallDescriptions
                                        handleUpdate={this.propUpdateHandler}
                                        callDescriptions={
                                            this.state.call.callDescriptions
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                className={this.props.classes.formRow}
                                container
                                spacing={16}
                            >
                                <Grid item xs={12}>
                                    <CallIncidents
                                        handleUpdate={this.propUpdateHandler}
                                        callIncidents={
                                            this.state.call.callIncidents
                                        }
                                        department={this.props.match.params.deptId || this.state.call.DepartmentId}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                className={this.props.classes.formRow}
                                container
                                spacing={16}
                            >
                                <Grid item xs={12}>
                                    <CallLocations
                                        handleUpdate={this.propUpdateHandler}
                                        callLocations={
                                            this.state.call.callLocations
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Mutation
                            mutation={MUTATION}
                            variables={{
                                id: this.state.call.id,
                                callerInfo: this.state.call.callerInfo,
                                callGrade: this.state.call.callGrade,
                                callType: this.state.call.callType,
                                callIncidents: this.state.call.callIncidents,
                                callLocations: this.state.call.callLocations,
                                callDescriptions: this.state.call
                                    .callDescriptions,
                                DepartmentId: this.state.call.DepartmentId

                            }}
                        >
                            {(mut, { loading, error }) => (
                                <React.Fragment>
                                    <Button
                                        disabled={loading}
                                        onClick={this.props.cancelHandler}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={!this.state.valid || loading}
                                        onClick={() =>
                                            this.saveClose(mut, error)
                                        }
                                    >
                                        {loading ? 'Saving' : 'Save'}
                                    </Button>
                                </React.Fragment>
                            )}
                        </Mutation>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default compose(
    withRouter,
    graphql(GET_CALL, {
        options: ownProps => ({
            variables: { callId: ownProps.activeCall },
            fetchPolicy: 'network-only'
        })
    }),
    withStyles(styles)
)(CallModal);
