import React from 'react';

import { withStyles } from '@material-ui/core/';

import withContext from '../../hoc/ContextConsumer';

const styles = theme => ({
    root: {
        color: theme.palette.text.primary
    }
});

const UserName = ({context, classes}) => {
    return context.userSession.userName
        ? <span className={classes.root}>{context.userSession.userName}</span>
        : null;
};

export default withStyles(styles)(withContext(UserName));
