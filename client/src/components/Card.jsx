import React, { useEffect } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Flex,
  Button,
  Icon,
} from "native-base";
import moment from "moment";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { Linking, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const CustomCard = ({ userData }) => {
  // const [isCapable, setCapability] = React.useState(null);

  const user = useSelector((state) => state.persistedData.auth?.currentUser);
  const dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const getdays = (lastDonatedDate) => {
    console.log(lastDonatedDate);
    if (lastDonatedDate != undefined) {
      var now = new Date();
      var start = moment(lastDonatedDate, "YYYY-MM-DD");
      var end = moment(now, "YYYY-MM-DD");
      //Difference in number of days
      var Difference_In_Days = Math.floor(
        moment.duration(end.diff(start)).asDays()
      );
      return Difference_In_Days;
    } else {
      return "";
    }
  };
  return (
    <RNBounceable bounceEffect={1}>
      <Box alignItems="center">
        <Box
          style={{ display: "flex" }}
          mt={"5"}
          w={"97%"}
          rounded="lg"
          overflow="hidden"
          borderColor="amber.500"
          borderWidth="1"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "dark.50",
          }}
        >
          <Flex style={{ width: "100%" }} direction="row">
            <Stack flex={"2"} p="4" space={3}>
              <Stack space={2}>
                <Heading color={"coolGray.500"} size="md" ml="-1">
                  {userData.name}
                </Heading>
                {getdays(userData.lastDonatedDate) > 40 ? (
                  <Heading color={"success.600"} size="md" ml="-1">
                    {"Capable"}
                  </Heading>
                ) : (
                  <Heading color={"error.600"} size="md" ml="-1">
                    {"Not Capable"}
                  </Heading>
                )}
              </Stack>

              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    {"Last blood donated " +
                      getdays(userData.lastDonatedDate) +
                      " days ago"}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
            <Stack direction={"column"} flex={"1"} p="4" space={3}>
              <Stack direction={"column"} space={2}>
                <Heading color={"amber.500"} size="md" ml="-1">
                  {userData?.bloodGroup}
                </Heading>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  {userData.mobile}
                </Text>
                <Button
                  onPress={() => {
                    dialCall(userData.mobile);
                  }}
                  leftIcon={<Icon as={Feather} name="phone-call" size="sm" />}
                >
                  Call
                </Button>
              </Stack>

              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  ></Text>
                </HStack>
              </HStack>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </RNBounceable>
  );
};

export default CustomCard;
