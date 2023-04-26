import React, { Component } from 'react';

import { withApollo, graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import SecureLS from 'secure-ls';

import withSnacks from './withSnacks';
import { IS_OUTDATED } from '../graphql/Fivem/queries';
import { ALL_PREFERENCES } from '../graphql/Preferences/queries';
import { ALL_CONFIG } from '../graphql/Config/queries';

export const AppContext = React.createContext();

class ContextProvider extends Component {
    constructor() {
        super();

        // This is not going to keep anyone out, our secret is in the source
        // for heaven's sake, it's just to discourage casual bods peeking
        // into local storage
        this.ls = new SecureLS({
            encodingType: 'aes',
            encryptionSecret: '8bqAoi7rhXpP!Y$$BRAaE56lC093W1#L',
            isCompression: false
        });

        this.state = {
            userSession: {},
            preferences: {},
            config: {},
            notifications: [],
            mode: 'light'
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.responsePreferences !== this.props.responsePreferences) {
            this.populatePreferences();
        }
        if (prevProps.responseOutdated !== this.props.responseOutdated) {
            this.populateFivemOutdated();
        }
        if (prevProps.responseConfig !== this.props.responseConfig) {
            this.populateConfig();
        }
    }
    componentDidMount() {
        if (!this.state.userSession.hasOwnProperty('id')) {
            this.restoreSession();
        }
        this.populatePreferences();
        this.populateFivemOutdated();
        this.setPreferredMode();
    }
    populateConfig = () => {
        if (
            this.props.responseConfig.hasOwnProperty('allConfig') &&
            this.props.responseConfig.allConfig
        ) {
            this.setState({ config: this.props.responseConfig.allConfig });
        }
    };
    populatePreferences = () => {
        if (
            this.props.responsePreferences.hasOwnProperty('allPreferences') &&
            this.props.responsePreferences.allPreferences
        ) {
            const prefs = this.props.responsePreferences.allPreferences.reduce(
                (acc, curr) => Object.assign(acc, { [curr.key]: curr }),
                {}
            );
            this.setState({ preferences: prefs });
        }
    };
    populateFivemOutdated = () => {
        if (
            this.userHasRoles(['PREF_MGR']) &&
            this.props.responseOutdated.hasOwnProperty('isFivemOutdated') &&
            this.props.responseOutdated.isFivemOutdated
        ) {
            this.addNotification({
                category: 'FiveM',
                title: 'Your FiveM resource is out of date',
                message:
                    'Please update your FiveM CADvanced resource as soon as possible. Failure to do so could lead to a loss in functionality. You can get the latest version from: https://github.com/CADvanced/cadvanced_mdt/releases/latest. ***IMPORTANT***: This release of the MDT requires extra lines in the mdt_config.lua file, please read the details at: https://github.com/CADvanced/cadvanced_mdt'
            });
        }
    };
    getLoginUrl = () => {
        const apiUrl = process.env.REACT_APP_API_URL
            ? process.env.REACT_APP_API_URL
            : `${window.location.protocol}//${window.location.hostname}`;
        return `${apiUrl}/auth/steam`;
    };
    restoreSession = () => {
        const existing = this.ls.get('session');
        if (Object.keys(existing).length > 0) {
            this.props.client.resetStore();
            this.setSession(JSON.parse(existing));
        }
    };
    setSession = session => {
        // Clear our Apollo cache with any data that may already be there,
        // we're either creating a new session or destroying an existing one,
        // either way, the data in the cache is now no longer relevant
        //this.props.client.resetStore();
        const wasLoggedIn = this.state.userSession.id ? true : false;
        this.setState({ userSession: session }, () => {
            if (Object.keys(session).length > 0) {
                this.ls.set('session', JSON.stringify(session));
            } else {
                this.ls.removeAll();
            }
            if (this.state.userSession.id) {
                if (!wasLoggedIn) {
                    this.props.sendMessage('Logged in');
                }
            } else {
                if (wasLoggedIn) {
                    this.props.sendMessage('Logged out');
                }
            }
        });
    };
    logout = () => {
        this.props.client.resetStore();
        this.clearNotifications();
        this.setSession({});
    };
    userHasRoles = requiredRoles => {
        if (
            this.state.userSession.hasOwnProperty('id') &&
            this.state.userSession.id
        ) {
            const intersection = requiredRoles.filter(role => {
                return this.state.userSession.roles.find(
                    uRole => uRole.code === role
                )
                    ? true
                    : false;
            });
            return intersection.length > 0;
        } else {
            return false;
        }
    };
    addNotification = notification => {
        let notifications = this.state.notifications;
        notifications.unshift(notification);
        this.setState({
            ...this.state,
            notifications
        });
    };
    clearNotifications = () => {
        this.setState({
            ...this.state,
            notifications: []
        });
    };
    setPreferredMode = () => {
        const cookieMode = document.cookie
            .split('; ')
            .find(row => row.startsWith('mode'));
        if (cookieMode) {
            const mode = cookieMode.split('=')[1];
            this.setMode(mode);
            return;
        }
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.setMode('dark');
            } else {
                this.setMode('light');
            }
        }
    };
    setMode = (mode) => {
        this.setState({ mode });
        document.cookie = `mode=${mode}`;
    };
    render() {
        const { userSession, config, preferences, notifications, mode } = this.state;
        return (
            <AppContext.Provider
                value={{
                    userSession,
                    config,
                    preferences,
                    notifications,
                    mode,
                    setMode: this.setMode,
                    loginUrl: this.getLoginUrl(),
                    setSession: session => this.setSession(session),
                    logout: () => this.logout(),
                    userHasRoles: required => this.userHasRoles(required)
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

export default compose(
    graphql(IS_OUTDATED, { name: 'responseOutdated' }),
    graphql(ALL_PREFERENCES, { name: 'responsePreferences' }),
    graphql(ALL_CONFIG, { name: 'responseConfig' }),
    withApollo,
    withSnacks
)(ContextProvider);
