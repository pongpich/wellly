import { all } from 'redux-saga/effects';
import { saga as authSagas } from './auth';
import { saga as getSagas } from './get';
import { saga as updateSagas } from './update';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    getSagas(),
    updateSagas(),
  ]);
}
