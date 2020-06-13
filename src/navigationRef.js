import { NavigationActions } from 'react-navigation';

let navigator;

export const setNavigator = (nav) => {
    navigator = nav;
};

// name of route we want to show and the parameters we want the screen to have
export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({ routeName, params })
    );
};