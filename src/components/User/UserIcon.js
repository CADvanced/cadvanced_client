import React from 'react';

import withContext from '../../hoc/ContextConsumer';

const UserIcon = props => {
    return props.context.userSession.avatarUrl ? (
        <img alt="User avatar" src={props.context.userSession.avatarUrl} />
    ) : null;
};

export default withContext(UserIcon);
