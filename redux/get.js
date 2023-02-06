import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  GET_PROFANITY: "GET_PROFANITY",
  GET_PROFANITY_SUCCESS: "GET_PROFANITY_SUCCESS",
  GET_NUTRITION_MISSION: "GET_NUTRITION_MISSION",
  GET_NUTRITION_MISSION_SUCCESS: "GET_NUTRITION_MISSION_SUCCESS",
};


export const getProfanity = () => ({
  type: types.GET_PROFANITY
});

export const getNutritionMission = () => ({
  type: types.GET_NUTRITION_MISSION
});



/* END OF ACTION Section */

/* SAGA Section */

const getProfanitySagaAsync = async () => {
  try {
    const apiResult = await API.get("planforfit", "/getProfanity", {
      queryStringParameters: {

      }

    });
    // console.log("apiResult", apiResult);
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getNutritionMissionSagaAsync = async () => {
  try {
    const apiResult = await API.get("planforfit", "/getNutritionMission", {
      queryStringParameters: {

      }

    });
    // console.log("apiResult", apiResult);
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
    yield put({
      type: types.GET_PROFANITY_SUCCESS,
      payload: apiResult.results
    })

  } catch (error) {
    console.log("error form getProfanitySaga", error);
  }
}

function* getNutritionMissionSaga({ }) {
  try {
    const apiResult = yield call(
      getNutritionMissionSagaAsync
    );
    yield put({
      type: types.GET_NUTRITION_MISSION_SUCCESS,
      payload: apiResult.results
    })

  } catch (error) {
    console.log("error form getNutritionMissionSaga", error);
  }
}

export function* watchGetProfanity() {
  yield takeEvery(types.GET_PROFANITY, getProfanitySaga)
}

export function* watchGetNutritionMission() {
  yield takeEvery(types.GET_NUTRITION_MISSION, getNutritionMissionSaga)
}

export function* saga() {
  yield all([
    fork(watchGetProfanity),
    fork(watchGetNutritionMission),
  ]);
}



/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  profanity: null,
  nutrition_mission: null,
  statusGetNutritionMission: "default"
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
    case types.GET_NUTRITION_MISSION:
      return {
        ...state,
        statusGetNutritionMission: "loading"
      }
    case types.GET_NUTRITION_MISSION_SUCCESS:
      return {
        ...state,
        statusGetNutritionMission: "success",
        nutrition_mission: action.payload,
      }
    default:
      return { ...state };
  }
}


