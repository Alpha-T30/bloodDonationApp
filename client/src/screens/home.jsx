import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { allClear, getAllUsers, logOut } from "../redux/apiCalls";
import CustomCard from "../components/Card";
import { FloatingAction } from "react-native-floating-action";
import {
  Modal,
  Button,
  ScrollView,
  Center,
  VStack,
  NativeBaseProvider,
  FormControl,
  Input,
} from "native-base";
export default function Home({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const user = useSelector(
    (state) => state.persistedData.auth?.currentUser?.userData
  );
  const allUsers = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();
  console.log("all users", allUsers);
  useEffect(() => {
    getAllUsers(dispatch, setLoading);
  }, [dispatch]);
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      {allUsers.map((user, i) => {
        return <CustomCard userData={user} key={i}></CustomCard>;
      })}

      <Button title="Log Out" onPress={() => logOut(dispatch)} />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Image style={styles.img} source={require("../images/add-user.png")} />
      </TouchableOpacity>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setShowBtn(true);
        }}
      >
        <Modal.Content size={"lg"}>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                  setShowBtn(true);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  setShowBtn(true);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtn: {
    borderRadius: 50,
    padding: 10,
    width: 50,
    height: 50,
    bottom: 15,
    right: 15,
    position: "absolute",
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 40,
    height: 40,
  },
});
