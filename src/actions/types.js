
export const SUFFIX = {
    START: 'START',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    FINISH: 'FINISH',
};

export function createType ( type ) {
    let action = {};
    for ( let name of Object.keys(SUFFIX) ) {
        action[name] = `${type}.${SUFFIX[name]}`;
    }
    return action;
}

let loginPrefix = '@login-page/';
export const LOGIN = {
    // simple
    PRELOADER: loginPrefix+'PRELOADER',
    CHECK_DATA: createType(loginPrefix+'CHECK_DATA'),
    UPDATE_DATA: loginPrefix+'UPDATE_DATA',
    HANDLE_ERROR: loginPrefix+'HANDLE_ERROR',
    CLEAR: loginPrefix+'CLEAR',
    // complex
    LOG_IN: loginPrefix+'LOG_IN',
    LOG_OUT: loginPrefix+'LOG_OUT'
};

export const LOADER = {
    START: 'START',
    STOP: 'STOP'
};
