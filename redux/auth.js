import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",
  LOGOUT_USER: "LOGOUT_USER",
  UPDATE_DISPLAY_NAME: "UPDATE_DISPLAY_NAME",
  UPDATE_DISPLAY_NAME_SUCCESS: "UPDATE_DISPLAY_NAME_SUCCESS",
  UPDATE_PERSONAL_DATA: "UPDATE_PERSONAL_DATA",
  UPDATE_PERSONAL_DATA_SUCCESS: "UPDATE_PERSONAL_DATA_SUCCESS",
  UPDATE_HEALTH_DATA: "UPDATE_HEALTH_DATA",
  UPDATE_HEALTH_DATA_SUCCESS: "UPDATE_HEALTH_DATA_SUCCESS",
  REGISTER: "REGISTER",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  RESET_STATUS_REGISTER: "RESET_STATUS_REGISTER",
  DELETE_ACCOUNT: "DELETE_ACCOUNT",
  DELETE_ACCOUNT_SUCCESS: "DELETE_ACCOUNT_SUCCESS",
  RESET_STATUS_DELETE_ACC: "RESET_STATUS_DELETE_ACC",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS",
  AUTHENTICATION_TOKEN: "AUTHENTICATION_TOKEN",
  AUTHENTICATION_ID_TOKEN: "AUTHENTICATION_ID_TOKEN",
};

export const resetStatusRegister = () => ({
  type: types.RESET_STATUS_REGISTER
})
export const authenticationToken = (authentication) => ({
  type: types.AUTHENTICATION_TOKEN,
  payload: {
    authentication,
  }
})
export const authenticationIdToken = (id_token) => ({
  type: types.AUTHENTICATION_ID_TOKEN,
  payload: {
    id_token,
  }
})


export const logoutUser = () => ({
  type: types.LOGOUT_USER
});


export const loginUser = (email, password) => ({
  type: types.LOGIN_USER,
  payload: {
    email,
    password
  }
});

export const register = (email, password) => ({
  type: types.REGISTER,
  payload: {
    email,
    password
  }
});

export const deleteAccount = (user_id) => ({
  type: types.DELETE_ACCOUNT,
  payload: {
    user_id
  }
});

export const resetStatusDeleteAcc = () => ({
  type: types.RESET_STATUS_DELETE_ACC

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

export const updateHealthData = (user_id, health_data, health_type) => ({
  type: types.UPDATE_HEALTH_DATA,
  payload: {
    user_id,
    health_data,
    health_type
  },
});

export const update_password = (user_id, password) => ({
  type: types.UPDATE_PASSWORD,
  payload: {
    user_id,
    password,
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

const updateHealthDataSagaAsync = async (
  user_id,
  health_data,
  health_type
) => {

  try {
    const apiResult = await API.post("planforfit", "/updateHealthData", {
      body: {
        user_id,
        health_data,
        health_type
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

const deleteAccountSagaAsync = async (
  user_id
) => {
  try {
    const apiResult = await API.get("planforfit", "/deleteAccount", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const registerSagaAsync = async (
  email,
  password
) => {
  try {

    const apiResult = await API.post("planforfit", "/register", {
      body: {
        email,
        password
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const update_passwordSagaAsync = async (
  user_id,
  password,
) => {

  try {

    const apiResult = await API.post("planforfit", "/updatePassword", {
      body: {
        user_id,
        password
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
function* deleteAccountSaga({ payload }) {
  const {
    user_id
  } = payload

  try {
    const apiResult = yield call(
      deleteAccountSagaAsync,
      user_id
    );

    if (apiResult && apiResult.results) {
      if (apiResult.results.message === "success") {

        yield put({
          type: types.DELETE_ACCOUNT_SUCCESS
        })

      }
    }

  } catch (error) {
    console.log("error form deleteAccountSaga", error);
  }
}

function* registerSaga({ payload }) {
  const {
    email,
    password
  } = payload

  try {
    const apiResult = yield call(
      registerSagaAsync,
      email,
      password
    );


    yield put({
      type: types.REGISTER_SUCCESS
    })
    console.log("register SUCCESS");


  } catch (error) {
    console.log("error form registerSaga", error);
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

function* updateHealthDataSaga({ payload }) {
  const {
    user_id,
    health_data,
    health_type
  } = payload

  try {
    const apiResult = yield call(
      updateHealthDataSagaAsync,
      user_id,
      health_data,
      health_type
    );
    yield put({
      type: types.UPDATE_HEALTH_DATA_SUCCESS,
      payload: health_data
    })
  } catch (error) {
    console.log("error form updateHealthDataSaga", error);
  }
}


function* update_passwordSaga({ payload }) {
  const {
    user_id,
    password
  } = payload

  try {
    const apiResult = yield call(
      update_passwordSagaAsync,
      user_id,
      password
    );
    console.log("apiResult", apiResult);

    yield put({
      type: types.UPDATE_PASSWORD_SUCCESS,
      payload: apiResult.results.password
    })

  } catch (error) {
    console.log("error form update_password", error);
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
export function* watchUpdateHealthData() {
  yield takeEvery(types.UPDATE_HEALTH_DATA, updateHealthDataSaga)
}

export function* watchRegister() {
  yield takeEvery(types.REGISTER, registerSaga)
}

export function* watchDeleteAccount() {
  yield takeEvery(types.DELETE_ACCOUNT, deleteAccountSaga)
}

export function* watchUpdate_password() {
  yield takeEvery(types.UPDATE_PASSWORD, update_passwordSaga)
}

export function* saga() {
  yield all([
    fork(watchLoginUser),
    fork(watchUpdateDisplayName),
    fork(watchUpdatePersonalData),
    fork(watchUpdateHealthData),
    fork(watchRegister),
    fork(watchDeleteAccount),
    fork(watchUpdate_password),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  user: null,
  status: "default",
  statusUpdateDisplayName: "default",
  statusUpdatePersonalData: "default",
  statusUpdateHealthData: "default",
  statusRegister: "default",
  statusDeleteAcc: "default",
  statusUpdatePassword: "default",
  authentication: null,
  idToken: null

};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.RESET_STATUS_DELETE_ACC:
      return {
        ...state,
        statusDeleteAcc: "default",
      };
    case types.DELETE_ACCOUNT:
      return {
        ...state,
        statusDeleteAcc: "loading",
      };
    case types.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        statusDeleteAcc: "success",
      };
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
    case types.UPDATE_HEALTH_DATA:
      return {
        ...state,
        statusUpdateHealthData: 'loading'
      };
    case types.UPDATE_HEALTH_DATA_SUCCESS:
      return {
        ...state,
        statusUpdateHealthData: 'success',
        user: {
          ...state.user,
          health_data: action.payload
        }
      };
    case types.RESET_STATUS_REGISTER:
      return {
        ...state,
        statusRegister: "default"
      };
    case types.REGISTER:
      return {
        ...state,
        statusRegister: "loading"
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        statusRegister: "success"
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        statusRegister: "fail"
      };
    case types.UPDATE_PASSWORD:
      return {
        ...state,
        statusUpdatePassword: "loading"
      };
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        statusUpdatePassword: "success",
        user: {
          ...state.user,
          password: action.payload
        }
      };
    case types.AUTHENTICATION_TOKEN:
      return {
        ...state,
        authentication: action.payload.authentication
      };
    case types.AUTHENTICATION_ID_TOKEN:
      return {
        ...state,
        idToken: action.payload.id_token
      };
    case types.LOGOUT_USER:
      return INIT_STATE;
    default:
      return { ...state };
  }
}

/* END OF REDUCER Section */
