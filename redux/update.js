import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  UPDATE_QUIZ_ACTIVITIES: "UPDATE_QUIZ_ACTIVITIES",
  UPDATE_QUIZ_ACTIVITIES_SUCCESS: "UPDATE_QUIZ_ACTIVITIES_SUCCESS",
  INSERT_NUTRITION_ACTIVITY: "INSERT_NUTRITION_ACTIVITY",
  INSERT_NUTRITION_ACTIVITY_SUCCESS: "INSERT_NUTRITION_ACTIVITY_SUCCESS",
  INSERT_NUTRITION_KNOWLEDGA_ACTIVITY: "INSERT_NUTRITION_KNOWLEDGA_ACTIVITY",
  INSERT_NUTRITION_KNOWLEDGA_ACTIVITY_SUCCESS:
    "INSERT_NUTRITION_KNOWLEDGA_ACTIVITY_SUCCESS",
  UPDATE_ASSESSMENT_KIT_ACIVTIES: "UPDATE_ASSESSMENT_KIT_ACIVTIES",
  UPDATE_ASSESSMENT_KIT_ACIVTIES_SUCCESS:
    "UPDATE_ASSESSMENT_KIT_ACIVTIES_SUCCESS",
  INSERT_EXERCISE_ACTIVITY: "INSERT_EXERCISE_ACTIVITY",
  INSERT_EXERCISE_ACTIVITY_SUCCESS: "INSERT_EXERCISE_ACTIVITY_SUCCESS",
  UPDARE_POPUP_STARS: "UPDARE_POPUP_STARS",
  UPDARE_POPUP_STARS_SUCCESS: "UPDARE_POPUP_STARS_SUCCESS",
  UPDATE_NUMBER_COMPLETED: "UPDATE_NUMBER_COMPLETED",
  UPDATE_NUMBER_COMPLETED_SUCCESS: "UPDATE_NUMBER_COMPLETED_SUCCESS",
  RESET_STATUS_UPDATE_NUMB_COMP: "RESET_STATUS_UPDATE_NUMB_COMP",
  ADD_ACTIVITY_LIST_ADD_ON: "ADD_ACTIVITY_LIST_ADD_ON",
  ADD_ACTIVITY_LIST_ADD_ON_SUCCESS: "ADD_ACTIVITY_LIST_ADD_ON_SUCCESS",
  DELETE_ACTIVITY_LIST_ADD_ON: "DELETE_ACTIVITY_LIST_ADD_ON",
  DELETE_ACTIVITY_LIST_ADD_ON_SUCCESS: "DELETE_ACTIVITY_LIST_ADD_ON_SUCCESS",
  EDIT_ACT_LIST_ADD_ON: "EDIT_ACT_LIST_ADD_ON",
  EDIT_ACT_LIST_ADD_ON_SUCCESS: "EDIT_ACT_LIST_ADD_ON_SUCCESS",
  CHECK_UPDATE_BADGE_WIN: "CHECK_UPDATE_BADGE_WIN",
  CHECK_UPDATE_BADGE_WIN_SUCCESS: "CHECK_UPDATE_BADGE_WIN_SUCCESS",
  UPDATE_READ_EXERCISE_ACTIVITY: "UPDATE_READ_EXERCISE_ACTIVITY",
  UPDATE_READ_EXERCISE_ACTIVITY_SUCCESS:
    "UPDATE_READ_EXERCISE_ACTIVITY_SUCCESS",
  INSERT_EVENT_ACTIVITY: "INSERT_EVENT_ACTIVITY",
  INSERT_EVENT_ACTIVITY_SUCCESS: "INSERT_EVENT_ACTIVITY_SUCCESS",
  INSERT_EVENT_ACTIVITY_DONE: "INSERT_EVENT_ACTIVITY_DONE",
  UPDATE_EVENT_STEPCOUNT_DISTANCE: "UPDATE_EVENT_STEPCOUNT_DISTANCE",
  UPDATE_EVENT_STEPCOUNT_DISTANCE_SUCCESS: "UPDATE_EVENT_STEPCOUNT_DISTANCE_SUCCESS",
  UPDATE_EVENT_STEPCOUNT_DISTANCE_FILE: "UPDATE_EVENT_STEPCOUNT_DISTANCE_FILE",
  STATUS_EVENT_STEPCOUNT_DISTANCE: "STATUS_EVENT_STEPCOUNT_DISTANCE",
};

export const checkUpdateBadgeWin = (user_id) => ({
  type: types.CHECK_UPDATE_BADGE_WIN,
  payload: {
    user_id,
  },
});

export const editActivityListAddOn = (
  user_id,
  activity_id,
  activity_name,
  intensity
) => ({
  type: types.EDIT_ACT_LIST_ADD_ON,
  payload: {
    user_id,
    activity_id,
    activity_name,
    intensity,
  },
});
export const updateEventStepCount_Distance = (
  user_id, event_id, stepCount, distance, distance_goal, stepCount_goal
) => ({
  type: types.UPDATE_EVENT_STEPCOUNT_DISTANCE,
  payload: {
    user_id, event_id, stepCount, distance, distance_goal, stepCount_goal
  },
});

export const statusEventStepCount_Distance = (
) => ({
  type: types.STATUS_EVENT_STEPCOUNT_DISTANCE,
  payload: {

  },
});

export const addActivityListAddOn = (user_id, activity_name, intensity) => ({
  type: types.ADD_ACTIVITY_LIST_ADD_ON,
  payload: {
    user_id,
    activity_name,
    intensity,
  },
});

export const addEventActivity = (id, user_id, walk_step, distance) => ({
  type: types.INSERT_EVENT_ACTIVITY,
  payload: {
    id,
    user_id,
    walk_step,
    distance,
  },
});

export const deleteActivityListAddOn = (user_id, activity_id) => ({
  type: types.DELETE_ACTIVITY_LIST_ADD_ON,
  payload: {
    user_id,
    activity_id,
  },
});

export const resetStatusUpdateNumbComp = () => ({
  type: types.RESET_STATUS_UPDATE_NUMB_COMP,
});

export const updateNumberCompleted = (
  user_id,
  activity_id,
  week_in_program,
  activity,
  intensity,
  type,
  duration,
  note
) => ({
  type: types.UPDATE_NUMBER_COMPLETED,
  payload: {
    user_id,
    activity_id,
    week_in_program,
    activity,
    intensity,
    type,
    duration,
    note,
  },
});

export const update_quiz_activities = (
  user_id,
  week_in_program,
  quiz_activities,
  quiz_activities_number
) => ({
  type: types.UPDATE_QUIZ_ACTIVITIES,
  payload: {
    user_id,
    week_in_program,
    quiz_activities,
    quiz_activities_number,
  },
});

export const update_assessment_kit_activties = (
  user_id,
  week_in_program,
  assessment_kit_activties,
  assessment_kit_number
) => ({
  type: types.UPDATE_ASSESSMENT_KIT_ACIVTIES,
  payload: {
    user_id,
    week_in_program,
    assessment_kit_activties,
    assessment_kit_number,
  },
});

export const update_popUp_stars = (user_id, week_in_program, popup_stary) => ({
  type: types.UPDARE_POPUP_STARS,
  payload: {
    user_id,
    week_in_program,
    popup_stary,
  },
});
export const updateReadExerciserActivity = (
  user_id,
  week_in_program,
  read_article
) => ({
  type: types.UPDATE_READ_EXERCISE_ACTIVITY,
  payload: {
    user_id,
    week_in_program,
    read_article,
  },
});

export const insertNutritionActivity = (user_id) => ({
  type: types.INSERT_NUTRITION_ACTIVITY,
  payload: {
    user_id,
  },
});
export const insertExerciseActivity = (user_id) => ({
  type: types.INSERT_EXERCISE_ACTIVITY,
  payload: {
    user_id,
  },
});

export const insertNutritionKnowledgeActivity = (
  user_id,
  knowledge,
  score,
  assess_knowledge
) => ({
  type: types.INSERT_NUTRITION_KNOWLEDGA_ACTIVITY,
  payload: {
    user_id,
    knowledge,
    score,
    assess_knowledge,
  },
});

/* END OF ACTION Section */

/* SAGA Section */

const update_quiz_activitiesSagaAsync = async (
  user_id,
  week_in_program,
  quiz_activities,
  quiz_activities_number
) => {
  try {
    const apiResult = await API.post("planforfit", "/updateQuizActivities", {
      body: {
        user_id,
        week_in_program,
        quiz_activities,
        quiz_activities_number,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updateEventStepCount_DistanceSagaAsync = async (
  user_id, event_id, stepCount, distance, distance_goal, stepCount_goal

) => {
  try {
    const apiResult = await API.post("planforfit", "/updateEventStepCountDistance", {
      body: {
        user_id, event_id, stepCount, distance, distance_goal, stepCount_goal
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const update_assessment_kit_activtiesSagaAsync = async (
  user_id,
  week_in_program,
  assessment_kit_activties,
  assessment_kit_number
) => {
  try {
    const apiResult = await API.post(
      "planforfit",
      "/updateAssessmentKitActivties",
      {
        body: {
          user_id,
          week_in_program,
          assessment_kit_activties,
          assessment_kit_number,
        },
      }
    );

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const update_popUp_starsSagaAsync = async (
  user_id,
  week_in_program,
  popup_stary
) => {
  try {
    const apiResult = await API.post("planforfit", "/updatPopupSatry", {
      body: {
        user_id,
        week_in_program,
        popup_stary,
      },
    });

    /*  console.log("apiResult", apiResult); */
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const updateReadExerciserActivitySagaAsync = async (
  user_id,
  week_in_program,
  read_article
) => {
  try {
    const apiResult = await API.post(
      "planforfit",
      "/updateReadExerciserActivity",
      {
        body: {
          user_id,
          week_in_program,
          read_article,
        },
      }
    );

    /* console.log("apiResult", apiResult); */
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const insertNutritionActivitySagaAsync = async (user_id) => {
  try {
    const apiResult = await API.post("planforfit", "/insertNutritionActivity", {
      body: {
        user_id,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const insertExerciseActivitySagaAsync = async (user_id) => {
  try {
    const apiResult = await API.post("planforfit", "/insertExerciseActivity", {
      body: {
        user_id,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const insertNutritionKnowledgeActivitySagaAsync = async (
  user_id,
  knowledge,
  score,
  assess_knowledge
) => {
  try {
    const apiResult = await API.post(
      "planforfit",
      "/insertNutritionKnowledgeActivity",
      {
        body: {
          user_id,
          knowledge,
          score,
          assess_knowledge,
        },
      }
    );

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const updateNumberCompletedSagaAsync = async (
  user_id,
  activity_id,
  week_in_program,
  activity,
  intensity,
  type,
  duration,
  note
) => {
  try {
    const apiResult = await API.post("planforfit", "/updateNumberCompleted", {
      body: {
        user_id,
        activity_id,
        week_in_program,
        activity,
        intensity,
        type,
        duration,
        note,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};
const addActivityListAddOnSagaAsync = async (
  user_id,
  activity_name,
  intensity
) => {
  try {
    const apiResult = await API.post("planforfit", "/addActivityListAddOn", {
      body: {
        user_id,
        activity_name,
        intensity,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const addEventActivitySagaAsync = async (id, user_id, walk_step, distance) => {
  try {
    const apiResult = await API.post("planforfit", "/register_event_activity", {
      body: {
        id,
        user_id,
        walk_step,
        distance,
      },
    });
    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const checkUpdateBadgeWinSagaAsync = async (user_id) => {
  try {
    const apiResult = await API.post("planforfit", "/checkUpdateBadgeWin", {
      body: {
        user_id,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const deleteActivityListAddOnSagaAsync = async (user_id, activity_id) => {
  try {
    const apiResult = await API.post("planforfit", "/deleteActivityListAddOn", {
      body: {
        user_id,
        activity_id,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

const editActivityListAddOnSagaAsync = async (
  user_id,
  activity_id,
  activity_name,
  intensity
) => {
  try {
    const apiResult = await API.post("planforfit", "/editActivityListAddOn", {
      body: {
        user_id,
        activity_id,
        activity_name,
        intensity,
      },
    });

    return apiResult;
  } catch (error) {
    return { error, messsage: error.message };
  }
};

function* update_quiz_activitiesSaga({ payload }) {
  const { user_id, week_in_program, quiz_activities, quiz_activities_number } =
    payload;

  try {
    const apiResult = yield call(
      update_quiz_activitiesSagaAsync,
      user_id,
      week_in_program,
      quiz_activities,
      quiz_activities_number
    );
    yield put({
      type: types.UPDATE_QUIZ_ACTIVITIES_SUCCESS,
      payload: quiz_activities,
    });
  } catch (error) {
    console.log("error form updateHealthDataSaga", error);
  }
}


function* updateEventStepCount_DistanceSaga({ payload }) {
  const { user_id, event_id, stepCount, distance, distance_goal, stepCount_goal } =
    payload;

  try {
    const apiResult = yield call(
      updateEventStepCount_DistanceSagaAsync,
      user_id, event_id, stepCount, distance, distance_goal, stepCount_goal
    );
    yield put({
      type: types.UPDATE_EVENT_STEPCOUNT_DISTANCE_SUCCESS
    });
  } catch (error) {
    console.log("error form updateEventStepCount_DistanceSaga", error);
  }
}

function* update_assessment_kit_activtiesSaga({ payload }) {
  const {
    user_id,
    week_in_program,
    assessment_kit_activties,
    assessment_kit_number,
  } = payload;

  try {
    const apiResult = yield call(
      update_assessment_kit_activtiesSagaAsync,
      user_id,
      week_in_program,
      assessment_kit_activties,
      assessment_kit_number
    );
    yield put({
      type: types.UPDATE_ASSESSMENT_KIT_ACIVTIES_SUCCESS,
      payload: assessment_kit_activties,
    });
  } catch (error) {
    console.log("error form updateHealthDataSaga", error);
  }
}

function* update_popUp_starsSaga({ payload }) {
  const { user_id, week_in_program, popup_stary } = payload;

  try {
    const apiResult = yield call(
      update_popUp_starsSagaAsync,
      user_id,
      week_in_program,
      popup_stary
    );
    yield put({
      type: types.UPDARE_POPUP_STARS_SUCCESS,
      payload: popup_stary,
    });
  } catch (error) {
    console.log("error form update_popUp_starsSaga", error);
  }
}
function* updateReadExerciserActivitySaga({ payload }) {
  const { user_id, week_in_program, read_article } = payload;

  try {
    const apiResult = yield call(
      updateReadExerciserActivitySagaAsync,
      user_id,
      week_in_program,
      read_article
    );
    yield put({
      type: types.UPDATE_READ_EXERCISE_ACTIVITY_SUCCESS,
      payload: read_article,
    });
  } catch (error) {
    console.log("error form updateReadExerciserActivitySaga", error);
  }
}

function* insertNutritionActivitySaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(insertNutritionActivitySagaAsync, user_id);
    yield put({
      type: types.INSERT_NUTRITION_ACTIVITY_SUCCESS,
    });
  } catch (error) {
    console.log("error form insertNutritionActivitySaga", error);
  }
}
function* insertExerciseActivitySaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(insertExerciseActivitySagaAsync, user_id);
    yield put({
      type: types.INSERT_EXERCISE_ACTIVITY_SUCCESS,
    });
  } catch (error) {
    console.log("error form insertExerciseActivitySaga", error);
  }
}
function* insertNutritionKnowledgeActivitySaga({ payload }) {
  const { user_id, knowledge, score, assess_knowledge } = payload;

  try {
    const apiResult = yield call(
      insertNutritionKnowledgeActivitySagaAsync,
      user_id,
      knowledge,
      score,
      assess_knowledge
    );
    yield put({
      type: types.INSERT_NUTRITION_KNOWLEDGA_ACTIVITY_SUCCESS,
    });
  } catch (error) {
    console.log("error form insertExerciseActivitySaga", error);
  }
}

function* updateNumberCompletedSaga({ payload }) {
  const {
    user_id,
    activity_id,
    week_in_program,
    activity,
    intensity,
    type,
    duration,
    note,
  } = payload;

  try {
    const apiResult = yield call(
      updateNumberCompletedSagaAsync,
      user_id,
      activity_id,
      week_in_program,
      activity,
      intensity,
      type,
      duration,
      note
    );
    yield put({
      type: types.UPDATE_NUMBER_COMPLETED_SUCCESS,
    });
  } catch (error) {
    console.log("error form updateNumberCompletedSaga", error);
  }
}

function* addActivityListAddOnSaga({ payload }) {
  const { user_id, activity_name, intensity } = payload;

  try {
    const apiResult = yield call(
      addActivityListAddOnSagaAsync,
      user_id,
      activity_name,
      intensity
    );
    yield put({
      type: types.ADD_ACTIVITY_LIST_ADD_ON_SUCCESS,
    });
  } catch (error) {
    console.log("error form addActivityListAddOnSaga", error);
  }
}

function* addEventActivitySaga({ payload }) {
  const { id, user_id, walk_step, distance } = payload;
  try {
    const apiResult = yield call(
      addEventActivitySagaAsync,
      id,
      user_id,
      walk_step,
      distance
    );
    yield put({
      type: types.INSERT_EVENT_ACTIVITY_SUCCESS,
      payload: apiResult.results,
    });
  } catch (error) {
    console.log("error form addEventActivitySaga", error);
  } finally {
    yield put({
      type: types.INSERT_EVENT_ACTIVITY_DONE,
    });
  }
}

function* deleteActivityListAddOnSaga({ payload }) {
  const { user_id, activity_id } = payload;

  try {
    const apiResult = yield call(
      deleteActivityListAddOnSagaAsync,
      user_id,
      activity_id
    );
    yield put({
      type: types.DELETE_ACTIVITY_LIST_ADD_ON_SUCCESS,
    });
  } catch (error) {
    console.log("error form deleteActivityListAddOnSaga", error);
  }
}

function* editActivityListAddOnSaga({ payload }) {
  const { user_id, activity_id, activity_name, intensity } = payload;

  try {
    const apiResult = yield call(
      editActivityListAddOnSagaAsync,
      user_id,
      activity_id,
      activity_name,
      intensity
    );
    yield put({
      type: types.EDIT_ACT_LIST_ADD_ON_SUCCESS,
    });
  } catch (error) {
    console.log("error form editActivityListAddOnSaga", error);
  }
}
function* checkUpdateBadgeWinSaga({ payload }) {
  const { user_id } = payload;

  try {
    const apiResult = yield call(checkUpdateBadgeWinSagaAsync, user_id);
    /*         yield put({
                    type: types.CHECK_UPDATE_BADGE_WIN_SUCCESS
                }) */
  } catch (error) {
    console.log("error form checkUpdateBadgeWinSaga", error);
  }
}

export function* watchUpdate_quiz_activities() {
  yield takeEvery(types.UPDATE_QUIZ_ACTIVITIES, update_quiz_activitiesSaga);
}
export function* watchUpdateEventStepCount_Distance() {
  yield takeEvery(types.UPDATE_EVENT_STEPCOUNT_DISTANCE, updateEventStepCount_DistanceSaga);
}
export function* watchUpdate_assessment_kit_activties() {
  yield takeEvery(
    types.UPDATE_ASSESSMENT_KIT_ACIVTIES,
    update_assessment_kit_activtiesSaga
  );
}
export function* watchUpdate_popUp_stars() {
  yield takeEvery(types.UPDARE_POPUP_STARS, update_popUp_starsSaga);
}

export function* watchInsertNutritionActivity() {
  yield takeEvery(types.INSERT_NUTRITION_ACTIVITY, insertNutritionActivitySaga);
}

export function* watchInsertExerciseActivity() {
  yield takeEvery(types.INSERT_EXERCISE_ACTIVITY, insertExerciseActivitySaga);
}

export function* watchInsertNutritionKnowledgeActivity() {
  yield takeEvery(
    types.INSERT_NUTRITION_KNOWLEDGA_ACTIVITY,
    insertNutritionKnowledgeActivitySaga
  );
}

export function* watchUpdateNumberCompleted() {
  yield takeEvery(types.UPDATE_NUMBER_COMPLETED, updateNumberCompletedSaga);
}
export function* watchAddActivityListAddOn() {
  yield takeEvery(types.ADD_ACTIVITY_LIST_ADD_ON, addActivityListAddOnSaga);
}

export function* watchAddEventActivity() {
  yield takeEvery(types.INSERT_EVENT_ACTIVITY, addEventActivitySaga);
}

export function* watchDeleteActivityListAddOn() {
  yield takeEvery(
    types.DELETE_ACTIVITY_LIST_ADD_ON,
    deleteActivityListAddOnSaga
  );
}
export function* watchEditActivityListAddOn() {
  yield takeEvery(types.EDIT_ACT_LIST_ADD_ON, editActivityListAddOnSaga);
}
export function* watchCheckUpdateBadgeWin() {
  yield takeEvery(types.CHECK_UPDATE_BADGE_WIN, checkUpdateBadgeWinSaga);
}
export function* watchUpdateReadExerciserActivity() {
  yield takeEvery(
    types.UPDATE_READ_EXERCISE_ACTIVITY,
    updateReadExerciserActivitySaga
  );
}

export function* saga() {
  yield all([
    fork(watchUpdate_quiz_activities),
    fork(watchInsertNutritionActivity),
    fork(watchUpdate_assessment_kit_activties),
    fork(watchInsertExerciseActivity),
    fork(watchUpdate_popUp_stars),
    fork(watchUpdateNumberCompleted),
    fork(watchAddActivityListAddOn),
    fork(watchAddEventActivity),
    fork(watchDeleteActivityListAddOn),
    fork(watchEditActivityListAddOn),
    fork(watchInsertNutritionKnowledgeActivity),
    fork(watchCheckUpdateBadgeWin),
    fork(watchUpdateReadExerciserActivity),
    fork(watchUpdateEventStepCount_Distance),
  ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  status_quiz_activities: "default",
  statusInsertNutritionActivity: "default",
  statusAssessment_kit_activties: "default",
  statusInsertExerciseActivity: "default",
  statusPopupSary: "default",
  statusUpdateNumbComp: "default",
  statusAddActListAddOn: "default",
  statusDeleteActListAddOn: "default",
  statusEditActListAddOn: "default",
  statusInsertNutritionKnowledgeActivity: "default",
  statusReadExerciseActivty: "default",
  statusInsertEventActivity: "default",
  statusStepCountDistace: "statusStepCountDistace",
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.UPDATE_QUIZ_ACTIVITIES:
      return {
        ...state,
        status_quiz_activities: "loading",
      };
    case types.UPDATE_QUIZ_ACTIVITIES_SUCCESS:
      return {
        ...state,
        status_quiz_activities: "success",
        user: {
          ...state.user,
          quiz_activities: action.payload,
        },
      };
    case types.EDIT_ACT_LIST_ADD_ON:
      return {
        ...state,
        statusEditActListAddOn: "loading",
      };
    case types.EDIT_ACT_LIST_ADD_ON_SUCCESS:
      return {
        ...state,
        statusEditActListAddOn: "success",
      };
    case types.DELETE_ACTIVITY_LIST_ADD_ON:
      return {
        ...state,
        statusDeleteActListAddOn: "loading",
      };
    case types.DELETE_ACTIVITY_LIST_ADD_ON_SUCCESS:
      return {
        ...state,
        statusDeleteActListAddOn: "success",
      };
    case types.ADD_ACTIVITY_LIST_ADD_ON:
      return {
        ...state,
        statusAddActListAddOn: "loading",
      };
    case types.ADD_ACTIVITY_LIST_ADD_ON_SUCCESS:
      return {
        ...state,
        statusAddActListAddOn: "success",
      };

    case types.INSERT_EVENT_ACTIVITY:
      return {
        ...state,
        statusInsertEventActivity: "loading",
      };
    case types.INSERT_EVENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusInsertEventActivity: "success",
      };
    case types.INSERT_EVENT_ACTIVITY_DONE:
      return {
        ...state,
        statusInsertEventActivity: "default",
      };

    case types.UPDATE_NUMBER_COMPLETED:
      return {
        ...state,
        statusUpdateNumbComp: "loading",
      };
    case types.UPDATE_NUMBER_COMPLETED_SUCCESS:
      return {
        ...state,
        statusUpdateNumbComp: "success",
      };
    case types.RESET_STATUS_UPDATE_NUMB_COMP:
      return {
        ...state,
        statusUpdateNumbComp: "default",
      };
    case types.INSERT_NUTRITION_ACTIVITY:
      return {
        ...state,
        statusInsertNutritionActivity: "loading",
      };
    case types.INSERT_NUTRITION_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusInsertNutritionActivity: "success",
      };
    case types.INSERT_EXERCISE_ACTIVITY:
      return {
        ...state,
        statusInsertExerciseActivity: "loading",
      };
    case types.INSERT_EXERCISE_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusInsertExerciseActivity: "success",
      };
    case types.INSERT_NUTRITION_KNOWLEDGA_ACTIVITY:
      return {
        ...state,
        statusInsertNutritionKnowledgeActivity: "loading",
      };
    case types.INSERT_NUTRITION_KNOWLEDGA_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusInsertNutritionKnowledgeActivity: "success",
      };
    case types.UPDATE_ASSESSMENT_KIT_ACIVTIES:
      return {
        ...state,
        statusAssessment_kit_activties: "loading",
      };
    case types.UPDATE_ASSESSMENT_KIT_ACIVTIES_SUCCESS:
      return {
        ...state,
        statusAssessment_kit_activties: "success",
      };
    case types.UPDARE_POPUP_STARS:
      return {
        ...state,
        statusPopupSary: "loading",
      };
    case types.UPDARE_POPUP_STARS_SUCCESS:
      return {
        ...state,
        statusPopupSary: "success",
      };
    case types.UPDATE_READ_EXERCISE_ACTIVITY:
      return {
        ...state,
        statusReadExerciseActivty: "loading",
      };
    case types.UPDATE_READ_EXERCISE_ACTIVITY_SUCCESS:
      return {
        ...state,
        statusReadExerciseActivty: "success",
      };
    case types.UPDATE_EVENT_STEPCOUNT_DISTANCE:
      return {
        ...state,
        statusStepCountDistace: "loading",
      };
    case types.UPDATE_EVENT_STEPCOUNT_DISTANCE_SUCCESS:
      return {
        ...state,
        statusStepCountDistace: "success",
      };
    case types.STATUS_EVENT_STEPCOUNT_DISTANCE:
      return {
        ...state,
        statusStepCountDistace: "default",
      };
    default:
      return { ...state };
  }
}
