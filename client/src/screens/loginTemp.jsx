import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/apiCalls";
import { registerSwitch } from "../redux/uiSlice";

export default function Login({ navigation }) {
  const [name, setname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ width: "100%", margin: "10px" }}
        placeholder="name"
        value={name}
        onChangeText={setname}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login in"
        onPress={() => logIn(dispatch, { name, password })}
      />
      <Text> Not A User? </Text>
      <Button
        onPress={() => {
          navigation.navigate("Register");
        }}
        title="Go For Registration-->"
      ></Button>
    </View>
  );
}
