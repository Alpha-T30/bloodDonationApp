import apiLink, { publicRequest } from "../BackEndStuff/apiLinks";
import { loginSuccess, logOutSuccess, usrUpdate } from "./authSlice";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {
  addNewUserSuccess,
  deleteUserSuccess,
  getAllUserSuccess,
  updateUserSuccess,
} from "./userSlice";
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

export const registerByAdmin = async (
  sendingData,
  setLoading,
  dispatch,
  toast
) => {
  setLoading(true);
  try {
    const res = await apiLink.post("/users/addNewUser", sendingData);
    console.log(res.data);
    dispatch(addNewUserSuccess(res.data));

    setLoading(false);
    toast.show({
      title: "New user add success",
      placement: "top",
    });
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.show({
      title: "New User Addition Failed",
      placement: "top",
    });
    throw error;
  }
};

export const updateUser = async (dispatch, data, setLoading, toast) => {
  setLoading(true);
  try {
    const res = await apiLink.put(`/users/${data._id}`, data);
    dispatch(updateUserSuccess(res.data));
    dispatch(usrUpdate(res.data));
    setLoading(false);
    toast.show({
      title: "User Update Success",
      placement: "top",
    });
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.show({
      title: "User Update Failed",
      placement: "top",
    });
  }
};
export const deleteUser = async (dispatch, id, setLoading, toast) => {
  setLoading(true);
  try {
    const res = await apiLink.delete(`/users/${id}`);
    
    dispatch(deleteUserSuccess(id));
    setLoading(false);
    toast.show({
      title: "User Delation Success",
      placement: "top",
    });
  } catch (error) {
    
    setLoading(false);
    toast.show({
      title: "User Delation Failed",
      placement: "top",
    });
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
    setLoading(false);
    console.log(error);
    setLoading(false);
    toast.show({
      placement: "bottom",
      title: "Login failed",
    });
    setLoading(false);
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
// export const getAllUsers = async (dispatch) => {
//   try {
//     const res = await apiLink.get("/users/");
//     dispatch(getAllUserSuccess(res.data));
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
export const getAllUsers = async (dispatch, setLoading) => {
  setLoading(true);
  try {
    const res = await apiLink.get("/users/allUsers/");
    dispatch(getAllUserSuccess(res.data));
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};
