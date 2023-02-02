import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",
  UPDATE_DISPLAY_NAME: "UPDATE_DISPLAY_NAME",
  UPDATE_DISPLAY_NAME_SUCCESS: "UPDATE_DISPLAY_NAME_SUCCESS",
  UPDATE_PERSONAL_DATA: "UPDATE_PERSONAL_DATA",
  UPDATE_PERSONAL_DATA_SUCCESS: "UPDATE_PERSONAL_DATA_SUCCESS",
};




export const loginUser = (email, password) => ({
  type: types.LOGIN_USER,
  payload: {
    email,
    password
  }
});


export const updateDisplayName = (user_id, display_name) => ({
  type: types.UPDATE_DISPLAY_NAME,
  payload: {
    user_id, display_name
  },
});

export const updatePersonalData = (user_id, personal_data) => ({
  type: types.UPDATE_PERSONAL_DATA,
  payload: {
    user_id, personal_data
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

const updatePersonalDataSagaAsync = async (
  user_id,
  personal_data
) => {
  try {
    const apiResult = await API.post("planforfit", "/updatePersonalData", {
      body: {
        user_id,
        personal_data
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const loginUserSagaAsync = async (
  email,
  password
) => {
  try {
    const apiResult = await API.get("planforfit", "/login", {
      queryStringParameters: {
        email: email,
        password: password
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};



function* loginUserSaga({ payload }) {
  const {
    email,
    password
  } = payload

  try {
    const loginResult = yield call(
      loginUserSagaAsync,
      email,
      password
    );

    if (loginResult && loginResult.results) {
      if (loginResult.results.message === "success") {

        yield put({
          type: types.LOGIN_USER_SUCCESS,
          payload: loginResult.results.user
        })

      } else {
        yield put({
          type: types.LOGIN_USER_FAIL,
          payload: loginResult.results
        })

      }
    }

  } catch (error) {
    console.log("error form login", error);
  }
}

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

function* updatePersonalDataSaga({ payload }) {
  const {
    user_id,
    personal_data
  } = payload
  try {
    const apiResult = yield call(
      updatePersonalDataSagaAsync,
      user_id,
      personal_data
    );
    yield put({
      type: types.UPDATE_PERSONAL_DATA_SUCCESS,
      payload: personal_data
    })
  } catch (error) {
    console.log("error form updatePersonalDataSaga", error);
  }
}

export function* watchLoginUser() {
  yield takeEvery(types.LOGIN_USER, loginUserSaga)
}

export function* watchUpdateDisplayName() {
  yield takeEvery(types.UPDATE_DISPLAY_NAME, updateDisplayNameSaga)
}

export function* watchUpdatePersonalData() {
  yield takeEvery(types.UPDATE_PERSONAL_DATA, updatePersonalDataSaga)
}

export function* saga() {
  yield all([
    fork(watchLoginUser),
    fork(watchUpdateDisplayName),
    fork(watchUpdatePersonalData),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  user: null,
  status: "default",
  statusUpdateDisplayName: "default",
  statusUpdatePersonalData: "default"
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        status: "loading",
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        status: "success",
      };
    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        status: "fail",
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
        user: {
          ...state.user,
          display_name: action.payload
        }
      };
    case types.UPDATE_PERSONAL_DATA:
      return {
        ...state,
        statusUpdatePersonalData: 'loading'
      };
    case types.UPDATE_PERSONAL_DATA_SUCCESS:
      return {
        ...state,
        statusUpdatePersonalData: 'success',
        user: {
          ...state.user,
          personal_data: action.payload
        }
      };
    default:
      return { ...state };
  }
}

/* END OF REDUCER Section */
