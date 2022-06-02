import apiLink, { publicRequest } from "../BackEndStuff/apiLinks";
import { loginSuccess, logOutSuccess } from "./authSlice";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { getAllUserSuccess } from "./userSlice";
import { Box } from "native-base";

export const register = async (sendingData, setLoading, navigation, toast) => {
  setLoading(true);
  try {
    await publicRequest.post("/auth/register/", sendingData);
    setLoading(false);
    toast.show({
      title: "Registration Success",
      placement: "top",
    });
    navigation.goBack();
  } catch (error) {
    setLoading(false);
    toast.show({
      title: "Registration Failed",
      placement: "top",
    });
    throw error;
  }
};

export const logIntoApp = async (dispatch, logInData, setLoading, toast) => {
  setLoading(true);
  try {
    const res = await publicRequest.post("/auth/login", logInData);

    await SecureStore.setItemAsync("tokens", JSON.stringify(res.data.tokens));

    dispatch(loginSuccess(res.data));
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.show({
      placement: "bottom",
      title: "Login failed",
    });
    throw error;
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

//users
export const getAllUsers = async (dispatch) => {
  try {
    const res = apiLink.get("/users/");
    dispatch(getAllUserSuccess(res.data));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
