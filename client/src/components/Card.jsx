import React from "react";
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
} from "native-base";
import moment from "moment";
import RNBounceable from "@freakycoder/react-native-bounceable";

const CustomCard = ({ userData }) => {
  return (
    <RNBounceable bounceEffect={1}>
      <Box alignItems="center">
        <Box
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
          {/* <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          }} alt="image" />
          </AspectRatio>
          <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            PHOTOS
          </Center>
        </Box> */}
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading color={"coolGray.500"} size="md" ml="-1">
                {userData.name}
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
                Department of Physics
              </Text>
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
                  {"Member since, " +
                    moment(userData.createdAt).format("MMMM-YYYY")}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </RNBounceable>
  );
};

export default CustomCard;
