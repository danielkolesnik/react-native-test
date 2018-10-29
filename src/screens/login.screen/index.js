// outsource
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import {
    View,
    StyleSheet,
} from 'react-native';

// local dependencies
import SCREENS from '../../navigation/screens';
import LoginForm from '../../components/login.form';
import Loader from '../../components/loader';
import layout, { colorPalette } from "../../styles/layout";



const styles = StyleSheet.create({

    simpleText: {
        color: '#F0EBF4'
    },
    buttonHolder: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: 20,
        width: 300,
        maxHeight: 100
    },
    btnContainer: {

    },
    btnText: {
        color: colorPalette.white
    },
    buttonIcon: {
        fontSize: 20
    },
    test: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class Login extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {

        return (
            <View style={layout.contentWrapper}>
                <LoginForm/>
                <View style={styles.buttonHolder}>
                    <Button
                        title='CANCEL'
                        icon={{type: 'font-awesome', name: 'times', color: '#F0EBF4', style: styles.buttonIcon}}
                        textStyle={styles.btnText}
                        containerViewStyle={styles.btnContainer}
                        backgroundColor='#E64398'
                        onPress={this.props.onHome}
                        />
                </View>
                <Loader/>
            </View>
        )
    }
}


export default connect(
    state => {
        return {
            ...state[SCREENS.PUBLIC.LOGIN]
        }
    },
    dispatch => {
        return {
            onHome: () => dispatch(NavigationActions.navigate({routeName: 'PUBLIC', params: {}, action: NavigationActions.navigate({routeName: SCREENS.PUBLIC.WELCOME})}))
        }
    }
)( Login );
