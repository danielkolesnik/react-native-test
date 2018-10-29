// outsources
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// local dependencies
import SCREENS from '../navigation/screens';
import loginScreenData from '../screens/login.screen/reducer';
import authData from '../components/login.form/reducer';
import homeScreenData from '../screens/welcome.screen/reducer';
import loaderData from '../components/loader/reducer';
import { navigationData } from '../navigation/navigators';

export default combineReducers(
    {
        nav: navigationData,
        authData,
        loader: loaderData,
        // navigationData,
        [SCREENS.PUBLIC.LOGIN]: loginScreenData,
        form: formReducer,
        [SCREENS.PUBLIC.WELCOME]: homeScreenData,
    }
);