import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  PERSONAL_USER: "PERSONAL_USER",
  HEALT_USER: "HEALT_USER",
};




export const personal = (sex, age, weight, height, exercise) => ({
  type: types.PERSONAL_USER,
  payload: {
    sex,
    age,
    weight,
    height,
    exercise,
  },
});

export const healt = (mgDL, mg, bpm, mmHGS, mmHGD) => ({
  type: types.HEALT_USER,
  payload: {
    mgDL,
    mg,
    bpm,
    mmHGS,
    mmHGD
  },
});



/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  dataUser: null,
  healtDataUser:null
};

export function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case types.PERSONAL_USER:
      return {
        ...state,
        dataUser: action.payload,
      };
      case types.HEALT_USER:
      return {
        ...state,
        healtDataUser: action.payload,
      };
    default:
      return { ...state };
  }
}

/* END OF REDUCER Section */
