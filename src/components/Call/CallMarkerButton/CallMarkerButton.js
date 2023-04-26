import React from 'react';

import { Mutation } from 'react-apollo';

import Button from '@material-ui/core/Button';

import { UPDATE_CALL_MARKER } from '../../../graphql/Calls/mutations';

const CallMarkerButton = props => {
    return (
        <Mutation mutation={UPDATE_CALL_MARKER}>
            {(mut, { loading, error }) => {
                let text = '';
                let variables = {};
                if (
                    // We test explicitly for null since
                    // 0 is a valid value here
                    props.call.markerX === null ||
                    props.call.markerY === null
                ) {
                    text = 'Place location marker';
                    variables = {
                        id: props.call.id,
                        markerX: 0,
                        markerY: 0
                    };
                } else {
                    text = 'Remove location marker';
                    variables = {
                        id: props.call.id,
                        markerX: null,
                        markerY: null
                    };
                }
                return (
                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        title={text}
                        disabled={loading || error ? true : false}
                        onClick={() => mut({ variables })}
                        aria-label={text}
                    >
                        {text}
                    </Button>
                );
            }}
        </Mutation>
    );
};

export default CallMarkerButton;
