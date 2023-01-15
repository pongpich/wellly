import { all } from 'redux-saga/effects';
import { saga as authSagas } from './auth';
import { saga as personalDataUserSagas } from './personalUser';


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    personalDataUserSagas(),
  ]);
}
