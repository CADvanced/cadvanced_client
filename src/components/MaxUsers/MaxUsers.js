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
                <h1 className={this.props.classes.mainTitle}>
                    MAXIMUM PLAYERS REACHED
                </h1>
                <h2 className={this.props.classes.subTitle}>
                    Your CADvanced server has reached the maximum number of
                    players allowed on your plan. In order to log in, you will
                    either need to remove a player or upgrade your plan.
                </h2>
            </div>
        );
    }
}

export default withContext(withStyles(styles)(NoAuth));
