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
import { Chase, Fold } from "react-native-animated-spinkit";
import moment from "moment";
export default function Home({ navigation }) {
  LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [isCustomerLoading, setCustomerLoading] = useState(false);
  const [isLoading1, setLoading1] = useState(false);
  const [searchIconLoading, setSearchIconLoading] = useState(false);
  const [formData, setData] = React.useState({});
  const [bloodGroupselect, setBloodGroup] = React.useState([]);
  // const [date, setDate] = React.useState(new Date());

  const toast = useToast();
  const user = useSelector((state) => state.persistedData.auth?.currentUser);
  console.log("user55",user)
   
  const allUsers = useSelector((state) => state.user.allUsers);

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(allUsers);
  const [data, setUserData] = useState(allUsers);
  // const [bGroup, setbGroup] = useState("All");
  // const [status, setStatus] = useState("Both");
  const [filterData, setFilterData] = useState({
    bGroup: "All",
    status: "Both",
  });

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);
  const actions = [
    {
      text: "Add User",
      icon: require("../images/add-user.png"),
      name: "btnAddUser",
      position: 2,
    },
    {
      text: "Log Out",
      icon: require("../images/exit.png"),
      name: "btnLogOut",
      position: 1,
    },
    {
      text: "Profile",
      icon: require("../images/exit.png"),
      name: "btnProfile",
      position: 3,
    },
  ];
  const getdays = (lastDonatedDate) => {
    if (lastDonatedDate != undefined) {
      var now = new Date();
      var start = moment(lastDonatedDate, "YYYY-MM-DD");
      var end = moment(now, "YYYY-MM-DD");
      //Difference in number of days
      var Difference_In_Days = Math.floor(
        moment.duration(end.diff(start)).asDays()
      );
      console.log(parseInt(Difference_In_Days));
      return parseInt(Difference_In_Days);
    } else {
      console.log(0);
      return 0;
    }
  };
  const onRefresh = React.useCallback(() => {
    getAllUsers(dispatch, setRefreshing);
  }, [dispatch]);
  useEffect(() => {
    getAllUsers(dispatch, setCustomerLoading);
  }, [dispatch]);

  useEffect(() => {
    // const temp = allUsers.filter((u) => getdays(u.lastDonatedDate) > 40);
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
    registerByAdmin(sendingData, setLoading1, dispatch, toast);
  };

  // const filterAll = () => {

  //   const temp = allUsers;
  //   if (bGroup !== "All") {
  //     temp.filter((u) => {
  //       u.bloodGroup === bGroup;
  //     });
  //   }
  //   if (status !== "Both" && status === "Available") {
  //     temp.filter((u) => {
  //       getdays(u.lastDonatedDate) > 40;
  //     });
  //   }
  //   if (status !== "Both" && status === "NotAvailable") {
  //     temp.filter((u) => {
  //       getdays(u.lastDonatedDate) < 40;
  //     });
  //   }
  //   setUsers(temp);

  // };
  console.log(filterData);

  useEffect(() => {
    let temp = allUsers;
    // const tem1 = temp.filter((u) => u.bloodGroup === filterData.bGroup);
    if (filterData.bGroup !== "All") {
      temp = temp.filter((u) => u.bloodGroup === filterData.bGroup);
    }
    if (filterData.status === "Available") {
      temp = temp.filter((u) => getdays(u.lastDonatedDate) > 40);
    }
    if (filterData.status === "NotAvailable") {
      temp = temp.filter((u) => getdays(u.lastDonatedDate) < 40);
    }
    console.log(temp);
    setUsers(temp);
  }, [filterData]);

  useEffect(() => {
    const keys = ["name", "mobile", "studentId", "bloodGroup"];

    let temp = data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
    setUsers(temp);
    setSearchIconLoading(false);
  }, [query]);

  const handleMenu = (name) => {
    if (name === "btnLogOut") {
      logOut(dispatch);
    } else if (name === "btnAddUser") {
      // setShowModal(true);
      navigation.navigate("NewUser");
    } else if (name === "btnProfile") {
      console.log("btnprofile",user)
 
      navigation.navigate("Profile",user)
    }
  };

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
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Select
                    color={"light.100"}
                    w="88%"
                    selectedValue={filterData.bGroup}
                    mx={{
                      base: 0,
                      md: "auto",
                    }}
                    onValueChange={(nextValue) => {
                      setFilterData({ ...filterData, bGroup: nextValue });
                      // handlegbSelect(nextValue);
                      // filterAll();
                    }}
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
                <View
                  style={{
                    flex: 1,

                    alignItems: "center",
                  }}
                >
                  <Select
                    color={"light.100"}
                    w="88%"
                    selectedValue={filterData.status}
                    mx={{
                      base: 0,
                      md: "auto",
                    }}
                    onValueChange={(nextValue) => {
                      setFilterData({ ...filterData, status: nextValue });
                    }}
                    _selectedItem={{
                      bg: "cyan.600",
                    }}
                    accessibilityLabel="Select a blood group"
                  >
                    <Select.Item
                      color={"light.100"}
                      label={"All Donors"}
                      value={"Both"}
                    />

                    <Select.Item label={"Available"} value={"Available"} />
                    <Select.Item
                      label={"Not Available"}
                      value={"NotAvailable"}
                    />
                  </Select>
                </View>
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
                {users?.map((user, i) => {
                  return <CustomCard userData={user} navigation={navigation} key={i}></CustomCard>;
                })}
              </ScrollView>
            </View>
          )}

          <FloatingAction
            color="#4D4C7D"
            actions={actions}
            onPressItem={(name) => {
              handleMenu(name);
            }}
          />

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
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
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
