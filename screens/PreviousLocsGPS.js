import React,{useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import FormButton from '../components/FormButton';
import firebase from'firebase';
import Routes from '../navigation/Routes';
import { Appbar } from 'react-native-paper';

const HomeScreen = () => {

 
  return (
    
    <View>
    <Appbar.Header>
        <Appbar.Content title="Previous locations Screen" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>GPSscreen</Text>
      
    </View>
    
  );
};

export default HomeScreen;