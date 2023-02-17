import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {

    UPDATE_QUIZ_ACTIVITIES: "UPDATE_QUIZ_ACTIVITIES",
    UPDATE_QUIZ_ACTIVITIES_SUCCESS: "UPDATE_QUIZ_ACTIVITIES_SUCCESS",
    INSERT_NUTRITION_ACTIVITY: "INSERT_NUTRITION_ACTIVITY",
    INSERT_NUTRITION_ACTIVITY_SUCCESS: "INSERT_NUTRITION_ACTIVITY_SUCCESS"
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

export const insertNutritionActivity = (user_id) => ({
    type: types.INSERT_NUTRITION_ACTIVITY,
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

export function* watchUpdate_quiz_activities() {
    yield takeEvery(types.UPDATE_QUIZ_ACTIVITIES, update_quiz_activitiesSaga)
}

export function* watchInsertNutritionActivity() {
    yield takeEvery(types.INSERT_NUTRITION_ACTIVITY, insertNutritionActivitySaga)
}



export function* saga() {
    yield all([
        fork(watchUpdate_quiz_activities),
        fork(watchInsertNutritionActivity),
    ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
    status_quiz_activities: "default",
    statusInsertNutritionActivity: "default"
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
        default:
            return { ...state };
    }
}
