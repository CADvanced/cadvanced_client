import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        width: '100%'
    },
    inline: {
        display: 'inline'
    },
    noCalls: {
        marginBottom: '1em'
    }
});

const UnitCalls = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            {props.calls.length > 0 ? (
                <List>
                    {props.calls.map((call, index) => (
                        <ListItem key={index} alignItems="flex-start">
                            <ListItemText
                                primary={
                                    <React.Fragment>
                                        <Typography
                                            variant={'body1'}
                                            component="span"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {call.callIncidents
                                                .map(inc => inc.name)
                                                .join(', ')}
                                        </Typography>{' '}
                                        -{' '}
                                        <Typography
                                            variant={'body2'}
                                            component="span"
                                            className={classes.inline}
                                            color="textSecondary"
                                        >
                                            {call.callLocations
                                                .map(loc => loc.name)
                                                .join(', ')}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography className={classes.noCalls}>
                    No calls assigned
                </Typography>
            )}
        </div>
    );
};

export default withStyles(styles)(UnitCalls);
