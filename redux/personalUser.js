import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  PERSONAL_USER: "PERSONAL_USER",
  HEALT_USER: "HEALT_USER",
  NAME_USER: "NAME_USER",
  LENG_APP: "LENG_APP",
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

export const healt = (fpg, hba1c, sbp, dbp, exercise) => ({
  type: types.HEALT_USER,
  payload: {
    fpg,
    hba1c,
    sbp,
    dbp,
    exercise
  },
});
export const userName = (name) => ({
  type: types.NAME_USER,
  payload: {
    name,
  },
});
export const lengThEn = (leng) => ({
  type: types.LENG_APP,
  payload: {
    leng,
  },
});



/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  dataUser: null,
  healtDataUser: null,
  profanity: null,
  username: null,
  leng: "th",
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
    case types.NAME_USER:
      return {
        ...state,
        username: action.payload,
      };
    case types.LENG_APP:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return { ...state };
  }
}

/* END OF REDUCER Section */
