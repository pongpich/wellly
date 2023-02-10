import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {

    UPDATE_QUIZ_ACTIVITIES: "UPDATE_QUIZ_ACTIVITIES",
    UPDATE_QUIZ_ACTIVITIES_SUCCESS: "UPDATE_QUIZ_ACTIVITIES_SUCCESS",
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

export function* watchUpdate_quiz_activities() {
    yield takeEvery(types.UPDATE_QUIZ_ACTIVITIES, update_quiz_activitiesSaga)
}



export function* saga() {
    yield all([
        fork(watchUpdate_quiz_activities),
    ]);
}

/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {

    status_quiz_activities: "default",

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
        default:
            return { ...state };
    }
}
