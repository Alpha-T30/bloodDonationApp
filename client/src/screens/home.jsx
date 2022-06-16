import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  RefreshControl,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  allClear,
  getAllUsers,
  logOut,
  registerByAdmin,
} from "../redux/apiCalls";
import CustomCard from "../components/Card";
import { FloatingAction } from "react-native-floating-action";
import {
  Modal,
  Button,
  Center,
  VStack,
  NativeBaseProvider,
  FormControl,
  Input,
  Select,
  CheckIcon,
  Text,
  Toast,
  useToast,
} from "native-base";
import { bloodGroup, districts, subDistricts } from "../../Data/data";
import SearchBar from "react-native-dynamic-search-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Chase, Fold } from "react-native-animated-spinkit";
export default function Home({ navigation }) {
  LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [isCustomerLoading, setCustomerLoading] = useState(false);
  const [isLoading1, setLoading1] = useState(false);
  const [searchIconLoading, setSearchIconLoading] = useState(false);
  const [formData, setData] = React.useState({});
  const [bloodGroupselect, setBloodGroup] = React.useState([]);
  const toast = useToast();
  const user = useSelector(
    (state) => state.persistedData.auth?.currentUser?.userData
  );
  const allUsers = useSelector((state) => state.user.allUsers);

  const [users, setUsers] = useState(allUsers);
  const [data, setUserData] = useState(allUsers);
  const [bGroup, setbGroup] = useState("All");
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    getAllUsers(dispatch, setRefreshing);
  }, []);
  useEffect(() => {
    getAllUsers(dispatch, setCustomerLoading);
  }, [dispatch]);

  useEffect(() => {
    setUsers(allUsers);
    setUserData(allUsers);
  }, [allUsers]);
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
    registerByAdmin(sendingData, setLoading1, dispatch, toast);
  };

  const handleMenu = () => {
    console.log("hello clicked");
  };
  const handlegbSelect = (bg) => {
    setbGroup(bg);
    if (bg === "All") {
      setUsers(allUsers);
    } else {
      setUsers(allUsers.filter((u) => u.bloodGroup === bg));
    }
  };

  const [query, setQuery] = useState("");
  useEffect(() => {
    const keys = ["name", "mobile", "studentId", "bloodGroup"];

    let temp = data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
    setUsers(temp);
    setSearchIconLoading(false);
  }, [query]);

  return (
    <ImageBackground
      source={require("../images/bg.jpg")}
      style={styles.maincontainer}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.header}>
              <View style={styles.searchbar}>
                <SearchBar
                  spinnerVisibility={searchIconLoading}
                  onClearPress={() => {
                    setSearchIconLoading(true);

                    setQuery("");
                  }}
                  placeholder="Search here.."
                  fontFamily="BurbankBigCondensed-Black"
                  // shadowStyle={styles.searchBarShadowStyle}
                  darkMode={true}
                  onChangeText={(text) => {
                    setSearchIconLoading(true);
                    setQuery(text.toLowerCase());
                  }}
                  height={50}
                  fontSize={17}
                  fontColor="#fdfdfd"
                  iconColor="#fdfdfd"
                  shadowColor="red"
                  cancelIconColor="#fdfdfd"
                  // backgroundColor="#ba312f"

                  shadowStyle={styles.searchBarShadowStyle}
                />
              </View>
              <View style={styles.filter}>
                <Select
                  color={"light.100"}
                  w="88%"
                  selectedValue={bGroup}
                  mx={{
                    base: 0,
                    md: "auto",
                  }}
                  onValueChange={(nextValue) => handlegbSelect(nextValue)}
                  _selectedItem={{
                    bg: "cyan.600",
                  }}
                  accessibilityLabel="Select a blood group"
                >
                  <Select.Item
                    color={"light.100"}
                    label={"All Blood Group"}
                    value={"All"}
                  />

                  {bloodGroup.map((b, i) => (
                    <Select.Item key={i} label={b.name} value={b.name} />
                  ))}
                </Select>
              </View>
            </View>
          </SafeAreaView>
          {isCustomerLoading ? (
            <Center flex={1}>
              <Fold size={60} color="#FAC213" />
            </Center>
          ) : (
            <View style={styles.content}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    colors={["blue", "gold", "grey", "red"]}
                    tintColor="#A5BECC"
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                {users.map((user, i) => {
                  return <CustomCard userData={user} key={i}></CustomCard>;
                })}
              </ScrollView>
            </View>
          )}

          <RNBounceable
            style={styles.addBtn}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Image
              style={styles.img}
              source={require("../images/add-user.png")}
            />
          </RNBounceable>

          <RNBounceable
            style={styles.addBtn2}
            onPress={() => {
              logOut(dispatch);
            }}
          >
            <Image style={styles.img2} source={require("../images/exit.png")} />
          </RNBounceable>

          {/* <Button title="Log Out" onPress={() => logOut(dispatch)} /> */}

          <Modal
            safeAreaTop={true}
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setShowBtn(true);
            }}
          >
            <Modal.Content
              color={"light.100"}
              backgroundColor={"darkBlue.900"}
              style={{ width: "95%" }}
              size={"full"}
            >
              <Modal.CloseButton />
              <Modal.Header backgroundColor={"blueGray.900"} color="light.100">
                <Text color={"light.100"}> Add New User</Text>
              </Modal.Header>
              <Modal.Body>
                <FormControl>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    color={"light.100"}
                    onChangeText={(value) =>
                      setData({ ...formData, name: value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Mobile</FormControl.Label>
                  <Input
                    color={"light.100"}
                    onChangeText={(value) =>
                      setData({ ...formData, mobile: value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Student ID</FormControl.Label>
                  <Input
                    color={"light.100"}
                    onChangeText={(value) =>
                      setData({ ...formData, studentId: value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Session</FormControl.Label>
                  <Input
                    color={"light.100"}
                    onChangeText={(value) =>
                      setData({ ...formData, session: value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Blood Group</FormControl.Label>
                  <Select
                    color={"light.100"}
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
                        <Select.Item
                          backgroundColor={"dark.500"}
                          key={i}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                  </Select>
                </FormControl>
              </Modal.Body>
              <Modal.Footer backgroundColor={"darkBlue.900"}>
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
                  <Button h={10} onPress={onSubmit}>
                    {isLoading1 ? <Chase size={30} color="#FFF" /> : "Save"}
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    borderColor: "gold",
    borderRightWidth: 2,
    padding: 5,
  },
  addBtn2: {
    borderRadius: 50,
    padding: 10,
    width: 50,
    height: 50,
    bottom: 15,
    left: 15,
    position: "absolute",
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRightWidth: 2,
    padding: 5,
  },
  img: {
    width: 40,
    height: 40,
  },
  img2: {
    width: 50,
    height: 50,
  },
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
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {},
  menu: {
    flex: 1,
    // backgroundColor: "green",
    marginRight: 10,
  },
  searchBarShadowStyle: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    paddingBottom: 5,
    marginBottom: 0,
  },
});
