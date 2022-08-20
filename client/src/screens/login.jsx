import * as React from "react";
import { useDispatch } from "react-redux";
import { logIn, logIntoApp } from "../redux/apiCalls";
import { registerSwitch } from "../redux/uiSlice";
import { Wave } from "react-native-animated-spinkit";
// import {StyleSheet} from 'react-native'

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Spinner,
  useToast,
   
} from "native-base";
import { loginSuccess } from "../redux/authSlice";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

const Login = ({ navigation }) => {
  const [formData, setData] = React.useState({});
  const toast = useToast();
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log(formData);
    logIntoApp(dispatch, formData, setLoading, toast,navigation);
  };
  return (
    <ImageBackground
      source={require("../images/loginbg3.jpg")}
      style={styles.maincontainer}
    >
       
    <View style={styles.logoimg}>
    <Image

        style={styles.logo}
        source={require('../images/logo1.png')}
      />
    </View>
    <Center w="100%">
    
      <Box safeArea p="2" py="8" w="90%" maxW="290">
      
        {/* <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading> */}
         

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Student ID</FormControl.Label>
            <Input
              onChangeText={(value) =>
                setData({ ...formData, studentId: value })
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label >Password</FormControl.Label>
            <Input
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
              type="password"
            />
          </FormControl>
          <Button onPress={onSubmit} mt="2" h={"10"} colorScheme="indigo">
            {isLoading ? (
              <Wave
                animating={isLoading}
                hidesWhenStopped={isLoading}
                size={34}
                color="#FFF"
              ></Wave>
            ) : (
              "Log In"
            )}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Text
              style={{
                color: "blue",
                textDecorationLine: "underline",
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Sign Up
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
    </ImageBackground>

  );
};

export default Login;


const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    flex: 1,
  },
  logoimg:{
     
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
     
    
   
  } , 
  logo:{
    width:150,
    height:150
  }
   
});
