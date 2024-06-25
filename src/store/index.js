import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import useReducer from "./userSlice"
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  REHYDRATE,
persistStore,
    persistReducer,
} from "redux-persist";

const rootReducer = combineReducers({
    user: useReducer
})

const persistConfig = {
  key: "root",
    storage,

  
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare(
          {
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST],
            },
          }
      ),
});
export const persistor =   persistStore(store)