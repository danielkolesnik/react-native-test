// outsource
import React from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import {
    Avatar,
    Header,
    Badge,
    Icon,
    ListItem,
    Card,
    Button
} from 'react-native-elements';


// local dependencies
import { LOGIN } from '../../actions/types';
import SCREENS from '../../navigation/screens';
import layout, { colorPalette } from "../../styles/layout";


const styles = StyleSheet.create({
    headerOuterContainer: {
        borderBottomWidth: 0,
        backgroundColor: colorPalette.violet,
        height: 80
    },
    contentWrapper: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        backgroundColor: colorPalette.bgGrey,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    userInfoWrapper: {
        alignItems: 'center',
        padding: 30
    },
    wallWrapper: {
        flexDirection: 'row'
    },
    wall: {

    }
});

class User extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {

        let { name, surname, avatar, friends, ...userOptions} = this.props.user;
        return [
            <Header
                key='header'
                leftComponent={<Icon
                                    name='menu'
                                    color={colorPalette.white}
                                    onPress={this.props.navigation.openDrawer}
                                    underlayColor={colorPalette.violet}
                                />}
                centerComponent={{ text: (name + ' ' + surname), style: { color: colorPalette.white } }}
                rightComponent={<Icon
                                    name='home'
                                    color={colorPalette.white}
                                    onPress={this.props.onHome}
                                    underlayColor={colorPalette.violet}
                                />}
                outerContainerStyles={styles.headerOuterContainer}
                />,
            <View
                key='content'
                style={ styles.contentWrapper }
                >
                <View style={styles.userInfoWrapper}>
                    <Avatar
                        xlarge
                        rounded
                        source={avatar? {uri: avatar} : null}
                        onPress={() => console.log('User  avatar pressed')}
                        activeOpacity={0.7}
                        title={name[0] + surname[0]}
                        titleStyle={{ color: colorPalette.white }}
                    />
                    <View>
                        <Text style={{fontSize: 20, color: colorPalette.white }}>{name + ' ' + surname}</Text>
                        <Badge
                            value='Online'
                            textStyle={{ color: colorPalette.white }}
                            containerStyle={{ backgroundColor: colorPalette.violet }}
                        />
                    </View>
                </View>
                <View style={styles.wallWrapper}>
                    {/*// implemented without image with header*/}
                    {/*<Card title='Friends' containerStyle={{flex: 2, marginRight: 0}}>*/}
                        {/*{*/}
                    //         friends
                    //             ?   friends.map((user, i) => {
                    //                     if(i < this.props.friendsShowCount) {
                    //                         return (
                    //                             <View key={i} style={{flexDirection: 'row',}}>
                    //                                 <Avatar
                    //                                     small
                    //                                     rounded
                    //                                     source={user.avatar ? {uri: user.avatar} : null}
                    //                                     onPress={() => console.log(user.name, ' avatar pressed')}
                    //                                     activeOpacity={0.7}
                    //                                     title={user.name[0] + user.surname[0]}
                    //                                     titleStyle={{color: colorPalette.white}}
                                                    {/*/>*/}
                                                    {/*<Text style={styles.name}*/}
                    //                                       onPress={() => console.log(user.name, ' name pressed')}>{user.name + ' ' + user.surname}</Text>
                    //                             </View>
                                            {/*);*/}
                                        {/*}*/}
                                        {/*else {*/}
                                                {/*return null*/}
                                        {/*}*/}
                                    {/*})*/}
                                {/*:   null*/}
                        {/*}*/}
                        {/*<Text style={{textAlign:'center', color: colorPalette.violet}} onPress={() => this.props.friendsShowCount+=3}>more</Text>*/}
                    {/*</Card>*/}
                    <Card title='Posts' containerStyle={{flex: 3, marginLeft: 0}}>

                    </Card>
                </View>
            </View>
        ]
    }
}


export default connect(
    state => {

        return {
            user: state.authData.user,
            friendsShowCount: 3
        }
    },
    dispatch => {
        return {
            onLogout: () => dispatch({type: LOGIN.LOG_OUT}),
            // EXAMPLE HOW NAVIGATION REDIRECT WORKS WITH REDUX
            onHome: () => dispatch(NavigationActions.navigate({routeName: 'PUBLIC', params: {}, action: NavigationActions.navigate({routeName: SCREENS.PUBLIC.WELCOME})}))
        }
    }
)(User);




const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
    // more users here
];