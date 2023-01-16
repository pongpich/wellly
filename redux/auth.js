import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",
};




export const loginUser = (email, password) => ({
  type: types.LOGIN_USER,
  payload: {
    email,
    password
  }
});



/* END OF ACTION Section */

/* SAGA Section */

const loginUserSagaAsync = async (
  email,
  password
) => {
  console.log("loginUserSagaAsync");
  try {
    console.log("loginUserSagaAsync_1");
    const apiResult = await API.get("planforfit", "/login", {
      queryStringParameters: {
        email: email,
        password: password
      }
    });
    return apiResult
  } catch (error) {
    console.log("loginUserSagaAsync_2");
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
      console.log("loginResult",loginResult.results);
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



export function* watchLoginUser() {
  yield takeEvery(types.LOGIN_USER, loginUserSaga)
}



export function* saga() {
  yield all([
    fork(watchLoginUser),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  user: null,
  status: "default",
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
    default:
      return { ...state };
  }
}

/* END OF REDUCER Section */
