



// local dependencies
import { LOADER } from '../../actions/types';

const initialState = {
    animate: false
};

export default (state = initialState, action) => {
    let {type, ...options} = action;

    switch(type) {
        case LOADER.START:
            state = {...state, animate: true};
            console.log('LOADER.START');
            break;
        case LOADER.STOP:
            state = {...state, animate: false};
            console.log('LOADER.STOP');
            break;
        default:
    }

    return state;
}