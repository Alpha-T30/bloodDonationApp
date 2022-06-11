import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";
import AppEntry from "./AppEntry";
import { extendTheme, NativeBaseProvider } from "native-base";
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({ config });
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <AppEntry />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
