import { NavigationContainer } from '@react-navigation/native';
import React,{useContext,useState,useEffect } from 'react';
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import firebase from 'firebase';
import Drawer from '../Navigator/Drawer';

const Routes = () => {

    const [authUser,setAuthUser] = useState(null);
    const [authWasListened,setAuthWasListened] = useState(false);

    useEffect(()=>{
        console.log('Running App useEffect...');

        return firebase.auth().onAuthStateChanged(
          (authUser) => {
    
            console.log(authUser);
            console.log(authUser.uid);
    
            if(authUser) {
              setAuthUser(authUser);
              setAuthWasListened(true);
            } else {
              setAuthUser(null);
              setAuthWasListened(true);
            }
    
          }
        );
    
      },[]);


    return(
        <NavigationContainer independent={true}>
            {authWasListened? <Drawer/>:<AuthStack/>}
        </NavigationContainer>
    );
};

export default Routes;