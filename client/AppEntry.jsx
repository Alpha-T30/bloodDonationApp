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

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import Login from "./src/screens/login";
import { useSelector } from "react-redux";
import Register from "./src/screens/register";

export default function AppEntry() {
  const currentUser = useSelector(
    (state) => state.persistedData.auth?.currentUser
  );
  const isRegisterd = useSelector((state) => state.ui.isRegisterd);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!currentUser ? (
          <>
            <Stack.Screen
              options={{ title: "Login Page" }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={
                ({ title: "Register Page" }, { headerBackVisible: false })
              }
              name="Register"
              component={Register}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ title: "Home Page" }}
              name="Home"
              component={Home}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
