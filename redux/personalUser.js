import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  PERSONAL_USER: "PERSONAL_USER",
  HEALT_USER: "HEALT_USER",
  UPDATE_DISPLAY_NAME: "UPDATE_DISPLAY_NAME",
  UPDATE_DISPLAY_NAME_SUCCESS: "UPDATE_DISPLAY_NAME_SUCCESS",
  LENG_APP: "LENG_APP",
};




export const personal = (sex, age, weight, height, exercise) => ({
  type: types.PERSONAL_USER,
  payload: {
    sex,
    age,
    weight,
    height,
    exercise,
  },
});

export const healt = (fpg, hba1c, sbp, dbp, exercise) => ({
  type: types.HEALT_USER,
  payload: {
    fpg,
    hba1c,
    sbp,
    dbp,
    exercise
  },
});
export const updateDisplayName = (user_id, display_name) => ({
  type: types.UPDATE_DISPLAY_NAME,
  payload: {
    user_id, display_name
  },
});
export const lengThEn = (leng) => ({
  type: types.LENG_APP,
  payload: {
    leng,
  },
});
/* END OF ACTION Section */

/* SAGA Section */

const updateDisplayNameSagaAsync = async (
  user_id,
  display_name
) => {
  try {
    const apiResult = await API.post("planforfit", "/updateDisplayName", {
      body: {
        user_id,
        display_name
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};


function* updateDisplayNameSaga({ payload }) {
  const {
    user_id,
    display_name
  } = payload
  try {
    const apiResult = yield call(
      updateDisplayNameSagaAsync,
      user_id,
      display_name
    );
    yield put({
      type: types.UPDATE_DISPLAY_NAME_SUCCESS,
      payload: display_name
    })
  } catch (error) {
    console.log("error form updateDisplayNameSaga", error);
  }
}

export function* watchUpdateDisplayName() {
  yield takeEvery(types.UPDATE_DISPLAY_NAME, updateDisplayNameSaga)
}

export function* saga() {
  yield all([
    fork(watchUpdateDisplayName),
  ]);
}
/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  dataUser: null,
  healtDataUser: null,
  profanity: null,
  display_name: null,
  statusUpdateDisplayName: "default",
  leng: "th",
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.PERSONAL_USER:
      return {
        ...state,
        dataUser: action.payload,
      };
    case types.HEALT_USER:
      return {
        ...state,
        healtDataUser: action.payload,
      };
    case types.UPDATE_DISPLAY_NAME:
      return {
        ...state,
        statusUpdateDisplayName: 'loading'
      };
    case types.UPDATE_DISPLAY_NAME_SUCCESS:
      return {
        ...state,
        statusUpdateDisplayName: 'success',
        display_name: action.payload,
      };
    case types.LENG_APP:
      return {
        ...state,
        leng: action.payload,
      };
    default:
      return { ...state };
  }
}

/* END OF REDUCER Section */
