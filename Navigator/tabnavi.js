import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import React,{useState} from 'react';



import ChatActivity from "../screens/chatActivity";
import Gpslocgrp from "../screens/Gpslocgrp";
import grpinfo from "../screens/grpinfo";

const Tab = createMaterialBottomTabNavigator();


const BottomNavigator=({route,navigation})=>{
    const {g}=route.params;
    console.log("++++++++++++++++++++++++");
    console.log(g);
    console.log("++++++++++++++++++++++++");

    return(
      
        <Tab.Navigator initialRouteName="ChatActivity" >
            
          <Tab.Screen name="ChatActivity" component={ChatActivity} initialParams={route.params}/>
          <Tab.Screen name="grpinfo" component={grpinfo} initialParams={route.params}/>
          <Tab.Screen name="Gpslocgrp" component={Gpslocgrp} initialParams={route.params} />
    
        </Tab.Navigator>
      
    );
}; 
    
  
        
    


export default BottomNavigator;