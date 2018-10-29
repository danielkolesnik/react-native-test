
// outsource
import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
// local dependencies

// define how long does one iteration of animation will be continue in seconds
const DURATION = 3;
// animation Easing
const EASING = Easing.linear;

const styles = StyleSheet.create({
    preloaderWrapper: {
        flex: 1,
        width: Dimensions.get('window').width,
        position: 'relative',
    },
    preloaderImage: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: 0,
        left: -150,
    },
});

class Loader extends React.Component {

    animateVal = new Animated.Value(0);
    opacity = 1;

    startAnimate() {
        this.animateVal.setValue(0);
        this.opacity = 1;
        Animated.timing(
            this.animateVal,
            {
                toValue: 1,
                duration: DURATION*1000,
                easing: EASING
            }
        ).start(() => {
            if(this.props.animate) {
                this.startAnimate();
            }
        })
    }

    render(){
        const left = this.animateVal.interpolate({
            inputRange: [0, 1],
            outputRange: [-150, ((Dimensions.get('window').width)+150)]
        });

        return (

            <View style={styles.preloaderWrapper}>
                <Animated.Image
                    style={{ width: 150, height: 150, position: 'absolute', top: 0, left: left, opacity: this.opacity }}
                    source={require('./dickbutt.gif')}
                />
            </View>
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.animate) {
            this.startAnimate();
        } else {
            this.opacity = 0;
        }
    }
}

export default connect(
    state => {
        return {
            ...state.loader
        }
    },
    dispatch => {
        return {

        }
    }
)( Loader );