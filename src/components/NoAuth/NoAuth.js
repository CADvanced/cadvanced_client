import React, { Component } from 'react';

import withContext from '../../hoc/ContextConsumer';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    titleContainer: {
        marginTop: '100px'
    },
    mainTitle: {
        font: '4em "Jura", sans-serif',
        display: 'block',
        margin: '0',
        padding: '20px 0 10px 0',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.5)',
        color: '#fff'
    },
    subTitle: {
        font: '2em "Jura", sans-serif',
        display: 'block',
        margin: '0',
        padding: '20px 25%',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.5)',
        color: '#fff'
    }
};

class NoAuth extends Component {
    componentDidMount() {
        // In case the user has an old session hanging around
        // get rid of it since they failed authentication
        this.props.context.logout();
    }

    render() {
        return (
            <div className={this.props.classes.titleContainer}>
                <h1 className={this.props.classes.mainTitle}>NOT AUTHORISED</h1>
                <h2 className={this.props.classes.subTitle}>
                    You are not authorised to log in. It is possible you have
                    not been whitelisted. Please speak to a member of the admin
                    team.
                </h2>
            </div>
        );
    }
}

export default withContext(withStyles(styles)(NoAuth));
