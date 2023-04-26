import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Person from '@material-ui/icons/Person';
import DirectionsCar from '@material-ui/icons/DirectionsCar';

import BoloVehicleDetails from '../BoloVehicleDetails/BoloVehicleDetails';
import BoloCitizenDetails from '../BoloCitizenDetails/BoloCitizenDetails';
import DepartmentIcon from '../../lib/DepartmentIcon';

const styles = theme => ({
    boloDetails: {
        flexDirection: 'column'
    },
    actions: {
        paddingBottom: 0
    },
    divider: {
        marginTop: theme.spacing.unit * 2
    },
    boloIcon: {
        marginRight: '20px'
    },
    deptIcon: {
        marginRight: 10
    },
    expansionPanelSummary: {
        alignItems: 'center'
    }
});

const Bolo = ({ bolo, editBolo, deleteBolo, classes }) => {
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                classes={{ content: classes.expansionPanelSummary }}
                expandIcon={<ExpandMoreIcon />}>
                <div className={classes.deptIcon}>
                    <DepartmentIcon department={bolo.DepartmentId} loadingSize={20} />
                </div>
                {bolo.boloType === 'vehicle' ? <DirectionsCar className={classes.boloIcon} /> : <Person className={classes.boloIcon} />}
                <Typography variant={'h6'}>
                    {bolo.boloType === 'vehicle' ? bolo.details.licencePlate : bolo.details.description}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.boloDetails}>
                {bolo.boloType === 'vehicle' ? <BoloVehicleDetails bolo={bolo} /> : <BoloCitizenDetails bolo={bolo} />}
                <Divider className={classes.divider} variant="middle" />
                <ExpansionPanelActions className={classes.actions}>
                    <Button
                        size="small"
                        onClick={() => editBolo(bolo)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        onClick={() => deleteBolo({ variables: { id: bolo.id } })}
                    >
                        Delete
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default withStyles(styles)(Bolo);