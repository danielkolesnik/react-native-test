
// outsource dependencies
import {
    takeEvery,
    call,
    put,
    take
} from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

// local dependencies
import { LOADER, LOGIN } from '../../actions/types';
import SCREENS from "../../navigation/screens";

//
function* loginSaga( action ) {
    let { type, ...options } = action;

    // turn on preloader on login page
    yield put({type: LOADER.START});

    // starting procedure of checking is there is user with entered { nick, pass } = options
    yield put({type: LOGIN.CHECK_DATA.START, ...options });

    // taking result of checking user login information
    let result = yield take([LOGIN.CHECK_DATA.SUCCESS, LOGIN.CHECK_DATA.ERROR]);

    switch(result.type) {
        // if login information correct & there is user with entered nick & pass
        case LOGIN.CHECK_DATA.SUCCESS:
            let { type, ...pureResult } = result;
            // send data to reducer
            yield put({ type: LOGIN.UPDATE_DATA, ...pureResult });
            // action to navigate
            yield put(NavigationActions.navigate({routeName: 'PRIVATE'}));

            break;
        // if something happened
        case LOGIN.CHECK_DATA.ERROR:
            // emulating of assync error response
            // let error = yield delay(2*1000, result.error);
            let { error } = result;
            // send error to reducer
            yield put({ type: LOGIN.UPDATE_DATA, ...error });

            break;
        default:
    }

    // turn off preloader on login page
    yield put({type: LOADER.STOP});

}

function* checkLoginSaga( action ) {
    let { type, ...options } = action;
    try {
        let result = yield call(checkData, options);

        yield put({type: LOGIN.CHECK_DATA.SUCCESS, ...result});
        // console.log(NavigationActions.navigate({routeName: 'PUBLIC'}));

    } catch ( error ) {
        console.log('SOMETHING WENT WRONG IN LoginForm.saga/checkLoginSaga');
        yield put({type: LOGIN.CHECK_DATA.ERROR, error});

    }

    yield put({type: LOGIN.CHECK_DATA.FINISH});
}

// Export root watcher for "LOGIN"
export default function* () {
    yield takeEvery( LOGIN.CHECK_DATA.START, checkLoginSaga );
    yield takeEvery( LOGIN.LOG_IN, loginSaga );
}

function findUser(nick, pass) {
    for(let user of usersBase) {
        if(user.nick === nick && user.pass === pass) {
            user.friends = getFriends(user.friends);
            return user;
        }
    }
    return false;
}

function getFriends(friendsIds) {
    let friends = [];
    for(let i = 0; i < friendsIds.length; i++) {
        for(let user of usersBase) {
            if(friendsIds[i] === user.id) {
                friends.push(user);
            }
        }
    }
    return friends;
}

function checkData ( {nick, pass, ...options} ) {

    return new Promise((resolve, reject) => {
        let user = findUser(nick, pass);
        if( user ) {
            setTimeout(()=> {
                resolve({
                    user: user ? user : {},
                    auth: user ? true : false,
                    userDoesNotExist: false
                });
            }, 3*1000);
        } else {
            setTimeout(()=> {
                reject({userDoesNotExist: true, user: {}, auth: false});
            }, 5*1000);
        }
    });
}



const usersBase = [
    {
        id: 45,
        name: 'Boris',
        surname: ' Molotovsky',
        nick: 'Medved',
        pass: 'vata2018',
        admin: false,
        avatar: 'https://image.ibb.co/eoHai0/boris.png',
        friends: [ 14 ]
    },
    {
        id: 0,
        name: 'Daniel',
        surname: 'Kolesnik',
        nick: 'admin',
        pass: 'root11',
        admin: true,
        avatar: 'https://image.ibb.co/j4smqf/admin.png',
        friends: [ 5, 14, 45 ]
    },
    {
        id: 14,
        name: 'Katya',
        surname: 'Ivanova',
        nick: 'katysha',
        pass: 'notsosmart',
        admin: false,
        avatar: 'https://image.ibb.co/cu9MO0/katya.png',
        friends: [ 45 ]
    },
    {
        id: 5,
        name: 'Anon',
        surname: 'Anonov',
        nick: 'anonimus',
        pass: 'governmentshallnotpass',
        admin: false,
        avatar: 'https://secure.gravatar.com/avatar/1d2754df038048460d42560fd4008142?s=38&d=https%3A%2F%2Febanoe.it%2Fwp-content%2Fuploads%2F2016%2F09%2Fanonymous4.png&r=g',
        friends: [ ]
    }
];