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
import SearchBar from "react-native-dynamic-search-bar";
import { AntDesign } from "@expo/vector-icons";
import { bloodGroup } from "./Data/data";
import { useState } from "react";

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

  const searchFun = (text) => {
    console.log(text);
  };
  const handleMenu = () => {
    console.log("hello clicked");
  };
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
                  headerTitle: () => (
                    <View style={styles.topBar}>
                      {/* <View style={styles.searchbar}>
                        <SearchBar
                          // spinnerVisibility={true}
                          placeholder="Search here.."
                          fontFamily="BurbankBigCondensed-Black"
                          // shadowStyle={styles.searchBarShadowStyle}
                          // darkMode={true}
                          onChangeText={searchFun}
                          height={50}
                          fontSize={17}
                          fontColor="#fdfdfd"
                          iconColor="#fdfdfd"
                          shadowColor="red"
                          cancelIconColor="#fdfdfd"
                          // backgroundColor="#ba312f"
                          spinnerVisibility={true}
                          shadowStyle={styles.searchBarShadowStyle}
                        />
                      </View> */}
                      <View style={styles.menu}>
                        <Menu
                          shadow={2}
                          w="190"
                          trigger={(triggerProps) => {
                            return (
                              <Pressable
                                accessibilityLabel="More options menu"
                                {...triggerProps}
                              >
                                <HamburgerIcon
                                  style={{ height: 30, width: 30 }}
                                />
                              </Pressable>
                            );
                          }}
                        >
                          <Menu.Item onPress={handleMenu}>Log Out</Menu.Item>
                          <Menu.Item>Profile</Menu.Item>
                        </Menu>
                      </View>
                    </View>
                  ),
                }}
                name="Home"
                component={Home}
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
