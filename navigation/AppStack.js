import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Creategrp from '../screens/createGroup';
import ChatActivity from '../screens/chatActivity';
import tabnavi from '../Navigator/tabnavi';
import { createAppContainer } from 'react-navigation';


const Stack = createStackNavigator();

const AppStack = () => {

    return (
        <Stack.Navigator initialRouteName={HomeScreen}>
          <Stack.Screen
            name="Homescreen"
            component={HomeScreen}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Creategrp"
            component={Creategrp}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="tabnavi"
            component={tabnavi}
            options={{header: () => null}}
          />
        </Stack.Navigator>
      );

};

export default createAppContainer(AppStack);