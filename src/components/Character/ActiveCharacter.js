import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import withContext from '../../hoc/ContextConsumer';

import { GET_CHARACTER } from '../../graphql/Character/queries';
import { CHARACTER_ACTIVE_UPDATED } from '../../graphql/Character/subscriptions';
import DepartmentIcon from '../../lib/DepartmentIcon';

const styles = theme => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 80
    },
    icon: {
        marginRight: theme.spacing.unit
    },
    characterLink: {
        color: '#fff',
        textDecoration: 'none'
    },
    name: {
        marginLeft: 10
    }
});

const ActiveCharacter = props => {
    const { classes, context } = props;
    const [active, setActive] = useState(null);

    const { data } = useQuery(GET_CHARACTER, {
        variables: { UserId: context.userSession.id || 0 }
    });

    useEffect(() => {
        if (data && data.hasOwnProperty('getCharacter')) {
            setActive(data.getCharacter ? data.getCharacter : null);
        }
    }, [data]);

    // Subscribe to active updates, so our cache gets updated
    useSubscription(CHARACTER_ACTIVE_UPDATED, {
        onSubscriptionData: ({ subscriptionData }) => {
            if (subscriptionData && subscriptionData.data) {
                // Just use updates concerning us
                const ours = subscriptionData.data.characterActiveUpdated.filter(
                    up => up.UserId === context.userSession.id
                );
                const current = JSON.parse(JSON.stringify(active));
                setActive();
                if (ours.length > 0) {
                    const found = ours.find(chr => chr.active);
                    if (found) {
                        setActive(found);
                    }
                } else {
                    setActive(current);
                }
            }
        }
    });

    if (!context.userSession.id || !active) {
        return null;
    }

    const characterName = `${active.firstName} ${active.lastName}`;

    const ariaLabel = active.department ?
        active.department.name :
        characterName;

    const buttonStyle = active.department ?
        `#${active.department.colour}` :
        '#fff';

    return active ? (
        <Tooltip
            title={`You are roleplaying as ${characterName}`}
        >
            <Link
                className={classes.characterLink}
                underline="none"
                to={'/' + active.__typename.toString().toLowerCase() + 's'}
            >
                <Button
                    className={classes.menuButton}
                    color="inherit"
                    aria-label={ariaLabel}
                    style={{ color: `${buttonStyle}` }}
                >
                    {active.department && <DepartmentIcon hideSpinner department={active.department.id} containerStyles={{ marginRight: 10, display: 'flex' }} />}
                    <span className={classes.name}>{active.firstName + ' ' + active.lastName}</span>
                </Button>
            </Link>
        </Tooltip >
    ) : null;
};

export default withStyles(styles)(withContext(ActiveCharacter));
