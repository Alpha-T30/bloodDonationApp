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
import { LogBox } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { register, registerByAdmin } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
const NewUser = ({ navigation }) => {
  const [districtSelect, setDistrict] = React.useState(null);
  const [bloodGroupselect, setBloodGroup] = React.useState([]);
  const [subDistrict, setSubDistrict] = React.useState([]);
  const [singleSub, setSingleSub] = React.useState(null);
  const user = useSelector((state) => state.persistedData.auth?.currentUser);
  const [formData, setData] = React.useState({
    name: "",
    mobile: "",
    studentId: "",
    session: "",
    bloodGroup: "",
    password: "",
    lastDonatedDate: "",
    bloodGroupId: "",
  });
  const [error, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  React.useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const onSubmit = () => {
    const findblood = bloodGroup.find((i) => i.id === bloodGroupselect);
    let datee = new Date();
    const sendingData = {
      ...formData,
      bloodGroupId: bloodGroupselect,
      bloodGroup: findblood?.name,
      password: formData.password ? formData.password : "123456",
      lastDonatedDate: datee.toString(),
      email: "",
    };

    console.log(sendingData);

    registerByAdmin(sendingData, setLoading, dispatch, toast);
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

            <Button onPress={onSubmit} mt="2" colorScheme="indigo">
              {isLoading ? <Spinner color="warning.500" /> : "Add User"}
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default NewUser;
