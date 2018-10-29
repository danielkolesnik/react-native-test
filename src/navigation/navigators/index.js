// outsource
import {
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator
} from 'react-navigation';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Dimensions, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';

// local dependencies
import SCREENS from '../screens';
// Authorization screens
import Login from '../../screens/login.screen';
import Welcome from '../../screens/welcome.screen';
// Private app screens
import User from '../../screens/user.screen';
import { colorPalette } from "../../styles/layout";
import { Icon } from 'react-native-elements';
import { DrawerItems, SafeAreaView } from 'react-navigation';

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={{height: 80, backgroundColor: colorPalette.violet, flex: 1, flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center'}}>
            {null}
            <Icon
                name='clear'
                color={colorPalette.white}
                onPress={props.navigation.closeDrawer}
                underlayColor={colorPalette.violet}
                size={30}
                containerStyle={{position: 'relative', top: 15}}
            />
        </View>
        <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }} forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems
                {...props}
                labelStyle={{color: colorPalette.white}}
                />
        </SafeAreaView>
    </ScrollView>
);


const AuthStackNavigator = createStackNavigator(
    {
        [SCREENS.PUBLIC.LOGIN]: Login,
        [SCREENS.PUBLIC.WELCOME]: Welcome,
    },
    {
        initialRouteName: SCREENS.PUBLIC.LOGIN
    }
);

const AppStackNavigator = createDrawerNavigator(
    {
        [SCREENS.PRIVATE.USER]: User
    },
    {
        drawerWidth: Dimensions.get('window').width*0.7,
        initialRouteName: SCREENS.PRIVATE.USER,
        drawerBackgroundColor: colorPalette.violet,
        contentComponent: CustomDrawerContentComponent
    }
);

//
// contain Auth Navigator (public/authorization)
//
const RootNavigator = createSwitchNavigator(
    {
        PUBLIC: AuthStackNavigator,
        PRIVATE: AppStackNavigator
    },
    {
        // initialRouteName: 'PUBLIC'
        initialRouteName: 'PRIVATE'
    }
);

//
// configure Navigation Reducer
//
export const navigationData = createNavigationReducer(RootNavigator);

//
// configure Navigation Middleware
//
export const navMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

//
// reduxifying Navigator
//
const AppNavigator = reduxifyNavigator(RootNavigator, "root");


//
// final Navigator after  all preparations
//
export default connect(
    ( state ) => {
        return {
            state: state.nav
        }
    }
)( AppNavigator );
