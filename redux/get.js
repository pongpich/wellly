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
  GET_MONTH_ACT_LOG_GRAPH: "GET_MONTH_ACT_LOG_GRAPH",
  GET_MONTH_ACT_LOG_GRAPH_SUCCESS: "GET_MONTH_ACT_LOG_GRAPH_SUCCESS",
  GET_WEEK_ACT_LOG_GRAPH: "GET_WEEK_ACT_LOG_GRAPH",
  GET_WEEK_ACT_LOG_GRAPH_SUCCESS: "GET_WEEK_ACT_LOG_GRAPH_SUCCESS",
  GET_NUTRITION_KNOWLEDGE: "GET_NUTRITION_KNOWLEDGE",
  GET_NUTRITION_KNOWLEDGE_SUCCESS: "GET_NUTRITION_KNOWLEDGE_SUCCESS",
  GET_NUTRITION_KNOWLEDGE_ACTIVITY: "GET_NUTRITION_KNOWLEDGE_ACTIVITY",
  GET_NUTRITION_KNOWLEDGE_ACTIVITY_SUCCESS: "GET_NUTRITION_KNOWLEDGE_ACTIVITY_SUCCESS",
  GET_BADGE: "GET_BADGE",
  GET_BADGE_SUCCESS: "GET_BADGE_SUCCESS",
  RESET_STATUS_NUTRITION_KNOWLEDGE_ACTIVITY: "RESET_STATUS_NUTRITION_KNOWLEDGE_ACTIVITY",
  //teach_user_home
  GET_TEACH_USER_HOME: "GET_TEACH_USER_HOME",
  GET_TEACH_USER_HOME_SUCCESS: "GET_TEACH_USER_HOME_SUCCESS",
  SET_TEACH_USER_HOME: "SET_TEACH_USER_HOME",
  SET_TEACH_USER_HOME_SUCCESS: "SET_TEACH_USER_HOME_SUCCESS",
  //teach_user_nutrition
  GET_TEACH_USER_NUTRITION: "GET_TEACH_USER_NUTRITION",
  GET_TEACH_USER_NUTRITION_SUCCESS: "GET_TEACH_USER_NUTRITION_SUCCESS",
  SET_TEACH_USER_NUTRITION: "SET_TEACH_USER_NUTRITION",
  SET_TEACH_USER_NUTRITION_SUCCESS: "SET_TEACH_USER_NUTRITION_SUCCESS",
  //teach_user_article_template
  GET_TEACH_USER_ARTICLE_TEMP: "GET_TEACH_USER_ARTICLE_TEMP",
  GET_TEACH_USER_ARTICLE_TEMP_SUCCESS: "GET_TEACH_USER_ARTICLE_TEMP_SUCCESS",
  SET_TEACH_USER_ARTICLE_TEMP: "SET_TEACH_USER_ARTICLE_TEMP",
  SET_TEACH_USER_ARTICLE_TEMP_SUCCESS: "SET_TEACH_USER_ARTICLE_TEMP_SUCCESS",
  //teach_user_exercise
  GET_TEACH_USER_EXERCISE: "GET_TEACH_USER_EXERCISE",
  GET_TEACH_USER_EXERCISE_SUCCESS: "GET_TEACH_USER_EXERCISE_SUCCESS",
  SET_TEACH_USER_EXERCISE: "SET_TEACH_USER_EXERCISE",
  SET_TEACH_USER_EXERCISE_SUCCESS: "SET_TEACH_USER_EXERCISE_SUCCESS",
  //teach_user_ex_article_template
  GET_TEACH_USER_EX_ART_TEMP: "GET_TEACH_USER_EX_ART_TEMP",
  GET_TEACH_USER_EX_ART_TEMP_SUCCESS: "GET_TEACH_USER_EX_ART_TEMP_SUCCESS",
  SET_TEACH_USER_EX_ART_TEMP: "SET_TEACH_USER_EX_ART_TEMP",
  SET_TEACH_USER_EX_ART_TEMP_SUCCESS: "SET_TEACH_USER_EX_ART_TEMP_SUCCESS",
  //teach_user_exercise_program
  GET_TEACH_USER_EXERCISE_PROGRAM: "GET_TEACH_USER_EXERCISE_PROGRAM",
  GET_TEACH_USER_EXERCISE_PROGRAM_SUCCESS: "GET_TEACH_USER_EXERCISE_PROGRAM_SUCCESS",
  SET_TEACH_USER_EXERCISE_PROGRAM: "SET_TEACH_USER_EXERCISE_PROGRAM",
  SET_TEACH_USER_EXERCISE_PROGRAM_SUCCESS: "SET_TEACH_USER_EXERCISE_PROGRAM_SUCCESS",
};


export const getTeachUserExArtTemp = (user_id) => ({
  type: types.GET_TEACH_USER_EX_ART_TEMP,
  payload: {
    user_id
  }
});
export const setTeachUserExArticleTemplate = (user_id, status) => ({
  type: types.SET_TEACH_USER_EX_ART_TEMP,
  payload: { user_id, status },
});

export const getTeachUserExercise = (user_id) => ({
  type: types.GET_TEACH_USER_EXERCISE,
  payload: {
    user_id
  }
});
export const setTeachUserExercise = (user_id, status) => ({
  type: types.SET_TEACH_USER_EXERCISE,
  payload: { user_id, status },
});

export const getTeachUserHome = (user_id) => ({
  type: types.GET_TEACH_USER_HOME,
  payload: {
    user_id
  }
});
export const setTeachUserHome = (user_id, status) => ({
  type: types.SET_TEACH_USER_HOME,
  payload: { user_id, status },
});

export const getTeachUserNutrition = (user_id) => ({
  type: types.GET_TEACH_USER_NUTRITION,
  payload: {
    user_id
  }
});
export const setTeachUserNutrition = (user_id, status) => ({
  type: types.SET_TEACH_USER_NUTRITION,
  payload: { user_id, status },
});

export const getTeachUserArticleTemp = (user_id) => ({
  type: types.GET_TEACH_USER_ARTICLE_TEMP,
  payload: {
    user_id
  }
});
export const setTeachUserArticleTemplate = (user_id, status) => ({
  type: types.SET_TEACH_USER_ARTICLE_TEMP,
  payload: { user_id, status },
});

export const getWeekActivityLogGraph = (user_id) => ({
  type: types.GET_WEEK_ACT_LOG_GRAPH,
  payload: {
    user_id
  }
})

export const resetStatusNutrionKuoeledeActivty = () => ({
  type: types.RESET_STATUS_NUTRITION_KNOWLEDGE_ACTIVITY,
  payload: {
  }
})
export const getMonthActivityLogGraph = (user_id, month) => ({
  type: types.GET_MONTH_ACT_LOG_GRAPH,
  payload: {
    user_id, month
  }
})

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
export const getNutritionKnowledge = () => ({
  type: types.GET_NUTRITION_KNOWLEDGE,
  payload: {}
});

export const getNutritionKnowledgeActivity = (user_id) => ({
  type: types.GET_NUTRITION_KNOWLEDGE_ACTIVITY,
  payload: { user_id }
});



export const getBadge = (user_id) => ({
  type: types.GET_BADGE,
  payload: { user_id }
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
const getMonthActivityLogGraphSagaAsync = async (user_id, month) => {
  try {
    const apiResult = await API.get("planforfit", "/getMonthActivityLogGraph", {
      queryStringParameters: {
        user_id, month
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const getWeekActivityLogGraphSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getWeekActivityLogGraph", {
      queryStringParameters: {
        user_id
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}

const getNutritionKnowledgeSagaAsync = async () => {
  try {
    const apiResult = await API.get("planforfit", "/getNutritionKnowledge", {
      queryStringParameters: {
      }
    });
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const getNutritionKnowledgeActivitySagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getNutritionKnowledgeActivity", {
      queryStringParameters: {
        user_id
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}


const getBadgeSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/getBadge", {
      queryStringParameters: {
        user_id
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const getTeachUserHomeSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/get_teach_user_home", {
      queryStringParameters: {
        user_id
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const getTeachUserNutritionSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/get_teach_user_nutrition", {
      queryStringParameters: {
        user_id
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const getTeachUserArticleTempSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/get_teach_user_article_template", {
      queryStringParameters: {
        user_id
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const getTeachUserExerciseSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/get_teach_user_exercise", {
      queryStringParameters: {
        user_id
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const getTeachUserExArtTempSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.get("planforfit", "/get_teach_user_ex_article_template", {
      queryStringParameters: {
        user_id
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const setTeachUserHomeSagaAsync = async (user_id, status) => {
  try {
    const apiResult = await API.post("planforfit", "/update_teach_user_home", {
      body: {
        user_id, status
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const setTeachUserNutritionSagaAsync = async (user_id, status) => {
  try {
    const apiResult = await API.post("planforfit", "/update_teach_user_nutrition", {
      body: {
        user_id, status
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const setTeachUserArticleTempSagaAsync = async (user_id, status) => {
  try {
    const apiResult = await API.post("planforfit", "/update_teach_user_article_template", {
      body: {
        user_id, status
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const setTeachUserExerciseSagaAsync = async (user_id, status) => {
  try {
    const apiResult = await API.post("planforfit", "/update_teach_user_exercise", {
      body: {
        user_id, status
      }
    });
    /*  console.log("apiResult", apiResult); */
    return apiResult
  } catch (error) {
    return { error, messsage: error.message };
  }
}
const setTeachUserExArtTempSagaAsync = async (user_id, status) => {
  try {
    const apiResult = await API.post("planforfit", "/update_teach_user_ex_article_template", {
      body: {
        user_id, status
      }
    });
    /*  console.log("apiResult", apiResult); */
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
function* getMonthActivityLogGraphSaga({ payload }) {
  const { user_id, month } = payload;
  try {
    const apiResult = yield call(
      getMonthActivityLogGraphSagaAsync,
      user_id,
      month
    );

    yield put({
      type: types.GET_MONTH_ACT_LOG_GRAPH_SUCCESS,
      payload: apiResult.results.monthLog
    })

  } catch (error) {
    console.log("error form getMonthActivityLogGraphSaga", error);
  }
}
function* getWeekActivityLogGraphSaga({ payload }) {
  const { user_id } = payload;
  try {
    const apiResult = yield call(
      getWeekActivityLogGraphSagaAsync,
      user_id
    );

    yield put({
      type: types.GET_WEEK_ACT_LOG_GRAPH_SUCCESS,
      payload: apiResult.results.weekLog
    })

  } catch (error) {
    console.log("error form getWeekActivityLogGraphSaga", error);
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

function* getNutritionKnowledgeSaga({ payload }) {
  const { } = payload;

  try {
    const apiResult = yield call(
      getNutritionKnowledgeSagaAsync
    )

    yield put({
      type: types.GET_NUTRITION_KNOWLEDGE_SUCCESS,
      payload: apiResult.results.get_nutrition_knowledge
    })

  } catch (error) {
    console.log("error form getMonthActivityLogSaga", error);
  }
}
function* getNutritionKnowledgeActivitySaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      getNutritionKnowledgeActivitySagaAsync,
      user_id
    )
    yield put({
      type: types.GET_NUTRITION_KNOWLEDGE_ACTIVITY_SUCCESS,
      payload: apiResult.results.get_nutrition_knowledge_activity
    })

  } catch (error) {
    console.log("error form getMonthActivityLogSaga", error);
  }
}

function* getBadgeSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      getBadgeSagaAsync,
      user_id
    )
    yield put({
      type: types.GET_BADGE_SUCCESS,
      payload: apiResult.results.get_badge
    })

  } catch (error) {
    console.log("error form getBadgeSaga", error);
  }
}

function* getTeachUserHomeSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      getTeachUserHomeSagaAsync,
      user_id
    )

    yield put({
      type: types.GET_TEACH_USER_HOME_SUCCESS,
      payload: (apiResult.results.teach_user_home === "true") ? true : false
    })

  } catch (error) {
    console.log("error form getTeachUserHomeSaga", error);
  }
}
function* getTeachUserNutritionSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      getTeachUserNutritionSagaAsync,
      user_id
    )
    yield put({
      type: types.GET_TEACH_USER_NUTRITION_SUCCESS,
      payload: (apiResult.results.teach_user_nutrition === "true") ? true : false
    })

  } catch (error) {
    console.log("error form getTeachUserNutritionSaga", error);
  }
}
function* getTeachUserArticleTempSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      getTeachUserArticleTempSagaAsync,
      user_id
    )
    yield put({
      type: types.GET_TEACH_USER_ARTICLE_TEMP_SUCCESS,
      payload: (apiResult.results.teach_user_article_template === "true") ? true : false
    })

  } catch (error) {
    console.log("error form getTeachUserArticleTempSaga", error);
  }
}
function* getTeachUserExerciseSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      getTeachUserExerciseSagaAsync,
      user_id
    )
    yield put({
      type: types.GET_TEACH_USER_EXERCISE_SUCCESS,
      payload: (apiResult.results.teach_user_exercise === "true") ? true : false
    })

  } catch (error) {
    console.log("error form getTeachUserExerciseSaga", error);
  }
}
function* getTeachUserExArtTempSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(
      getTeachUserExArtTempSagaAsync,
      user_id
    )
    yield put({
      type: types.GET_TEACH_USER_EX_ART_TEMP_SUCCESS,
      payload: (apiResult.results.teach_user_ex_article_template === "true") ? true : false
    })

  } catch (error) {
    console.log("error form getTeachUserExArtTempSaga", error);
  }
}
function* setTeachUserHomeSaga({ payload }) {
  const { user_id, status } = payload;

  try {
    const apiResult = yield call(
      setTeachUserHomeSagaAsync,
      user_id, status
    )

    yield put({
      type: types.SET_TEACH_USER_HOME_SUCCESS,
      payload: (status === "true") ? true : false
    })

  } catch (error) {
    console.log("error form setTeachUserHomeSaga", error);
  }
}
function* setTeachUserNutritionSaga({ payload }) {
  const { user_id, status } = payload;

  try {
    const apiResult = yield call(
      setTeachUserNutritionSagaAsync,
      user_id, status
    )

    yield put({
      type: types.SET_TEACH_USER_NUTRITION_SUCCESS,
      payload: (status === "true") ? true : false
    })

  } catch (error) {
    console.log("error form setTeachUserNutritionSaga", error);
  }
}
function* setTeachUserArticleTempSaga({ payload }) {
  const { user_id, status } = payload;

  try {
    const apiResult = yield call(
      setTeachUserArticleTempSagaAsync,
      user_id, status
    )

    yield put({
      type: types.SET_TEACH_USER_ARTICLE_TEMP_SUCCESS,
      payload: (status === "true") ? true : false
    })

  } catch (error) {
    console.log("error form setTeachUserArticleTempSaga", error);
  }
}
function* setTeachUserExerciseSaga({ payload }) {
  const { user_id, status } = payload;

  try {
    const apiResult = yield call(
      setTeachUserExerciseSagaAsync,
      user_id, status
    )

    yield put({
      type: types.SET_TEACH_USER_EXERCISE_SUCCESS,
      payload: (status === "true") ? true : false
    })

  } catch (error) {
    console.log("error form setTeachUserExerciseSaga", error);
  }
}
function* setTeachUserExArtTempSaga({ payload }) {
  const { user_id, status } = payload;

  try {
    const apiResult = yield call(
      setTeachUserExArtTempSagaAsync,
      user_id, status
    )

    yield put({
      type: types.SET_TEACH_USER_EXERCISE_SUCCESS,
      payload: (status === "true") ? true : false
    })

  } catch (error) {
    console.log("error form setTeachUserExArtTempSaga", error);
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
export function* watchGetMonthActivityLogGraph() {
  yield takeEvery(types.GET_MONTH_ACT_LOG_GRAPH, getMonthActivityLogGraphSaga)
}
export function* watchGetWeekActivityLogGraph() {
  yield takeEvery(types.GET_WEEK_ACT_LOG_GRAPH, getWeekActivityLogGraphSaga)
}
export function* watchGetNutritionKnowledge() {
  yield takeEvery(types.GET_NUTRITION_KNOWLEDGE, getNutritionKnowledgeSaga)
}
export function* watchetNutritionKnowledgeActivity() {
  yield takeEvery(types.GET_NUTRITION_KNOWLEDGE_ACTIVITY, getNutritionKnowledgeActivitySaga)
}
export function* watchetGetBadge() {
  yield takeEvery(types.GET_BADGE, getBadgeSaga)
}
export function* watchGetTeachUserHome() {
  yield takeEvery(types.GET_TEACH_USER_HOME, getTeachUserHomeSaga)
}
export function* watchSetTeachUserHome() {
  yield takeEvery(types.SET_TEACH_USER_HOME, setTeachUserHomeSaga)
}
export function* watchGetTeachUserNutrition() {
  yield takeEvery(types.GET_TEACH_USER_NUTRITION, getTeachUserNutritionSaga)
}
export function* watchSetTeachUserNutrition() {
  yield takeEvery(types.SET_TEACH_USER_NUTRITION, setTeachUserNutritionSaga)
}
export function* watchGetTeachUserArticleTemp() {
  yield takeEvery(types.GET_TEACH_USER_ARTICLE_TEMP, getTeachUserArticleTempSaga)
}
export function* watchSetTeachUserArticleTemp() {
  yield takeEvery(types.SET_TEACH_USER_ARTICLE_TEMP, setTeachUserArticleTempSaga)
}
export function* watchGetTeachUserExercise() {
  yield takeEvery(types.GET_TEACH_USER_EXERCISE, getTeachUserExerciseSaga)
}
export function* watchSetTeachUserExercise() {
  yield takeEvery(types.SET_TEACH_USER_EXERCISE, setTeachUserExerciseSaga)
}
export function* watchGetTeachUserExArtTemp() {
  yield takeEvery(types.GET_TEACH_USER_EX_ART_TEMP, getTeachUserExArtTempSaga)
}
export function* watchSetTeachUserExArtTemp() {
  yield takeEvery(types.SET_TEACH_USER_EX_ART_TEMP, setTeachUserExArtTempSaga)
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
    fork(watchGetMonthActivityLogGraph),
    fork(watchGetWeekActivityLogGraph),
    fork(watchGetNutritionKnowledge),
    fork(watchetNutritionKnowledgeActivity),
    fork(watchetGetBadge),
    fork(watchGetTeachUserHome),
    fork(watchSetTeachUserHome),
    fork(watchGetTeachUserNutrition),
    fork(watchSetTeachUserNutrition),
    fork(watchGetTeachUserArticleTemp),
    fork(watchSetTeachUserArticleTemp),
    fork(watchGetTeachUserExercise),
    fork(watchSetTeachUserExercise),
    fork(watchGetTeachUserExArtTemp),
    fork(watchSetTeachUserExArtTemp),
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
  yearLog: null,
  statusGetMonthActLogGraph: "default",
  monthLog: null,
  statusGetWeekActLogGraph: "default",
  weekLog: null,
  statusNutritionKnowledge: "default",
  nutritionKnowledge: null,
  statusNutritionKnowledgeActivity: "default",
  nutritionKnowledgeActivity: null,
  statusGetBadge: "default",
  getBadgeYou: null,
  //Home
  statusGetTeachUserHome: "default",
  teachUserHome: false,
  statusSetTeachUserHome: "default",
  //Nutrition
  statusGetTeachUserNutrition: "default",
  teachUserNutrtion: false,
  statusSetTeachUserNutrition: "default",
  //ARTICLE_TEMP
  statusGetTeachUserArtTemp: "default",
  teachUserArticleTemplate: false,
  statusSetTeachUserArtTemp: "default",
  //exercise
  statusGetTeachUserExercise: "default",
  teachUserExercise: false,
  statusSetTeachUserExercise: "default",
  //ex_article_template
  statusGetTeachUserExArticleTemplate: "default",
  teachUserExArticleTemplate: false,
  statusSetTeachUserExArticleTemplate: "default",
  //exercise_program
  statusGetTeachUserExerciseProgram: "default",
  statusTeachUserExercise: false,
  statusSetTeachUserExerciseProgram: "default",
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.GET_TEACH_USER_EX_ART_TEMP:
      return {
        ...state,
        statusGetTeachUserExArticleTemplate: "loading",
      }
    case types.GET_TEACH_USER_EX_ART_TEMP_SUCCESS:
      return {
        ...state,
        statusGetTeachUserExArticleTemplate: "success",
        teachUserExArticleTemplate: action.payload
      }
    case types.GET_TEACH_USER_EXERCISE:
      return {
        ...state,
        statusGetTeachUserExercise: "loading",
      }
    case types.GET_TEACH_USER_EXERCISE_SUCCESS:
      return {
        ...state,
        statusGetTeachUserExercise: "success",
        teachUserExercise: action.payload
      }
    case types.GET_TEACH_USER_ARTICLE_TEMP:
      return {
        ...state,
        statusGetTeachUserArtTemp: "loading",
      }
    case types.GET_TEACH_USER_ARTICLE_TEMP_SUCCESS:
      return {
        ...state,
        statusGetTeachUserArtTemp: "success",
        teachUserArticleTemplate: action.payload
      }
    case types.GET_TEACH_USER_NUTRITION:
      return {
        ...state,
        statusGetTeachUserNutrition: "loading",
      }
    case types.GET_TEACH_USER_NUTRITION_SUCCESS:
      return {
        ...state,
        statusGetTeachUserNutrition: "success",
        teachUserNutrtion: action.payload
      }
    case types.GET_TEACH_USER_HOME:
      return {
        ...state,
        statusGetTeachUserHome: "loading",
      }
    case types.GET_TEACH_USER_HOME_SUCCESS:
      return {
        ...state,
        statusGetTeachUserHome: "success",
        teachUserHome: action.payload
      }
    case types.SET_TEACH_USER_EXERCISE:
      return {
        ...state,
        statusSetTeachUserExercise: "loading",
      }
    case types.SET_TEACH_USER_EXERCISE_SUCCESS:
      return {
        ...state,
        statusSetTeachUserExercise: "success",
        teachUserExercise: action.payload
      }
    case types.SET_TEACH_USER_EX_ART_TEMP:
      return {
        ...state,
        statusSetTeachUserExArticleTemplate: "loading",
      }
    case types.SET_TEACH_USER_EX_ART_TEMP_SUCCESS:
      return {
        ...state,
        statusSetTeachUserExArticleTemplate: "success",
        teachUserExArticleTemplate: action.payload
      }
    case types.SET_TEACH_USER_HOME:
      return {
        ...state,
        statusSetTeachUserHome: "loading",
      }
    case types.SET_TEACH_USER_HOME_SUCCESS:
      return {
        ...state,
        statusSetTeachUserHome: "success",
        teachUserHome: action.payload
      }
    case types.SET_TEACH_USER_NUTRITION:
      return {
        ...state,
        statusSetTeachUserNutrition: "loading",
      }
    case types.SET_TEACH_USER_NUTRITION_SUCCESS:
      return {
        ...state,
        statusSetTeachUserNutrition: "success",
        teachUserNutrtion: action.payload
      }
    case types.SET_TEACH_USER_ARTICLE_TEMP:
      return {
        ...state,
        statusSetTeachUserArtTemp: "loading",
      }
    case types.SET_TEACH_USER_ARTICLE_TEMP_SUCCESS:
      return {
        ...state,
        statusSetTeachUserArtTemp: "success",
        teachUserArticleTemplate: action.payload
      }
    case types.GET_WEEK_ACT_LOG_GRAPH:
      return {
        ...state,
        statusGetWeekActLogGraph: "loading",
      }
    case types.GET_WEEK_ACT_LOG_GRAPH_SUCCESS:
      return {
        ...state,
        statusGetWeekActLogGraph: "success",
        weekLog: action.payload,
      }
    case types.GET_MONTH_ACT_LOG_GRAPH:
      return {
        ...state,
        statusGetMonthActLogGraph: "loading",
      }
    case types.GET_MONTH_ACT_LOG_GRAPH_SUCCESS:
      return {
        ...state,
        statusGetMonthActLogGraph: "success",
        monthLog: action.payload,
      }
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
    case types.GET_NUTRITION_KNOWLEDGE:
      return {
        ...state,
        statusNutritionKnowledge: "loading",
      }
    case types.GET_NUTRITION_KNOWLEDGE_SUCCESS:
      return {
        ...state,
        statusNutritionKnowledge: "success",
        nutritionKnowledge: action.payload,
      }
    case types.GET_BADGE:
      return {
        ...state,
        statusGetBadge: "loading",
      }
    case types.GET_BADGE_SUCCESS:
      return {
        ...state,
        statusGetBadge: "success",
        getBadgeYou: action.payload,
      }
    case types.GET_NUTRITION_KNOWLEDGE_ACTIVITY:
      return {
        ...state,
        statusNutritionKnowledgeActivity: "loading",
      }
    case types.GET_NUTRITION_KNOWLEDGE_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusNutritionKnowledgeActivity: "success",
        nutritionKnowledgeActivity: action.payload,
      }
    case types.RESET_STATUS_NUTRITION_KNOWLEDGE_ACTIVITY:
      return {
        ...state,
        statusNutritionKnowledgeActivity: "default",
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


