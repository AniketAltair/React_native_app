import React,{useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import FormButton from '../components/FormButton';
import firebase from'firebase';
import Routes from '../navigation/Routes';
import { Appbar } from 'react-native-paper';

const grpinfo = ({navigation}) => {

 
  return (
    
    <View>
      <Appbar.Header>
        <Appbar.Content title="Group Info" />
        <Appbar.Action icon="close" onPress={()=>navigation.pop()} />  
      </Appbar.Header>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>grpinfo</Text>
      
    </View>
    
  );
};

export default grpinfo;