import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { lightBlue, grey, red, green } from '@material-ui/core/colors';

import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NoAuth from './components/NoAuth/NoAuth';
import MaxUsers from './components/MaxUsers/MaxUsers';
import Dispatcher from './components/Dispatcher/Dispatcher';
import Admin from './components/Admin/Admin';
import Citizens from './components/Citizens/Citizens';
import Officers from './components/Officers/Officers';
import Session from './components/Session/Session';
import MDT from './components/MDT/MDT';
import withContext from './hoc/ContextConsumer';

const light = {
    palette: {
        type: 'light',
        primary: {
            main: lightBlue[900],
            mid: lightBlue[600],
            light: lightBlue[50],
            shade: grey[100],
            darkShade: grey[500],
            error: red[300],
            success: green[400]
        },
        secondary: {
            main: lightBlue[500]
        },
        mdt: {
            shade: grey[100],
            light: grey[300],
            mid: grey[500],
            darkShade: grey[700],
            vDarkShade: grey[900]
        }
    },
    typography: {
        fontSize: 12,
        useNextVariants: true
    }
};

const dark = {
    palette: {
        type: 'dark',
        primary: {
            main: grey[800],
            mid: grey[700],
            light: grey[50],
            shade: grey[100],
            darkShade: grey[500],
            vDarkShade: grey[900],
            error: red[900],
            success: green[900],
        },
        secondary: {
            main: grey[500]
        },
        mdt: {
            shade: grey[100],
            light: grey[300],
            mid: grey[500],
            darkShade: grey[700],
            vDarkShade: grey[900]
        }
    },
    typography: {
        fontSize: 12,
        useNextVariants: true
    }
};


class App extends Component {
    render() {
        const theme = createMuiTheme(this.props.context.mode === 'light' ? light : dark);
        return (
            <MuiThemeProvider theme={theme}>
                <Layout>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/noauth" component={NoAuth} />
                    <Route exact path="/max_users" component={MaxUsers} />
                    <Route exact path="/uuid/:uuid" component={Session} />
                    <Route
                        exact
                        path={["/dispatcher/:deptId", "/dispatcher"]}
                        render={() =>
                            this.props.context.userHasRoles(['DISPATCHER']) ? (
                                <Dispatcher />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        path="/admin"
                        render={() =>
                            this.props.context.userHasRoles([
                                'OFFICER_MGR',
                                'UNIT_MGR',
                                'CALL_MGR',
                                'MAPS_MGR',
                                'PREF_MGR',
                                'CITIZEN_MGR',
                                'USER_MGR',
                                'LEGAL_MGR',
                                'CITIZEN_VAL_MGR'
                            ]) ? (
                                <Admin />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/citizens"
                        render={() =>
                            this.props.context.userHasRoles(['RP_CITIZEN']) ? (
                                <Citizens />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/officers"
                        render={() =>
                            this.props.context.userHasRoles(['RP_OFFICER']) ? (
                                <Officers />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/mdt"
                        render={() =>
                            this.props.context.userHasRoles(['RP_OFFICER']) ? (
                                <MDT />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                </Layout>
            </MuiThemeProvider>
        );
    }
}

export default withContext(App);
