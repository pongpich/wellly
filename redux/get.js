import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  GET_PROFANITY: "GET_PROFANITY",
  GET_PROFANITY_SUCCESS: "GET_PROFANITY_SUCCESS",
  GET_NUTRITION_MISSION: "GET_NUTRITION_MISSION",
  GET_NUTRITION_MISSION_SUCCESS: "GET_NUTRITION_MISSION_SUCCESS",
  GET_NUTRITION_ACTIVITY: "GET_NUTRITION_ACTIVITY",
  GET_NUTRITION_ACTIVITY_SUCCESS: "GET_NUTRITION_ACTIVITY_SUCCESS",
  GET_NUTRITION_ACTIVITY_ID_MISSION: "GET_NUTRITION_ACTIVITY_ID_MISSION",
  GET_NUTRITION_ACTIVITY_ID_MISSION_SUCCESS: "GET_NUTRITION_ACTIVITY_ID_MISSION_SUCCESS",
  GET_EXERCISE_ACTIVITY: "GET_EXERCISE_ACTIVITY",
  GET_EXERCISE_ACTIVITY_SUCCESS: "GET_EXERCISE_ACTIVITY_SUCCESS",
  GET_ACTIVITY_LIST: "GET_ACTIVITY_LIST",
  GET_ACTIVITY_LIST_SUCCESS: "GET_ACTIVITY_LIST_SUCCESS",
  SET_INTENS_FROM_EX_ART_TEMP: "SET_INTENS_FROM_EX_ART_TEMP",
  GET_MEMBER_ACT_LOG_IN_WEEK: "GET_MEMBER_ACT_LOG_IN_WEEK",
  GET_MEMBER_ACT_LOG_IN_WEEK_SUCCESS: "GET_MEMBER_ACT_LOG_IN_WEEK_SUCCESS",
  GET_ALL_TRAINING_SET: "GET_ALL_TRAINING_SET",
  GET_ALL_TRAINING_SET_SUCCESS: "GET_ALL_TRAINING_SET_SUCCESS",
  GET_TRAINING_SET: "GET_TRAINING_SET",
  GET_TRAINING_SET_SUCCESS: "GET_TRAINING_SET_SUCCESS",
  GET_MONTH_ACTIVITY_LOG: "GET_MONTH_ACTIVITY_LOG",
  GET_MONTH_ACTIVITY_LOG_SUCCESS: "GET_MONTH_ACTIVITY_LOG_SUCCESS",
  GET_YEAR_ACT_LOG_GRAPH: "GET_YEAR_ACT_LOG_GRAPH",
  GET_YEAR_ACT_LOG_GRAPH_SUCCESS: "GET_YEAR_ACT_LOG_GRAPH_SUCCESS",
};

export const getYearActivityLogGraph = (user_id, year) => ({
  type: types.GET_YEAR_ACT_LOG_GRAPH,
  payload: {
    user_id, year
  }
})

export const getMonthActivityLog = (user_id, year, month) => ({
  type: types.GET_MONTH_ACTIVITY_LOG,
  payload: {
    user_id, year, month
  }
})

export const getMemberActivityLogInWeek = (user_id) => ({
  type: types.GET_MEMBER_ACT_LOG_IN_WEEK,
  payload: {
    user_id
  }
})

export const setIntensityFromExArticleTemplate = (intensity) => ({
  type: types.SET_INTENS_FROM_EX_ART_TEMP,
  payload: {
    intensity
  }
})

export const getActivityList = (user_id) => ({
  type: types.GET_ACTIVITY_LIST,
  payload: {
    user_id
  }
});

export const getProfanity = () => ({
  type: types.GET_PROFANITY
});

export const getNutritionMission = (mission_id) => ({
  type: types.GET_NUTRITION_MISSION,
  payload: {
    mission_id
  }
});

export const getNutritionActivityIdMission = (user_id, mission_id) => ({
  type: types.GET_NUTRITION_ACTIVITY_ID_MISSION,
  payload: {
    user_id,
    mission_id
  }
});

export const getNutritionActivity = (user_id) => ({
  type: types.GET_NUTRITION_ACTIVITY,
  payload: {
    user_id
  }
});

export const getExerciserActivity = (user_id) => ({
  type: types.GET_EXERCISE_ACTIVITY,
  payload: {
    user_id
  }
});
export const getAllTrainingSet = (user_id, week_in_program) => ({
  type: types.GET_ALL_TRAINING_SET,
  payload: {
    user_id,
    week_in_program
  }
});
export const getTrainingSet = (set_code) => ({
  type: types.GET_TRAINING_SET,
  payload: {
    set_code
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
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getActivityListSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getActivityList", {
      queryStringParameters: {
        user_id
      }

    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getNutritionMissionSagaAsync = async (mission_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getNutritionMission", {
      queryStringParameters: {
        mission_id
      }

    });
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
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getNutritionActivitySagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getNutritionActivity", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getExerciserActivitySagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getExerciserActivity", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const getAllTrainingSetSagaAsync = async (user_id, week_in_program) => {

  try {
    const apiResult = await API.get("planforfit", "/getAllTrainingSet", {
      queryStringParameters: {
        user_id,
        week_in_program
      }
    });

    return apiResult
  } catch (error) {
    console.log("error", error);
    return { error, messsage: error.message };
  }
};
const getTrainingSetSagaAsync = async (set_code) => {

  try {
    const apiResult = await API.get("planforfit", "/getTrainingSet", {
      queryStringParameters: {
        set_code
      }
    });

    return apiResult
  } catch (error) {
    console.log("error", error);
    return { error, messsage: error.message };
  }
};

const getMemberActivityLogInWeekSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getMemberActivityLogInWeek", {
      queryStringParameters: {
        user_id
      }
    });

    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const getMonthActivityLogSagaAsync = async (user_id, year, month) => {
  try {
    const apiResult = await API.get("planforfit", "/getMonthActivityLog", {
      queryStringParameters: {
        user_id, year, month
      }
    });
    return apiResult
  } catch (error) {
    console.log("error", error);
    return { error, messsage: error.message };
  }
}
const getYearActivityLogGraphSagaAsync = async (user_id, year) => {
  try {
    const apiResult = await API.get("planforfit", "/getYearActivityLogGraph", {
      queryStringParameters: {
        user_id, year
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}


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

function* getActivityListSaga({ payload }) {
  const { user_id } = payload;
  try {
    const apiResult = yield call(
      getActivityListSagaAsync,
      user_id
    );

    if (apiResult) { };
    yield put({
      type: types.GET_ACTIVITY_LIST_SUCCESS,
      payload: apiResult.results.activity_list
    })

  } catch (error) {
    console.log("error form getActivityListSaga", error);
  }
}

function* getYearActivityLogGraphSaga({ payload }) {
  const { user_id, year } = payload;
  try {
    const apiResult = yield call(
      getYearActivityLogGraphSagaAsync,
      user_id,
      year
    );

    yield put({
      type: types.GET_YEAR_ACT_LOG_GRAPH_SUCCESS,
      payload: apiResult.results.yearLog
    })

  } catch (error) {
    console.log("error form getYearActivityLogGraphSaga", error);
  }
}

function* getNutritionMissionSaga({ payload }) {
  const { mission_id } = payload;
  try {
    const apiResult = yield call(
      getNutritionMissionSagaAsync,
      mission_id
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

function* getNutritionActivitySaga({ payload }) {
  const {
    user_id
  } = payload

  try {
    const apiResult = yield call(
      getNutritionActivitySagaAsync,
      user_id
    )
    yield put({
      type: types.GET_NUTRITION_ACTIVITY_SUCCESS,
      payload: apiResult.results.nutrition_activity
    })

  } catch (error) {
    console.log("error form getNutritionActivitySaga", error);
  }
}

function* getExerciserActivitySaga({ payload }) {
  const {
    user_id
  } = payload

  try {
    const apiResult = yield call(
      getExerciserActivitySagaAsync,
      user_id
    )
    yield put({
      type: types.GET_EXERCISE_ACTIVITY_SUCCESS,
      payload: apiResult.results.exerciser_activity
    })

  } catch (error) {
    console.log("error form getExerciserActivitySaga", error);
  }
}
function* getAllTrainingSetSaga({ payload }) {
  const {
    user_id,
    week_in_program
  } = payload

  try {
    const apiResult = yield call(
      getAllTrainingSetSagaAsync,
      user_id,
      week_in_program
    )
    yield put({
      type: types.GET_ALL_TRAINING_SET_SUCCESS,
      payload: apiResult.results.allTrainingSet
    })

  } catch (error) {
    console.log("error form getAllTrainingSetSaga", error);
  }
}
function* getTrainingSetSaga({ payload }) {
  const {
    set_code
  } = payload

  try {
    const apiResult = yield call(
      getTrainingSetSagaAsync,
      set_code
    )
    yield put({
      type: types.GET_TRAINING_SET_SUCCESS,
      payload: apiResult.results.trainingSet
    })

  } catch (error) {
    console.log("error form getTrainingSetSaga", error);
  }
}

function* getMemberActivityLogInWeekSaga({ payload }) {
  const {
    user_id
  } = payload

  try {
    const apiResult = yield call(
      getMemberActivityLogInWeekSagaAsync,
      user_id
    )
    yield put({
      type: types.GET_MEMBER_ACT_LOG_IN_WEEK_SUCCESS,
      payload: apiResult.results.member_activity_log_in_week
    })

  } catch (error) {
    console.log("error form getMemberActivityLogInWeekSaga", error);
  }
}

function* getMonthActivityLogSaga({ payload }) {
  const {
    user_id, year, month
  } = payload;

  try {
    const apiResult = yield call(
      getMonthActivityLogSagaAsync,
      user_id, year, month
    )
    yield put({
      type: types.GET_MONTH_ACTIVITY_LOG_SUCCESS,
      payload: apiResult.results.activityLog
    })

  } catch (error) {
    console.log("error form getMonthActivityLogSaga", error);
  }
}

export function* watchGetProfanity() {
  yield takeEvery(types.GET_PROFANITY, getProfanitySaga)
}

export function* watchGetActivityList() {
  yield takeEvery(types.GET_ACTIVITY_LIST, getActivityListSaga)
}

export function* watchGetNutritionMission() {
  yield takeEvery(types.GET_NUTRITION_MISSION, getNutritionMissionSaga)
}

export function* watchGetNutritionActivity() {
  yield takeEvery(types.GET_NUTRITION_ACTIVITY, getNutritionActivitySaga)
}

export function* watchGetNutritionActivityIdMission() {
  yield takeEvery(types.GET_NUTRITION_ACTIVITY_ID_MISSION, getNutritionActivityIdMissionSaga)
}
export function* watchGetExerciserActivity() {
  yield takeEvery(types.GET_EXERCISE_ACTIVITY, getExerciserActivitySaga)
}
export function* watchGetAllTrainingSet() {
  yield takeEvery(types.GET_ALL_TRAINING_SET, getAllTrainingSetSaga)
}
export function* watchGetTrainingSet() {
  yield takeEvery(types.GET_TRAINING_SET, getTrainingSetSaga)
}
export function* watchGetMemberActivityLogInWeek() {
  yield takeEvery(types.GET_MEMBER_ACT_LOG_IN_WEEK, getMemberActivityLogInWeekSaga)
}
export function* watchGetMonthActivityLog() {
  yield takeEvery(types.GET_MONTH_ACTIVITY_LOG, getMonthActivityLogSaga)
}
export function* watchGetYearActivityLogGraph() {
  yield takeEvery(types.GET_YEAR_ACT_LOG_GRAPH, getYearActivityLogGraphSaga)
}

export function* saga() {
  yield all([
    fork(watchGetProfanity),
    fork(watchGetNutritionMission),
    fork(watchGetNutritionActivity),
    fork(watchGetNutritionActivityIdMission),
    fork(watchGetExerciserActivity),
    fork(watchGetActivityList),
    fork(watchGetMemberActivityLogInWeek),
    fork(watchGetAllTrainingSet),
    fork(watchGetTrainingSet),
    fork(watchGetMonthActivityLog),
    fork(watchGetYearActivityLogGraph),
  ]);
}



/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  profanity: null,
  nutrition_mission: null,
  statusGetNutritionMission: "default",
  statusGetNutritionActivityIdMission: "default",
  nutrition_activity_id_Mission: null,
  statusGetNutritionActivity: "default",
  nutrition_activity: null,
  statusExerciserActivity: "default",
  exerciserActivity: null,
  statusGetActivityList: "default",
  activity_list: null,
  intensityFromExArticleTemplate: null,
  statusGetMemberActLogInWeek: "default",
  member_activity_log_in_week: null,
  statusAllTrainingSet: "default",
  allTrainingSet: null,
  statusTrainingSet: "default",
  trainingSet: null,
  status_month_act_log: "default",
  month_act_log: null,
  statusGetYearActLogGraph: "default",
  yearLog: null
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.GET_YEAR_ACT_LOG_GRAPH:
      return {
        ...state,
        statusGetYearActLogGraph: "loading",
      }
    case types.GET_YEAR_ACT_LOG_GRAPH_SUCCESS:
      return {
        ...state,
        statusGetYearActLogGraph: "success",
        yearLog: action.payload,
      }
    case types.GET_MONTH_ACTIVITY_LOG:
      return {
        ...state,
        status_month_act_log: "loading",
      }
    case types.GET_MONTH_ACTIVITY_LOG_SUCCESS:
      return {
        ...state,
        status_month_act_log: "success",
        month_act_log: action.payload,
      }
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
    case types.GET_MEMBER_ACT_LOG_IN_WEEK:
      return {
        ...state,
        statusGetMemberActLogInWeek: "loading"
      }
    case types.GET_MEMBER_ACT_LOG_IN_WEEK_SUCCESS:
      return {
        ...state,
        statusGetMemberActLogInWeek: "success",
        member_activity_log_in_week: action.payload,
      }
    case types.GET_ACTIVITY_LIST:
      return {
        ...state,
        statusGetActivityList: "loading"
      }
    case types.GET_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        statusGetActivityList: "success",
        activity_list: action.payload,
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
    case types.GET_NUTRITION_ACTIVITY:
      return {
        ...state,
        statusGetNutritionActivity: "loading",
      }
    case types.GET_NUTRITION_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusGetNutritionActivity: "success",
        nutrition_activity: action.payload,
      }
    case types.GET_EXERCISE_ACTIVITY:
      return {
        ...state,
        statusExerciserActivity: "loading",
      }
    case types.GET_EXERCISE_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusExerciserActivity: "success",
        exerciserActivity: action.payload,
      }
    case types.GET_ALL_TRAINING_SET:
      return {
        ...state,
        statusAllTrainingSet: "loading",
      }
    case types.GET_ALL_TRAINING_SET_SUCCESS:
      return {
        ...state,
        statusAllTrainingSet: "success",
        allTrainingSet: action.payload,
      }
    case types.GET_TRAINING_SET:
      return {
        ...state,
        statusTrainingSet: "loading",
      }
    case types.GET_TRAINING_SET_SUCCESS:
      return {
        ...state,
        statusTrainingSet: "success",
        trainingSet: action.payload,
      }
    case types.SET_INTENS_FROM_EX_ART_TEMP:
      return {
        ...state,
        intensityFromExArticleTemplate: action.payload
      }
    default:
      return { ...state };
  }
}


