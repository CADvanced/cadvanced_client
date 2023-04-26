import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


import withContext from '../../hoc/ContextConsumer';
import useActiveDepartment from '../../hoc/useActiveDepartment';
import useDepartmentAnnouncements from '../../hoc/useDepartmentAnnouncements';
import Announcements from './Announcements';

const styles = {
    titleContainer: {
        marginTop: '100px'
    },
    message: {
        marginTop: '20px',
        width: '50%',
        margin: '0 auto',
        textAlign: 'center'
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
        padding: '10px 0 20px 0',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.5)',
        color: '#fff'
    },
    loginBox: {
        margin: '30px 0 0 0',
        display: 'flex',
        justifyContent: 'center'
    },
    mainLogo: {
        maxWidth: '80%',
        maxWidth: '800px',
        maxHeight: '400px',
        margin: '0 auto',
        display: 'block'
    },
    announcementsContainer: {
        marginTop: 30,
    },
    announcements: {
        maxHeight: 300,
        overflowY: 'auto'
    }
};

const Home = props => {
    const { id, logo } = useActiveDepartment();

    const { data } = useDepartmentAnnouncements({ id: id || 0 });

    return (
        <React.Fragment>
            <div className={props.classes.titleContainer}>
                {logo && (
                    <img
                        alt="Logo"
                        src={logo}
                        className={props.classes.mainLogo}
                    />
                )}
                {!props.context.userSession.id && (
                    <div className={props.classes.loginBox}>
                        <a href={props.context.loginUrl} target="_self">
                            <img
                                src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
                                alt="Sign in through Steam"
                            />
                        </a>
                    </div>
                )}
            </div>
            {data && data.allDepartmentAnnouncements.length > 0 && (
                <div className={[props.classes.mainLogo, props.classes.announcementsContainer].join(' ')}>
                    <Typography variant="h5">Announcements</Typography>
                    <div className={props.classes.announcements}>
                        <Announcements announcements={data.allDepartmentAnnouncements} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default withContext(withStyles(styles)(Home));
