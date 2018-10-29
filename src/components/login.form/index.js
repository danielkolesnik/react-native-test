// outsources
import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Button,  } from 'react-native-elements';
import {
    View,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';


// local dependencies
import { LOGIN } from '../../actions/types';
import PlainField from './PlainField';



const styles = StyleSheet.create({
    form: {
        flex: 2,
        justifyContent: 'flex-end',
        width: 300,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#A1C3D1',
    },
    submitBtn: {
        marginTop: 100
    }
});

class LoginForm extends React.Component {

    submit = ( values, dispatch ) => {
        const { nick, pass } = values;

        dispatch({type: this.props.submitActionType, nick, pass});
    };

    render() {
        let { handleSubmit, formStyle, ...options } = this.props;
        return (
            <View style={formStyle}>
                <Field name="nick"
                       component={ PlainField }
                       placeholder="Enter nickname"
                       fieldLabel="NICKNAME"
                />
                <Field name='pass'
                       component={ PlainField }
                       placeholder="Password"
                       fieldLabel="PASSWORD"
                       secureTextEntry
                />
                <View style={{marginTop: 20}}>
                    <Button title='SUBMIT'
                            icon={{type: 'font-awesome', name: 'user', color: '#F0EBF4', style: styles.buttonIcon}}
                            textStyle={styles.btnText}
                            containerViewStyle={styles.btnContainer}
                            disabled={false}
                            backgroundColor='#E64398'
                            onPress={handleSubmit(this.submit)}
                    />
                </View>
            </View>
        );
    }

    static defaultProps = {
        submitActionType: LOGIN.LOG_IN,
        formStyle: styles.form
    };
}

const validate = ( values ) => {
    let { nick, pass } = values; // , ...options
    const errors = {};

    if (!nick) {
        errors.nick = 'nickname required';
    }

    if (!pass) {
        errors.pass = 'password required';
    } else if ( pass.length < 6 ) {
        errors.pass = 'password length should be at least 6 symbols';
    }

    return errors;
};

export default connect(
    state => {
        return {
            ...state.login
        }
    },
    dispatch => {
        return {

        }
    }
)( reduxForm(
    {
        form: 'login',
        initialValues: {
            nick: '',
            pass: ''
        },
        validate
    }
)( LoginForm ));
