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
  Stack,
  WarningOutlineIcon,
} from "native-base";
import SearchableDropdown from "react-native-searchable-dropdown";
import { bloodGroup, districts, subDistricts } from "../../Data/data";
import SearchAndPic from "./SearchAndPick";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  ImageBackground,
  LogBox,
  StyleSheet,
  View,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { register } from "../redux/apiCalls";
const Register = ({ navigation }) => {
  const [districtSelect, setDistrict] = React.useState(null);
  const [bloodGroupselect, setBloodGroup] = React.useState([]);
  const [subDistrict, setSubDistrict] = React.useState([]);
  const [singleSub, setSingleSub] = React.useState(null);
  const [formData, setData] = React.useState({
    name: "",
    mobile: "",
    studentId: "",
    seassion: "",
    password: "",
    confirmPass: "",
  });
  const [error, setError] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const screenWidth = Dimensions.get("window").width;
  const handleDistrictChange = (item) => {
    setDistrict(item);
    const temp = subDistricts.filter((i) => i.districtId === item);
    setSubDistrict(temp);
  };
  const handleSubDistrict = (item) => {
    setSingleSub(item);
    //   setDistrict(item);
    //  const temp = subDistricts.filter(item=>item.districtId===item.id)
    //  setSubDistrict(temp)
  };

  //validation
  const validate = (sendingData) => {
    if (
      sendingData?.name === undefined ||
      sendingData?.name.length < 3 ||
      sendingData?.mobile?.length !== 11 ||
      sendingData?.studentId.length !== 10 ||
      sendingData?.password.length < 6
    ) {
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    const findblood = bloodGroup.find((i) => i.id === bloodGroupselect);
    // const findDistrict = districts.find((i) => i.id === districtSelect);
    // const findSubDistrict = subDistricts.find((i) => i.id === singleSub);
    if (formData?.password !== formData?.confirmPass) {
      setError(true);
    } else {
      const sendingData = {
        ...formData,
        bloodGroupId: bloodGroupselect,
        bloodGroup: findblood?.name,
        lastDonatedDate: new Date(),

        // districtId: districtSelect,
        // subDistrictId: singleSub,

        // district: findDistrict.name,
        // subDistrict: findSubDistrict.name,
      };
      console.log(sendingData);

      validate(sendingData)
        ? register(sendingData, setLoading, navigation, toast)
        : toast.show({
            placement: "top",
            title: "Validation Failed",
          });
    }
  };
  return (
    <Center w="100%">
      <Stack mt="1">
        <ScrollView
          h="100%"
          w={screenWidth}
          bg={"red.100"}
          mt="7"
          _contentContainerStyle={{
            alignItems: "center",

            // px: "90px",
            // mb: "4",
            // minW:`${screenWidth}`
          }}
        >
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <VStack space={3}>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Name
                </FormControl.Label>
                <Input
                  onChangeText={(value) =>
                    setData({ ...formData, name: value })
                  }
                />
                {
                  <Text style={{ color: "blue", fontSize: 12 }}>
                    {formData?.name.length < 3
                      ? "Name Must be at least 3 character"
                      : ""}
                  </Text>
                }
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Mobile
                </FormControl.Label>
                <Input
                  onChangeText={(value) =>
                    setData({ ...formData, mobile: value })
                  }
                />
                {
                  <Text style={{ color: "blue", fontSize: 12 }}>
                    {formData?.mobile?.length !== 11
                      ? "Phone Number Must be  of 11 Digits"
                      : ""}
                  </Text>
                }
              </FormControl>
              <FormControl
                isRequired
                _text={{
                  bold: true,
                }}
              >
                <FormControl.Label>Student ID</FormControl.Label>
                <Input
                  onChangeText={(value) =>
                    setData({ ...formData, studentId: value })
                  }
                />
                {
                  <Text style={{ color: "blue", fontSize: 12 }}>
                    {formData?.studentId?.length !== 10
                      ? "Student ID Must be at least of 10 digits"
                      : ""}
                  </Text>
                }
              </FormControl>
              <FormControl>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Session
                </FormControl.Label>
                <Input
                  onChangeText={(value) =>
                    setData({ ...formData, session: value })
                  }
                />
              </FormControl>
              <FormControl isRequired={true}>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}
                >
                  Blood Group
                </FormControl.Label>
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

              <FormControl isRequired>
                <Stack>
                  <FormControl.Label
                    _text={{
                      bold: true,
                    }}
                  >
                    Password
                  </FormControl.Label>
                  <Input
                    onChangeText={(value) =>
                      setData({ ...formData, password: value })
                    }
                    type="password"
                  />

                  {
                    <Text style={{ color: "blue", fontSize: 12 }}>
                      {formData?.password?.length < 6
                        ? "Password Must be at least 6 characters"
                        : ""}
                    </Text>
                  }
                </Stack>
              </FormControl>

              <FormControl isRequired>
                <Stack>
                  <FormControl.Label
                    _text={{
                      bold: true,
                    }}
                  >
                    Confirm Password
                  </FormControl.Label>
                  <Input
                    onChangeText={(value) =>
                      setData({ ...formData, confirmPass: value })
                    }
                    type="password"
                  />
                  <Text style={{ color: "blue", fontSize: 12 }}>
                    {formData?.confirmPass?.length < 6
                      ? "Password Must be at least 6 characters"
                      : ""}
                  </Text>
                </Stack>
              </FormControl>
              <Button onPress={onSubmit} mt="2" colorScheme="indigo">
                {isLoading ? <Spinner color="warning.500" /> : "Sign up"}
              </Button>

              <Text style={{ color: "red" }}>
                {error ? "Password Does Not Matched" : ""}
              </Text>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Already a user?
                </Text>
                <Text
                  style={{
                    color: "blue",
                    textDecorationLine: "underline",
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  Login
                </Text>
              </HStack>
            </VStack>
          </Box>
        </ScrollView>
      </Stack>
    </Center>
  );
};

export default Register;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginLeft: 15,
    // backgroundColor:'red'
  },
});
