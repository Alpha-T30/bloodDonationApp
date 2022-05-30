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
} from "native-base";
import SearchableDropdown from "react-native-searchable-dropdown";
import { bloodGroup, districts, subDistricts } from "../../Data/data";
import SearchAndPic from "./SearchAndPick";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
const Register = ({ navigation }) => {
  const [districtSelect, setDistrict] = React.useState(null);
  const [bloodGroupselect, setBloodGroup] = React.useState([]);
  const [subDistrict, setSubDistrict] = React.useState([]);
  const [singleSub, setSingleSub] = React.useState(null);
  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  const handleDistrictChange = (item) => {
    console.log(item);
    setDistrict(item);
    const temp = subDistricts.filter((i) => i.districtId === item);
    console.log(temp);
    setSubDistrict(temp);
  };
  const handleSubDistrict = (item) => {
    setSingleSub(item);
    //   setDistrict(item);
    //  const temp = subDistricts.filter(item=>item.districtId===item.id)
    //  setSubDistrict(temp)
  };
  return (
    <Center w="100%">
      <ScrollView
        h="100%"
        w="100%"
        _contentContainerStyle={{
          px: "20px",
          mb: "4",
          minW: "72",
        }}
      >
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mobile</FormControl.Label>
              <Input />
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
            <FormControl>
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
            </FormControl>
            <FormControl>
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
            </FormControl>

            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type="password" />
            </FormControl>
            <Button mt="2" colorScheme="indigo">
              Sign up
            </Button>
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
    </Center>
  );
};

export default Register;
