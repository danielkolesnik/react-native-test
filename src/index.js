// outsource
import React from 'react';
import { Provider } from 'react-redux';

// local dependencies
import AppNavigator from "./navigation/navigators";
import store from './appStore';


//
// App Root Component
//

export default class App extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <AppNavigator/>
            </Provider>
        );
    }
}