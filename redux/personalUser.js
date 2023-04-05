import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Auth, API } from "aws-amplify";

/* ACTION Section */

export const types = {
  PERSONAL_USER: "PERSONAL_USER",
  HEALT_USER: "HEALT_USER",
  LENG_APP: "LENG_APP",
  LENG_APP: "LENG_APP",
  ROUTE_NAME: "ROUTE_NAME",
  COREBALNCE_BALANCE: "COREBALNCE_BALANCE"
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

export const lengThEn = (leng) => ({
  type: types.LENG_APP,
  payload: {
    leng,
  },
});


export const routeName = (route_name) => ({
  type: types.ROUTE_NAME,
  payload: {
    route_name,
  },
});


export const coreBalance = (core_balance) => ({
  type: types.COREBALNCE_BALANCE,
  payload: {
    core_balance,
  },
});





/* END OF ACTION Section */

/* SAGA Section */


/* END OF SAGA Section */

/* REDUCER Section */

const INIT_STATE = {
  dataUser: null,
  healtDataUser: null,
  profanity: null,
  leng: "th",
  route_name: "null",
  coreBalanceRoute: null
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
    case types.LENG_APP:
      return {
        ...state,
        leng: action.payload,
      };
    case types.ROUTE_NAME:
      return {
        ...state,
        route_name: action.payload,
      };
    case types.COREBALNCE_BALANCE:
      return {
        ...state,
        coreBalanceRoute: action.payload,
      };
    default:
      return { ...state };
  }
}

/* END OF REDUCER Section */
