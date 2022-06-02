import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { allClear, getAllUsers, logOut } from "../redux/apiCalls";

export default function Home({ navigation }) {
  const user = useSelector(
    (state) => state.persistedData.auth?.currentUser?.userData
  );
  const allUsers = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();
  console.log(allUsers);
  useEffect(() => {
    // getAllUsers(dispatch);
  }, []);
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Text>{`welcome Mr. ${user?.name}`}</Text>
      <Button
        title="More Home screens"
        onPress={() => navigation.push("Home")}
      />
      <Button title="All Clear" onPress={() => allClear(dispatch)} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Button title="Log Out" onPress={() => logOut(dispatch)} />
    </View>
  );
}
