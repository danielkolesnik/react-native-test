
// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import login from '../components/login.form/saga';

export default function* () {
    yield fork(login);
}