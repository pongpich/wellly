import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
    GET_PROFANITY: "GET_PROFANITY",
    GET_PROFANITY_SUCCESS: "GET_PROFANITY_SUCCESS",
  };
  

  export const getProfanity = () => ({
    type: types.GET_PROFANITY
});
  


/* END OF ACTION Section */

/* SAGA Section */

const getProfanitySagaAsync = async () => {
    try {
      const apiResult = await API.get("planforfit", "/getProfanity", {
        queryStringParameters: {
        
        }
      });
      return apiResult
    } catch (error) {
      return { error, messsage: error.message };
    }
  };
  

  function* getProfanitySaga({ }) {
    try {
      const apiResult = yield call(
        getProfanitySagaAsync
      );
  
/*       console.log("apiResult",apiResult.results); */
     yield put({
        type: types.GET_PROFANITY_SUCCESS,
        payload: apiResult.results
      })
  
    } catch (error) {
      console.log("error form login", error);
    }
  }

  export function* watchGetProfanity() {
    yield takeEvery(types.GET_PROFANITY, getProfanitySaga)
  }
  
  export function* saga() {
    yield all([
      fork(watchGetProfanity),
    ]);
  }
  


/* END OF SAGA Section */

/* REDUCER Section */

 const INIT_STATE = {
    profanity: null
  };
  
  export function reducer(state = INIT_STATE, action) {
    switch (action.type) {
      case types.GET_PROFANITY:
        return {
          ...state,
          profanity: "loading"
        }
      case types.GET_PROFANITY_SUCCESS:
        return {
          ...state,
          profanity: action.payload,
        }
      default:
        return { ...state };
    }
}


