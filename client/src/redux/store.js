import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiSlice from "./uiSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userSlice from "./userSlice";

// import storage from "redux-persist/lib/storage";>>this is the main culprit

const persistConfig = {
  key: "expo",
  version: 2,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedData: persistedReducer,
    ui: uiSlice,
    user: userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
