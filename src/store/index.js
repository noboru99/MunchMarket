import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import useReducer from "./userSlice"
import goodsReducer from "./goodsSlice";
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
  user: useReducer,
  goods: goodsReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "goods"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST],
      },
    }),
  // devTools: process.env.NODE_ENV !== "production",
});

// Redux store에서 상태를 출력해보기
console.log("store",store.getState());
export const persistor =   persistStore(store)