import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import UserAlias from './UserAlias';
import UserRoles from './UserRoles/UserRoles';
import withContext from '../../../hoc/ContextConsumer';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100vw'
    },
    expansionSummary: {
        borderBottom: '1px solid #ccc'
    },
    heading: {
        font: '1em "Jura", sans-serif'
    },
    summaryContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    summaryUserName: {
        paddingRight: theme.spacing.unit * 4
    },
    noPerms: {
        font: '1em "Jura", sans-serif',
        color: 'rgba(0,0,0,0.4)'
    },
    isAdmin: {
        font: '1em "Jura", sans-serif',
        fontWeight: 700
    }
});

const EditableUsers = ({
    classes,
    context,
    allData,
    deleteItem,
    mutations
}) => {
    const [expanded, setExpanded] = useState(0);

    const [updateUser, { loading }] = useMutation(mutations.UPDATE);

    const handleChange = id => {
        setExpanded(expanded !== id ? id : 0);
    };

    const doUpdate = user => {
        updateUser({ variables: user });
    };

    const hasRoles = user => user.roles.length > 0;

    const isAdmin = user => user.roles.some(role => role.code.includes('_MGR'));

    return (
        <div className={classes.root}>
            <List>
                {allData
                    .sort((a, b) => b.id - a.id)
                    .map(item => (
                        <ListItem key={item.id}>
                            <ExpansionPanel
                                className={classes.root}
                                expanded={expanded === item.id}
                                onChange={() => handleChange(item.id)}
                            >
                                <ExpansionPanelSummary
                                    classes={{ root: classes.expansionSummary }}
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <div className={classes.summaryContainer}>
                                        <div
                                            className={classes.summaryUserName}
                                        >
                                            <Typography
                                                className={
                                                    hasRoles(item)
                                                        ? isAdmin(item)
                                                            ? classes.isAdmin
                                                            : classes.heading
                                                        : classes.noPerms
                                                }
                                            >
                                                {item.userName}
                                            </Typography>
                                        </div>
                                        {expanded !== item.id && item.alias && (
                                            <Typography
                                                className={classes.heading}
                                            >
                                                ({item.alias})
                                            </Typography>
                                        )}
                                        {expanded === item.id && (
                                            <span
                                                onClick={e =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <UserAlias
                                                    updateUser={doUpdate}
                                                    user={item}
                                                    loading={loading}
                                                />
                                            </span>
                                        )}
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container>
                                        <Grid item xs={12}></Grid>
                                        <Grid item xs={12}>
                                            {expanded === item.id && (
                                                <UserRoles user={item} />
                                            )}
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                                <Divider />
                                <ExpansionPanelActions>
                                    <Button
                                        disabled={
                                            item.id === context.userSession.id
                                        }
                                        size="small"
                                        color="secondary"
                                        aria-label="Delete user"
                                        onClick={() => {
                                            deleteItem({
                                                variables: {
                                                    id: item.id
                                                }
                                            });
                                        }}
                                    >
                                        Delete user
                                    </Button>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};
export default withContext(withStyles(styles)(EditableUsers));
