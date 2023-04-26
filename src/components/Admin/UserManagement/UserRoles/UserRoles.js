import React, { Component } from 'react';

import { Query, withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import withContext from '../../../../hoc/ContextConsumer';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';
import { ALL_USER_TYPES } from '../../../../graphql/Users/queries';
import { ASSIGN_USER_ROLES } from '../../../../graphql/Users/mutations';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    border: {
        paddingRight: theme.spacing.unit * 2,
        borderRadius: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit * 3,
        backgroundColor: theme.palette.primary.mid
    },
    toggle: {
        paddingBottom: theme.spacing.unit * 2,
        textAlign: 'center'
    }
});

class UserRoles extends Component {
    state = {
        ready: false,
        roles: {}
    };

    componentDidMount() {
        const initialState = {};
        this.props.client.query({ query: ALL_USER_TYPES }).then(ret => {
            ret.data.allUserTypes.forEach(type => {
                initialState[type.id] = this.userHasRole(type.id);
            });
            this.setState({ ready: true, roles: initialState });
        });
    }

    handleChange = name => event => {
        const roles = this.state.roles;
        roles[name] = event.target.checked;
        this.setState({ roles }, () => this.updateUserRoles());
    };

    updateUserRoles = () => {
        const grantedRoles = [];
        Object.keys(this.state.roles).forEach(id => {
            if (this.state.roles[id]) {
                grantedRoles.push({ id });
            }
        });
        this.props.client.mutate({
            mutation: ASSIGN_USER_ROLES,
            variables: {
                UserId: this.props.user.id,
                UserRoles: grantedRoles
            }
        });
    };

    userHasRole(roleId) {
        return this.props.user.roles.find(ur => ur.id === roleId)
            ? true
            : false;
    }

    bulkSelect(type) {
        let toGrant = [];
        if (type === 'all') {
            Object.keys(this.state.roles).forEach(id => {
                toGrant.push({ id });
            });
        }
        this.props.client.mutate({
            mutation: ASSIGN_USER_ROLES,
            variables: {
                UserId: this.props.user.id,
                UserRoles: toGrant
            }
        });
    }

    render() {
        const { classes, context } = this.props;
        return (
            <Query query={ALL_USER_TYPES}>
                {({ loading, error, data }) => {
                    if (loading || !this.state.ready) return <LoadingSpinner />;
                    if (error) return <p>Error</p>;
                    if (this.state.ready) {
                        return (
                            <React.Fragment>
                                <Grid container>
                                    <Grid item lg={12} xs={12}>
                                        <div className={classes.toggle}>
                                            <Button
                                                onClick={() =>
                                                    this.bulkSelect('all')
                                                }
                                                color="secondary"
                                                disabled={
                                                    data.allUserTypes.length ===
                                                    this.props.user.roles.length
                                                }
                                            >
                                                Assign all
                                            </Button>
                                            <Button
                                                disabled={
                                                    this.props.user.id ===
                                                    context.userSession.id
                                                }
                                                color="secondary"
                                                onClick={() =>
                                                    this.bulkSelect()
                                                }
                                            >
                                                Remove all
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item lg={12} xs={12}>
                                        <FormGroup row className={classes.root}>
                                            {data.allUserTypes.map(type => {
                                                return (
                                                    <FormControlLabel
                                                        key={type.id}
                                                        className={
                                                            classes.border
                                                        }
                                                        control={
                                                            <Checkbox
                                                                disabled={
                                                                    type.code ===
                                                                    'USER_MGR' &&
                                                                    this.props
                                                                        .user
                                                                        .id ===
                                                                    context
                                                                        .userSession
                                                                        .id
                                                                }
                                                                checked={this.userHasRole(
                                                                    type.id
                                                                )}
                                                                onChange={this.handleChange(
                                                                    type.id
                                                                )}
                                                                value={type.id}
                                                            />
                                                        }
                                                        label={type.name}
                                                    />
                                                );
                                            })}
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        );
                    }
                }}
            </Query>
        );
    }
}

export default withContext(withApollo(withStyles(styles)(UserRoles)));
