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
import { ImageBackground, LogBox, StyleSheet, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { register } from "../redux/apiCalls";
const Register = ({ navigation }) => {
  const [districtSelect, setDistrict] = React.useState(null);
  const [bloodGroupselect, setBloodGroup] = React.useState([]);
  const [subDistrict, setSubDistrict] = React.useState([]);
  const [singleSub, setSingleSub] = React.useState(null);
  const [formData, setData] = React.useState({});
  const [error, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
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

  const onSubmit = () => {
    const findblood = bloodGroup.find((i) => i.id === bloodGroupselect);
    // const findDistrict = districts.find((i) => i.id === districtSelect);
    // const findSubDistrict = subDistricts.find((i) => i.id === singleSub);
    if (formData.password !== formData.confirmPass) {
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
      register(sendingData, setLoading, navigation, toast);
    }
  };
  return (
    <View
    
    style={styles.maincontainer}
  >
    
      <ScrollView
        h="100%"
        w="100%"
         
        _contentContainerStyle={{
          px: "20px",
          mb: "4",
          minW: "72",
        }}
      >
        <Box  safeArea p="2" w="90%" maxW="290" py="8">
          <VStack space={3}>
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
            {/* <FormControl>
              <FormControl.Label>Select District</FormControl.Label>
              <Select
                selectedValue={districtSelect}
                minWidth="200"
                accessibilityLabel="Select District"
                placeholder="Select District"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => handleDistrictChange(itemValue)}
              >
                {districts.map((item, i) => {
                  return (
                    <Select.Item key={i} label={item.name} value={item.id} />
                  );
                })}
              </Select>
            </FormControl> */}
            {/* <FormControl>
              <FormControl.Label>Select Sub-District</FormControl.Label>
              <Select
                selectedValue={singleSub}
                minWidth="200"
                accessibilityLabel="Select Sub-District"
                placeholder="Select Sub-District"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => handleSubDistrict(itemValue)}
              >
                {subDistrict.map((item, i) => {
                  return (
                    <Select.Item key={i} label={item.name} value={item.id} />
                  );
                })}
              </Select>
            </FormControl> */}

            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setData({ ...formData, password: value })
                }
                type="password"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setData({ ...formData, confirmPass: value })
                }
                type="password"
              />
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
    
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    marginLeft:15,
    // backgroundColor:'red'
  }
   
});
