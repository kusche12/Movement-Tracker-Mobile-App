import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    // Attempt an automatic signin for user on App startup
    useEffect(() => {
        tryLocalSignin();
    }, []);

    return null
};

export default ResolveAuthScreen;