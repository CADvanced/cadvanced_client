import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';

import CadToolbar from './CadToolbar/CadToolbar';
import CadMenu from './CadMenu/CadMenu';

import withSnacks from '../../hoc/withSnacks';

const styles = theme => ({
    root: {
        minHeight: '100vh',
        height: '100%',
        background: theme.palette.background.default
    }
});

const Layout = ({ classes, children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = open => () => {
        setDrawerOpen(open);
    };
    return (
        <React.Fragment>
            <div className={classes.root}>
                <CadToolbar toggleDrawer={toggleDrawer} />
                <CadMenu
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                />
                <main>{children}</main>
            </div>
        </React.Fragment>
    );
}

export default withSnacks(withStyles(styles)(Layout));
