import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0
    },
    listItem: {
        paddingTop: 0,
        paddingLeft: 0
    },
    chargesTitle: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    }
});

const Charges = ({ charges, classes }) => {
    return (
        <React.Fragment>
            {charges.length === 0 && (
                <Typography
                    className={classes.chargesTitle}
                    variant="h6"
                    component="p"
                >
                    No charges
                </Typography>
            )}
            {charges.length > 0 && (
                <List className={classes.list}>
                    {charges.map((charge, idx) => (
                        <ListItem key={charge.id} className={classes.listItem}>
                            <ListItemText primary={charge.name}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(Charges);
