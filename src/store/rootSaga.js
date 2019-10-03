import { takeEvery } from 'redux-saga/effects';

export function* handleTestSaga({ payload: operationCode }) {}

export default function* rootSaga() {
  yield takeEvery({ type: 'TEST_TYPE' }, handleTestSaga);
}
