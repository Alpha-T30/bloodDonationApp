import * as React from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
  HStack,
  Text,
  ScrollView,
  Select,
  CheckIcon,
  Spinner,
  useToast,
} from "native-base";
import SearchableDropdown from "react-native-searchable-dropdown";
import { bloodGroup, districts, subDistricts } from "../../Data/data";
import SearchAndPic from "./SearchAndPick";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions, LogBox } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { register, updateGeneralUser, updateUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNBounceable from "@freakycoder/react-native-bounceable";

import moment from "moment";
const Profile = ({ route, navigation }) => {
  const [districtSelect, setDistrict] = React.useState(null);
  const [subDistrict, setSubDistrict] = React.useState([]);
  const [singleSub, setSingleSub] = React.useState(null);
  const dispatch = useDispatch();

  const user = route.params;

  const [bloodGroupselect, setBloodGroup] = React.useState(user?.bloodGroupId);
  const [formData, setData] = React.useState({
    ...user,
  });
  const [error, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const [date, setDate] = React.useState(user?.lastDonatedDate);

  const [show, setshow] = React.useState(false);
  const [isCapable, setCapability] = React.useState(null);
  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  const screenWidth = Dimensions.get("window").width;
  const onSubmit = () => {
    const sendingData = {
      ...formData,

      lastDonatedDate: date,
    };

    console.log(sendingData);
    if (user.isAdmin) {
      updateUser(dispatch, sendingData, setLoading, toast);
    } else {
      updateGeneralUser(dispatch, sendingData, setLoading, toast);
    }
    // register(sendingData, setLoading, navigation, toast);
  };

  useEffect(() => {
    var now = new Date();
    var bloodDonationTime = user?.lastDonatedDate;
    console.log(bloodDonationTime);
    if (bloodDonationTime) {
      var start = moment(bloodDonationTime, "YYYY-MM-DD");
      var end = moment(now, "YYYY-MM-DD");

      //Difference in number of days
      const Difference_In_Days = Math.floor(
        moment.duration(end.diff(start)).asDays()
      );

      setCapability(Difference_In_Days);
      console.log(Math.floor(Difference_In_Days), "diff");
    }
  }, [user]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setshow(false);
    if (event?.type === "dismissed") {
      setDate(date);
    } else if (event?.type === "set") {
      setDate(currentDate);
    }
  };
  return (
    <Center w="100%">
      <ScrollView
        h="100%"
        w={screenWidth}
        bg={"red.100"}
        _contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Last Blood Donated Date</FormControl.Label>

              {/* {isCapable > 40 && ( */}
              <RNBounceable onPress={() => setshow(true)}>
                <Box
                  bg="violet.800"
                  _text={{
                    fontSize: "xl",
                    fontWeight: "bold",
                    color: "warmGray.50",
                    letterSpacing: "lg",
                  }}
                  p="4"
                  rounded="xl"
                  mb={"4"}
                >
                  {moment(date).format("YYYY/MM/DD")}
                </Box>
              </RNBounceable>
              {/* )} */}

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode="date"
                  value={new Date(date)}
                  onChange={(event, date) => onChange(event, date)}
                />
              )}

              {/* <Box>{moment(date).format("YYYY/MM/DD")}</Box> */}
            </FormControl>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                variant={"underlined"}
                value={formData.name}
                onChangeText={(value) => setData({ ...formData, name: value })}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mobile</FormControl.Label>
              <Input
                variant={"underlined"}
                value={formData.mobile}
                onChangeText={(value) =>
                  setData({ ...formData, mobile: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Student ID</FormControl.Label>
              <Input
                variant={"underlined"}
                value={formData.studentId}
                onChangeText={(value) =>
                  setData({ ...formData, studentId: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Session</FormControl.Label>
              <Input
                variant={"underlined"}
                value={formData.session}
                onChangeText={(value) =>
                  setData({ ...formData, session: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Blood Group</FormControl.Label>
              <Select
                selectedValue={formData.bloodGroup}
                minWidth="200"
                accessibilityLabel="Select Blood Group"
                placeholder="Select Blood Group"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) =>
                  setData({ ...formData, bloodGroup: itemValue })
                }
              >
                {bloodGroup.map((item, i) => {
                  return (
                    <Select.Item key={i} label={item.name} value={item.name} />
                  );
                })}
              </Select>
            </FormControl>

            <FormControl>
              <FormControl.Label>New Password</FormControl.Label>
              <Input
                variant="underlined"
                onChangeText={(value) =>
                  setData({ ...formData, password: value })
                }
                type="text"
              />
            </FormControl>

            <Button onPress={onSubmit} mt="2" colorScheme="indigo">
              {isLoading ? <Spinner color="warning.500" /> : "Update"}
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default Profile;
