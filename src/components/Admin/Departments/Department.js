import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DepartmentConfig from './DepartmentConfig';
import DepartmentAnnouncements from './DepartmentAnnouncements';

const styles = theme => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        color: '#fff',
        marginLeft: theme.spacing.unit
    },
    expandMore: {
        color: '#fff'
    },
    expansionPanelSummary: {
        backgroundColor: theme.palette.primary.main
    },
    expansionPanelSummaryContent: {
        alignItems: 'center'
    },
    expansionPanelDetails: {
        display: 'block'
    },
    department: {
        display: 'flex'
    },
    departmentConfig: {
        flex: 1,
        padding: '0 10px 0 0'
    },
    departmentAnnouncements: {
        flex: 1,
        padding: '0 0 0 10px'
    }
});

const Department = ({ department, setExpanded, expanded, classes }) => {
    return (
        <div className={classes.root}>
            <ExpansionPanel
                expanded={expanded}
                onChange={() => setExpanded(expanded ? null : department.id)}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon className={classes.expandMore} />}
                    className={classes.expansionPanelSummary}
                    classes={{ content: classes.expansionPanelSummaryContent }}
                >
                    <FiberManualRecord
                        style={{ color: '#' + department.colour }}
                    />
                    <Typography className={classes.heading}>
                        {department.name}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails
                    className={classes.expansionPanelDetails}
                >
                    <div className={classes.department}>
                        <div className={classes.departmentConfig}>
                            <DepartmentConfig department={department} />
                        </div>
                        <div className={classes.departmentAnnouncements}>
                            <DepartmentAnnouncements department={department} />
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default withStyles(styles)(Department);