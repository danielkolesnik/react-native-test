// outsource
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

// local dependencies
import SCREENS from '../../navigation/screens';
import layout from "../../styles/layout";

const styles = StyleSheet.create({
    greeting: {
        // paddingLeft: 50
    },
    greetingText: {
        color: '#F0EBF4',
        fontWeight: 'bold'
    },
    image: {
        width: 200,
        height: 224
    },
    imageWrapper: {
        position: 'relative',
        top: 20
    },
    buttonHolder: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingTop: 20,
        width: 300
    },
    btnText: {

    },
    btnContainer: {
        marginBottom: 15
    },
    buttonIcon: {
        fontSize: 20
    }
});

class Welcome extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {

        return (
            <View style={layout.contentWrapper}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={require('./mexicanMask.png')}
                        style={styles.image}
                        />
                </View>
                {/*this.props.isAuth*/}
                <View style={styles.greeting}>
                    <Text style={styles.greetingText}>{this.props.greetingMessage}</Text>
                </View>

                <View style={styles.buttonHolder}>
                    <Button
                        title='SIGN IN '
                        icon={{type: 'font-awesome', name: 'sign-in', color: 'white', style: styles.buttonIcon}}
                        textStyle={styles.btnText}
                        containerViewStyle={styles.btnContainer}
                        backgroundColor='#E64398'
                        onPress={this.props.onLogin}
                        />
                    <Button
                        title='SIGN UP'
                        icon={{type: 'font-awesome', name: 'plus', color: 'white', style: styles.buttonIcon}}
                        textStyle={styles.btnText}
                        containerViewStyle={styles.btnContainer}
                        backgroundColor='#E64398'
                        onPress={() => alert('DIES IST EINE PRIVATE FUNKTION!')}
                        />
                </View>
            </View>
        )
    }
}

export default connect(
    state => {
        return {
            isAuth: state[SCREENS.PUBLIC.LOGIN].isAuth,
            ...state[SCREENS.PUBLIC.WELCOME]
        }
    },
    dispatch => {
        return {
            onLogin: () => dispatch(NavigationActions.navigate({routeName: 'PUBLIC', params: {}, action: NavigationActions.navigate({routeName: SCREENS.PUBLIC.LOGIN})}))
        }
    })(Welcome);