import React, { Component } from 'react';
import { Mutation, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import compose from 'lodash.flowright';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

import UnitInput from './UnitInput';
import UnitTypeDropdown from '../../../lib/UnitTypeDropdown';
import UnitStateDropdown from '../../../lib/UnitStateDropdown';
import DepartmentsDropdown from '../../../lib/DepartmentsDropdown';

import { GET_UNIT } from '../../../graphql/Units/queries';
import { CREATE_UNIT, UPDATE_UNIT } from '../../../graphql/Units/mutations';

const styles = theme => ({
    dialogContent: {
        overflow: 'visible'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    root: {
        flexGrow: 1
    }
});

class CreateUnitModal extends Component {
    state = {
        valid: false,
        unit: {
            id: null,
            callSign: '',
            unitType: {},
            unitState: {}
        }
    };

    propUpdateHandler = (changedProp, val) => {
        this.setState(
            {
                unit: {
                    ...this.state.unit,
                    [changedProp]: val
                }
            },
            () => this.validate()
        );
    };

    validate = () => {
        if (
            this.state.unit.callSign.length > 0 &&
            Object.keys(this.state.unit.unitType).length > 0 &&
            Object.keys(this.state.unit.unitState).length > 0 &&
            this.state.unit.DepartmentId.length > 0
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
        // Catch the case where we already have the unit
        // and are opening the modal
        if (!this.props.data.loading && this.props.data.getUnit) {
            this.setState({ unit: { ...this.props.data.getUnit } }, () =>
                this.validate()
            );
        }
        // Populate our department ID if possible
        if (this.props.match.params.deptId) {
            this.propUpdateHandler('DepartmentId', this.props.match.params.deptId);
        }
    }

    componentDidUpdate(prevProps) {
        // Catch the case where the modal opened before the
        // unit populated from the API
        if (prevProps.data.getUnit !== this.props.data.getUnit) {
            if (!this.props.data.loading && this.props.data.getUnit) {
                this.setState({ unit: { ...this.props.data.getUnit } }, () =>
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
        const { classes } = this.props;
        // Decide what we're doing
        let title = 'Create new unit';
        let MUTATION = CREATE_UNIT;
        if (this.props.activeUnit > -1) {
            title = 'Edit unit';
            MUTATION = UPDATE_UNIT;
        }
        return (
            <div className={classes.root}>
                <Dialog
                    scroll="paper"
                    classes={{ paperScrollPaper: classes.dialogContent }}
                    open={this.props.open}
                    onClose={this.props.closeModal}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <DialogContentText>
                            Please complete all fields
                        </DialogContentText>
                        <form
                            className={classes.container}
                            noValidate
                            autoComplete="off"
                        >
                            {!this.props.match.params.deptId && (
                                <Grid
                                    container
                                    spacing={16}
                                >
                                    <Grid item xs={12}>
                                        <DepartmentsDropdown
                                            selectedDepartment={this.state.unit.DepartmentId}
                                            setSelectedDepartment={id => this.propUpdateHandler('DepartmentId', id)}
                                            dropdownStyles={{ select: { width: '100%' } }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <UnitInput
                                        callSign={this.state.unit.callSign}
                                        handleUpdate={this.propUpdateHandler}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <UnitTypeDropdown
                                        unitType={this.state.unit.unitType}
                                        handleUpdate={this.propUpdateHandler}
                                        department={this.props.match.params.deptId || this.state.unit.DepartmentId}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <UnitStateDropdown
                                        unitState={this.state.unit.unitState}
                                        handleUpdate={this.propUpdateHandler}
                                        department={this.props.match.params.deptId || this.state.unit.DepartmentId}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Mutation
                            mutation={MUTATION}
                            variables={{
                                id: this.state.unit.id,
                                callSign: this.state.unit.callSign,
                                unitTypeId: this.state.unit.unitType.id,
                                unitStateId: this.state.unit.unitState.id,
                                DepartmentId: this.state.unit.DepartmentId
                            }}
                        >
                            {(mut, { loading }) => (
                                <React.Fragment>
                                    <Button
                                        onClick={this.props.cancelHandler}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={loading || !this.state.valid}
                                        onClick={() => this.saveClose(mut)}
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
    graphql(GET_UNIT, {
        options: ownProps => ({
            variables: { unitId: ownProps.activeUnit },
            fetchPolicy: 'network-only'
        })
    }),
    withStyles(styles)
)(CreateUnitModal);
