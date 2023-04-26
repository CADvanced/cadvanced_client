import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minHeight: theme.spacing.unit * 5
    },
    inputLabel: {
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

class CallDescriptions extends Component {
    state = {
        descriptions: []
    };

    UNSAFE_componentWillReceiveProps(props) {
        let desc = [...props.callDescriptions];
        // We only ever receive populated descriptions, so we always want to
        // push an empty one onto the end
        // We choose a random temporary id for the benefit of the iterator key,
        // this is not passed to the API
        const tempId = 1 - Math.floor(Math.random() * 999999);
        desc.push({ id: tempId, text: '' });
        this.setState({
            descriptions: desc
        });
    }

    handleUpdate = (idx, val) => {
        let descCopy = JSON.parse(JSON.stringify(this.state.descriptions));
        descCopy[idx].text = val;
        // Remove empty descriptions before we pass them back
        const toSend = descCopy.filter(d => d.text.length > 0);
        this.setState({ descriptions: toSend }, () => {
            this.props.handleUpdate(
                'callDescriptions',
                this.state.descriptions
            );
        });
    };

    deleteDescriptionHandler = id => {
        const descCopy = [...this.state.descriptions];
        const targetIndex = descCopy.findIndex(
            desc => Number(desc.id) === Number(id)
        );
        descCopy.splice(targetIndex, 1);
        const toSend = descCopy.filter(d => d.text.length > 0);
        this.setState({ descriptions: toSend }, () => {
            this.props.handleUpdate(
                'callDescriptions',
                this.state.descriptions
            );
        });
    };

    render() {
        const descriptions = this.state.descriptions.map((description, idx) => {
            const adornment =
                description.text.length > 0 ? (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Delete description"
                            onClick={() =>
                                this.deleteDescriptionHandler(description.id)
                            }
                        >
                            <Delete />
                        </IconButton>
                    </InputAdornment>
                ) : null;
            return (
                <Input
                    placeholder={'Enter a description'}
                    key={description.id}
                    multiline
                    fullWidth
                    id="form_callDescriptions"
                    className={this.props.classes.textField}
                    value={description.text}
                    onChange={event =>
                        this.handleUpdate(idx, event.target.value)
                    }
                    endAdornment={adornment}
                />
            );
        });
        return (
            <React.Fragment>
                <Typography
                    className={this.props.classes.inputLabel}
                    variant={'caption'}
                >
                    Call descriptions
                </Typography>
                {descriptions}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CallDescriptions);
