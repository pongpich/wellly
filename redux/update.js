import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
    UPDATE_QUIZ_ACTIVITIES: "UPDATE_QUIZ_ACTIVITIES",
    UPDATE_QUIZ_ACTIVITIES_SUCCESS: "UPDATE_QUIZ_ACTIVITIES_SUCCESS",
    INSERT_NUTRITION_ACTIVITY: "INSERT_NUTRITION_ACTIVITY",
    INSERT_NUTRITION_ACTIVITY_SUCCESS: "INSERT_NUTRITION_ACTIVITY_SUCCESS",
    UPDATE_ASSESSMENT_KIT_ACIVTIES: "UPDATE_ASSESSMENT_KIT_ACIVTIES",
    UPDATE_ASSESSMENT_KIT_ACIVTIES_SUCCESS: "UPDATE_ASSESSMENT_KIT_ACIVTIES_SUCCESS",
    INSERT_EXERCISE_ACTIVITY: "INSERT_EXERCISE_ACTIVITY",
    INSERT_EXERCISE_ACTIVITY_SUCCESS: "INSERT_EXERCISE_ACTIVITY_SUCCESS",
    UPDARE_POPUP_STARS: "UPDARE_POPUP_STARS",
    UPDARE_POPUP_STARS_SUCCESS: "UPDARE_POPUP_STARS_SUCCESS",

};


export const update_quiz_activities = (user_id, week_in_program, quiz_activities, quiz_activities_number) => ({
    type: types.UPDATE_QUIZ_ACTIVITIES,
    payload: {
        user_id,
        week_in_program,
        quiz_activities,
        quiz_activities_number
    },
});


export const update_assessment_kit_activties = (user_id, week_in_program, assessment_kit_activties, assessment_kit_number) => ({
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
        popup_stary
    },
});


export const insertNutritionActivity = (user_id) => ({
    type: types.INSERT_NUTRITION_ACTIVITY,
    payload: {
        user_id
    },
})
export const insertExerciseActivity = (user_id) => ({
    type: types.INSERT_EXERCISE_ACTIVITY,
    payload: {
        user_id
    },
})


/* END OF ACTION Section */

/* SAGA Section */

const update_quiz_activitiesSagaAsync = async (
    user_id,
    week_in_program,
    quiz_activities,
    quiz_activities_number,
) => {

    try {
        const apiResult = await API.post("planforfit", "/updateQuizActivities", {
            body: {
                user_id,
                week_in_program,
                quiz_activities,
                quiz_activities_number
            }
        });

        return apiResult
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
        const apiResult = await API.post("planforfit", "/updateAssessmentKitActivties", {
            body: {
                user_id,
                week_in_program,
                assessment_kit_activties,
                assessment_kit_number
            }
        });

        return apiResult
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
                popup_stary
            }
        });

        return apiResult
    } catch (error) {

        return { error, messsage: error.message };
    }
};

const insertNutritionActivitySagaAsync = async (
    user_id
) => {

    try {
        const apiResult = await API.post("planforfit", "/insertNutritionActivity", {
            body: {
                user_id
            }
        });

        return apiResult
    } catch (error) {
        return { error, messsage: error.message };
    }
};
const insertExerciseActivitySagaAsync = async (
    user_id
) => {

    try {
        const apiResult = await API.post("planforfit", "/insertExerciseActivity", {
            body: {
                user_id
            }
        });

        return apiResult
    } catch (error) {
        return { error, messsage: error.message };
    }
};





function* update_quiz_activitiesSaga({ payload }) {
    const {
        user_id,
        week_in_program,
        quiz_activities,
        quiz_activities_number
    } = payload

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
            payload: quiz_activities
        })
    } catch (error) {
        console.log("error form updateHealthDataSaga", error);
    }
}

function* update_assessment_kit_activtiesSaga({ payload }) {
    const {
        user_id,
        week_in_program,
        assessment_kit_activties,
        assessment_kit_number
    } = payload

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
            payload: assessment_kit_activties
        })
    } catch (error) {
        console.log("error form updateHealthDataSaga", error);
    }
}

function* update_popUp_starsSaga({ payload }) {
    const {
        user_id,
        week_in_program,
        popup_stary
    } = payload

    try {
        const apiResult = yield call(
            update_popUp_starsSagaAsync,
            user_id,
            week_in_program,
            popup_stary
        );
        yield put({
            type: types.UPDARE_POPUP_STARS_SUCCESS,
            payload: popup_stary
        })
    } catch (error) {
        console.log("error form update_popUp_starsSaga", error);
    }
}

function* insertNutritionActivitySaga({ payload }) {
    const {
        user_id
    } = payload

    try {
        const apiResult = yield call(
            insertNutritionActivitySagaAsync,
            user_id
        );
        yield put({
            type: types.INSERT_NUTRITION_ACTIVITY_SUCCESS
        })
    } catch (error) {
        console.log("error form insertNutritionActivitySaga", error);
    }
}
function* insertExerciseActivitySaga({ payload }) {
    const {
        user_id
    } = payload

    try {
        const apiResult = yield call(
            insertExerciseActivitySagaAsync,
            user_id
        );
        yield put({
            type: types.INSERT_NUTRITION_ACTIVITY_SUCCESS
        })
    } catch (error) {
        console.log("error form insertExerciseActivitySaga", error);
    }
}

export function* watchUpdate_quiz_activities() {
    yield takeEvery(types.UPDATE_QUIZ_ACTIVITIES, update_quiz_activitiesSaga)
}
export function* watchUpdate_assessment_kit_activties() {
    yield takeEvery(types.UPDATE_ASSESSMENT_KIT_ACIVTIES, update_assessment_kit_activtiesSaga)
}
export function* watchUpdate_popUp_stars() {
    yield takeEvery(types.UPDARE_POPUP_STARS, update_popUp_starsSaga)
}

export function* watchInsertNutritionActivity() {
    yield takeEvery(types.INSERT_NUTRITION_ACTIVITY, insertNutritionActivitySaga)
}

export function* watchInsertExerciseActivity() {
    yield takeEvery(types.INSERT_EXERCISE_ACTIVITY, insertExerciseActivitySaga)
}



export function* saga() {
    yield all([
        fork(watchUpdate_quiz_activities),
        fork(watchInsertNutritionActivity),
        fork(watchUpdate_assessment_kit_activties),
        fork(watchInsertExerciseActivity),
        fork(watchUpdate_popUp_stars)
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
};

export function reducer(state = INIT_STATE, action) {
    switch (action.type) {
        case types.UPDATE_QUIZ_ACTIVITIES:
            return {
                ...state,
                status_quiz_activities: 'loading'
            };
        case types.UPDATE_QUIZ_ACTIVITIES_SUCCESS:
            return {
                ...state,
                status_quiz_activities: 'success',
                user: {
                    ...state.user,
                    quiz_activities: action.payload
                }
            };
        case types.INSERT_NUTRITION_ACTIVITY:
            return {
                ...state,
                statusInsertNutritionActivity: "loading"
            };
        case types.INSERT_NUTRITION_ACTIVITY_SUCCESS:
            return {
                ...state,
                statusInsertNutritionActivity: "success"
            };
        case types.INSERT_EXERCISE_ACTIVITY:
            return {
                ...state,
                statusInsertExerciseActivity: "loading"
            };
        case types.INSERT_EXERCISE_ACTIVITY_SUCCESS:
            return {
                ...state,
                statusInsertExerciseActivity: "success"
            };
        case types.UPDATE_ASSESSMENT_KIT_ACIVTIES:
            return {
                ...state,
                statusAssessment_kit_activties: "loading"
            };
        case types.UPDATE_ASSESSMENT_KIT_ACIVTIES_SUCCESS:
            return {
                ...state,
                statusAssessment_kit_activties: "success"
            };
        case types.UPDARE_POPUP_STARS:
            return {
                ...state,
                statusPopupSary: "loading"
            };
        case types.UPDARE_POPUP_STARS_SUCCESS:
            return {
                ...state,
                statusPopupSary: "success"
            };
        default:
            return { ...state };
    }
}
