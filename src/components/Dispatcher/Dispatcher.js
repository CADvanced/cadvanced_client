import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-apollo';

import compose from 'lodash.flowright';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CadMap from '../CadMap/CadMap';
import Players from '../Players/Players';
import Bolos from '../Bolos/Bolos';
import Calls from '../Calls/Calls';
import Units from '../Units/Units';
import withContext from '../../hoc/ContextConsumer';

import { ALL_DEPARTMENTS } from '../../graphql/Departments/queries';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '95%',
        margin: '0 auto',
        paddingTop: '55px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary
    },
    hoist: {
        zIndex: 10
    }
});

const Dispatcher = props => {
    const [highlightedCall, setHighlightedCall] = useState(null);
    const [department, setDepartment] = useState({});
    const { data } = useQuery(ALL_DEPARTMENTS);
    const { deptId } = useParams();

    useEffect(() => {
        const dept = getCurrentDept();
        setDepartment(dept || {});
    }, [data, deptId]);

    const getCurrentDept = () => {
        if (deptId && data && data.allDepartments) {
            return data.allDepartments.find(d => d.id === deptId);
        }
    };

    // Should we display the BOLO componeny
    const shouldBolo = () => {
        const dept = getCurrentDept();
        if (dept) {
            return dept.bolo;
        } else {
            // No department is chosen, so do any of the defined departments
            // have BOLOs enabled
            if (data && data.allDepartments) {
                return data.allDepartments.find(d => d.bolo);
            }
        }
    }

    return (
        <React.Fragment>
            <CadMap highlightedCall={highlightedCall} department={department} />
            <Grid container className={props.classes.root} spacing={0}>
                <Grid item lg={3} xs={12} className={props.classes.hoist}>
                    <Calls setHighlightedCall={setHighlightedCall} department={department} />
                    {shouldBolo() && <Bolos department={department} />}
                </Grid>
                <Grid item lg={6} xs={12} />
                <Grid item lg={3} xs={12} className={props.classes.hoist}>
                    <Units department={department} />
                </Grid>
            </Grid>
            {(props.context.preferences.enable_fivem.value !== 'true' ||
                props.context.preferences.user_picker.value === 'true') && (
                    <Players department={department} />
                )}
        </React.Fragment>
    );
};

export default compose(withStyles(styles), withContext)(Dispatcher);
