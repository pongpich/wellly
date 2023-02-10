import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { reducer as authUser } from './auth';
import { reducer as personalDataUser } from './personalUser';
import { reducer as getData } from './get';
import { reducer as updateData } from './update';



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet
};

const reducers = combineReducers({
  authUser,
  personalDataUser,
  getData,
  updateData,
});

const persistedReducer = persistReducer(persistConfig, reducers)

export default persistedReducer;