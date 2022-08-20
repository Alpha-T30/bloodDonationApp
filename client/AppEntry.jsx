import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import Login from "./src/screens/login";
import { useSelector } from "react-redux";
import Register from "./src/screens/register";
import {
  CheckIcon,
  HamburgerIcon,
  Input,
  Menu,
  Pressable,
  Select,
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { bloodGroup } from "./Data/data";
import { useState } from "react";
import Profile from "./src/screens/profile";
import NewUser from "./src/screens/newUsertest";

const theme = extendTheme({
  components: {
    Select: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        // borderColor: "rgba(0, 0, 0, 0)",
      },
    },
  },
});
export default function AppEntry() {
  const [bGroup, setbGroup] = useState("");
  const currentUser = useSelector(
    (state) => state.persistedData.auth?.currentUser
  );
  const isRegisterd = useSelector((state) => state.ui.isRegisterd);
  const Stack = createNativeStackNavigator();

  const searchFun = (text) => {};
  const handleMenu = () => {};
  const handlegbSelect = (bg) => {
    setbGroup(bg);
  };
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          {!currentUser ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Register"
                component={Register}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    padding: 0,
                    margin: 0,
                  },
                }}
                name="Home"
                component={Home}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    padding: 0,
                    margin: 0,
                  },
                  title: "User Profile",
                }}
                name="Profile"
                component={Profile}
              />
              <Stack.Screen
                options={{
                  headerStyle: {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    padding: 0,
                    margin: 0,
                  },
                  title: "New User",
                }}
                name="NewUser"
                component={NewUser}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    // width:100,
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: -22,
    marginTop: 10,
  },
  filter: {
    flex: 1,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    flex: 5,
    // backgroundColor: "yellow",
    marginLeft: -10,
  },
  menu: {
    flex: 1,
    // backgroundColor: "green",
    marginRight: 10,
  },
  searchBarShadowStyle: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});
