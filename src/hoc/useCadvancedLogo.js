import { useContext } from 'react';

import { AppContext } from './ContextProvider';

const useCadvancedLogo = () => {
    const context = useContext(AppContext);
    return context.mode === 'light' ? '/cadvanced_logo.svg' : '/cadvanced_logo_dark.svg';
};

export default useCadvancedLogo;
