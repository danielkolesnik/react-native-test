
// outsource dependencies

// local dependencies
import { LOGIN } from '../../actions/types';


// configuration
let initialState = {
    preloader: false,
    // auth: false,
    // user: {},
    // to be auto loggined on reload please comment two strings before and uncomment two strings after that string  [NOTICE: For dev purposes ONLY]
    auth: true,
    user: { id: 91, name: 'Test', surname: 'Testovich', nick: 'testNick', pass: 'testPass', admin: true, friends: [ {id: 92, name: 'Friend1', surname: 'A', nick: 'testNick', pass: 'testPass', admin: true, friends: []}, {id: 93, name: 'Friend2', surname: 'B', nick: 'testNick', pass: 'testPass', admin: true, friends: []}, {id: 94, name: 'Friend3', surname: 'C', nick: 'testNick', pass: 'testPass', admin: true, friends: []}, {id: 95, name: 'Friend4', surname: 'D', nick: 'testNick', pass: 'testPass', admin: true, avatar: 'https://secure.gravatar.com/avatar/1d2754df038048460d42560fd4008142?s=38&d=https%3A%2F%2Febanoe.it%2Fwp-content%2Fuploads%2F2016%2F09%2Fanonymous4.png&r=g', friends: []}, ] }
};

// export
export default function ( state = initialState, action ) {
    let { type, ...options } = action;

    switch ( type ) {
        default:
            state = {...state};
            break;
        case LOGIN.CLEAR:
            state = initialState;
            break;
        case LOGIN.PRELOADER:
            state = { ...state, preloader: options.preloader };
            break;
        case LOGIN.UPDATE_DATA:
            state = { ...state, ...options} ;
            break;
        case LOGIN.LOG_OUT:
            state = { ...state, user: {}, auth: false};
            break;
    }

    return state;
}