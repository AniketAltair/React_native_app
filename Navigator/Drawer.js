import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import help from '../screens/help';
import profileSettings from '../screens/profileSettings';
import About from '../screens/About';
import PreviousLocsGPS from '../screens/PreviousLocsGPS';
import MLmodel from '../screens/MLmodel';
import AppStack from '../navigation/AppStack';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,SafeAreaView
} from 'react-native';

const RootDrawerNavigator=createDrawerNavigator({
    HomeScreen:{
        screen: AppStack,  
    }, 
    Help:{
        screen: help,
    },
    ProfileSettings:{
        screen: profileSettings,
    },
    MLmodel:{
        screen: MLmodel,
    },
    About:{
        screen: About,
    },
    PreviousLocsGPS:{
        screen: PreviousLocsGPS,
    },
    
},
{
    contentComponent: (props) =>(
        <SafeAreaView >
        <View style={{height: 150, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
        <Image style={{width:100,height:100,resizeMode:'cover'}} source={require('../assets/pro.png')}/>
        </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>

    )
});
export default createAppContainer(RootDrawerNavigator);

