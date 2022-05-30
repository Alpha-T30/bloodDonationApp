import apiLink, { publicRequest } from "../BackEndStuff/apiLinks";
import { loginSuccess, logOutSuccess } from "./authSlice";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const register = async () => {
  try {
  } catch (error) {}
};
export const logIn = async (dispatch, logInData) => {
  try {
    const res = await publicRequest.post("/auth/login", logInData);

    await SecureStore.setItemAsync("tokens", JSON.stringify(res.data.tokens));

    dispatch(loginSuccess(res.data));

    console.log("logged In success");
  } catch (error) {
    console.log(error.message);
  }
};

export const logOut = async (dispatch) => {
  try {
    const Tokens = await SecureStore.getItemAsync("tokens");
    const refreshToken = Tokens && JSON.parse(Tokens)?.refreshToken;
    await apiLink.post("/auth/logout", {
      token: refreshToken,
    });

    dispatch(logOutSuccess());
    console.log("Log out success");
  } catch (error) {
    console.log(error.message);
    dispatch(logOutSuccess());
    console.log("Log out success");
  }
};

export const allClear = async (dispatch) => {
  await SecureStore.deleteItemAsync("tokens");
  dispatch(logOutSuccess());
};
