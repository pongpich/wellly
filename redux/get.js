import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  GET_PROFANITY: "GET_PROFANITY",
  GET_PROFANITY_SUCCESS: "GET_PROFANITY_SUCCESS",
  GET_NUTRITION_MISSION: "GET_NUTRITION_MISSION",
  GET_NUTRITION_MISSION_SUCCESS: "GET_NUTRITION_MISSION_SUCCESS",
  GET_NUTRITION_ACTIVITY_ID_MISSION: "GET_NUTRITION_ACTIVITY_ID_MISSION",
  GET_NUTRITION_ACTIVITY_ID_MISSION_SUCCESS: "GET_NUTRITION_ACTIVITY_ID_MISSION_SUCCESS",
};


export const getProfanity = () => ({
  type: types.GET_PROFANITY
});

export const getNutritionMission = () => ({
  type: types.GET_NUTRITION_MISSION
});

export const getNutritionActivityIdMission = (user_id, mission_id) => ({
  type: types.GET_NUTRITION_ACTIVITY_ID_MISSION,
  payload: {
    user_id,
    mission_id
  }
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

const getNutritionActivityIdMissionSagaAsync = async (user_id, mission_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getNutritionActivityIdMission", {
      queryStringParameters: {
        user_id,
        mission_id
      }
    });
    //  console.log("apiResult", apiResult);
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
      payload: apiResult.results.nutrition_mission[0]
    })

  } catch (error) {
    console.log("error form getNutritionMissionSaga", error);
  }
}


function* getNutritionActivityIdMissionSaga({ payload }) {
  const {
    user_id,
    mission_id
  } = payload

  try {
    const apiResult = yield call(
      getNutritionActivityIdMissionSagaAsync,
      user_id,
      mission_id
    )

    yield put({
      type: types.GET_NUTRITION_ACTIVITY_ID_MISSION_SUCCESS,
      payload: apiResult.results.nutrition_activity_id_mission[0]
    })

  } catch (error) {
    console.log("error form getNutritionActivityIdMissionSaga", error);
  }
}

export function* watchGetProfanity() {
  yield takeEvery(types.GET_PROFANITY, getProfanitySaga)
}

export function* watchGetNutritionMission() {
  yield takeEvery(types.GET_NUTRITION_MISSION, getNutritionMissionSaga)
}

export function* watchGetNutritionActivityIdMission() {
  yield takeEvery(types.GET_NUTRITION_ACTIVITY_ID_MISSION, getNutritionActivityIdMissionSaga)
}

export function* saga() {
  yield all([
    fork(watchGetProfanity),
    fork(watchGetNutritionMission),
    fork(watchGetNutritionActivityIdMission),
  ]);
}



/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  profanity: null,
  nutrition_mission: null,
  statusGetNutritionMission: "default",
  nutrition_activity_id_Mission: null
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
    case types.GET_NUTRITION_ACTIVITY_ID_MISSION:
      return {
        ...state,
        statusGetNutritionActivityIdMission: "loading",
      }
    case types.GET_NUTRITION_ACTIVITY_ID_MISSION_SUCCESS:
      return {
        ...state,
        statusGetNutritionActivityIdMission: "success",
        nutrition_activity_id_Mission: action.payload,
      }
    default:
      return { ...state };
  }
}


