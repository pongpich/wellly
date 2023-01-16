import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { reducer as authUser} from './auth';
import { reducer as personalDataUser } from './personalUser';



const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet
};

const reducers = combineReducers({
  authUser,
  personalDataUser,
});

const persistedReducer = persistReducer(persistConfig, reducers)

export default persistedReducer;