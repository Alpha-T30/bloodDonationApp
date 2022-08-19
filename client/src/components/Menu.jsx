import React from 'react'
import { Menu, HamburgerIcon, Box, Pressable, Center, NativeBaseProvider, Button, DeleteIcon, InfoIcon } from 'native-base';
import { View } from 'react-native';
function CustomMenu() {
    return <Box>

        <Pressable>

        <InfoIcon size="17" color="amber.800" />
        </Pressable>
        <Pressable>

        <DeleteIcon size="17" color="red.800" />
        </Pressable>

   
    </Box>
}

export default CustomMenu