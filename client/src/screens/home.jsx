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
  Select,
  CheckIcon,
} from "native-base";
import { bloodGroup, districts, subDistricts } from "../../Data/data";

export default function Home({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [formData, setData] = React.useState({});
  const [bloodGroupselect, setBloodGroup] = React.useState([]);

  const user = useSelector(
    (state) => state.persistedData.auth?.currentUser?.userData
  );
  const allUsers = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers(dispatch, setLoading);
  }, [dispatch]);

  const onSubmit = () => {
    const findblood = bloodGroup.find((i) => i.id === bloodGroupselect);
    // const findDistrict = districts.find((i) => i.id === districtSelect);
    // const findSubDistrict = subDistricts.find((i) => i.id === singleSub);

    const sendingData = {
      ...formData,
      bloodGroupId: findblood?.id,
      bloodGroup: findblood?.name,
      password: formData.password ? formData.password : "123456",
      // districtId: districtSelect,
      // subDistrictId: singleSub,

      // district: findDistrict.name,
      // subDistrict: findSubDistrict.name,
    };
    console.log(sendingData);
    // register(sendingData, setLoading, navigation, toast);
  };
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      {allUsers.map((user, i) => {
        return <CustomCard userData={user} key={i}></CustomCard>;
      })}

      {/* <Button title="Log Out" onPress={() => logOut(dispatch)} /> */}

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Image style={styles.img} source={require("../images/add-user.png")} />
      </TouchableOpacity>

      <Modal
        safeAreaTop={true}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setShowBtn(true);
        }}
      >
        <Modal.Content size={"full"}>
          <Modal.CloseButton />
          <Modal.Header>Add New User</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                onChangeText={(value) => setData({ ...formData, name: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mobile</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setData({ ...formData, mobile: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Student ID</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setData({ ...formData, studentId: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Session</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setData({ ...formData, session: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Blood Group</FormControl.Label>
              <Select
                selectedValue={bloodGroupselect}
                minWidth="200"
                accessibilityLabel="Select Blood Group"
                placeholder="Select Blood Group"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setBloodGroup(itemValue)}
              >
                {bloodGroup.map((item, i) => {
                  return (
                    <Select.Item key={i} label={item.name} value={item.id} />
                  );
                })}
              </Select>
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
              <Button onPress={onSubmit}>Save</Button>
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
