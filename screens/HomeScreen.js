import React,{useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button,StatusBar,ActivityIndicator,RefreshControl} from 'react-native';
import FormButton from '../components/FormButton';
import firebase from'firebase';
import Routes from '../navigation/Routes';

import { Appbar } from 'react-native-paper';






const HomeScreen = ({navigation}) => {

  const [Grps, setgrp] = useState([]); 

  const [verify, setverify] = useState(false);
  const [nb, setnb] = useState([]); 

  //refresh control

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, []);


  const Item = ({ title }) => (
    <View style={styles.item} >
      <Text style={styles.title} >{title}</Text>
    </View>
  );


  const signout=()=>{
    firebase.auth().signOut().then(()=>console.log("user signed out"));
    setverify(true);
  }

  const user = firebase.auth().currentUser;
  

  /*if(user!=null){
    shoot();
  }*/

  
  async function shoot(){
    const users = await firebase.firestore()
  .collection('Users')
  .get().then(snapshot => {
    snapshot.forEach(doc => {
      if (doc && doc.exists) {
        if (user.email === doc.data().email){
          doc.data().groups.forEach(ele=>{
            Grps.push({id: ele,
              title: ele});
          });
          //Grps=doc.data().groups;
          console.log("************************");
          setnb(Grps.slice(0,doc.data().groups.length));
          console.log(nb);
          console.log(Grps);
          console.log("************************");
          
        }
        
        //console.log(doc.id, ' => ', doc.data().email);
      }
      

    });
    
  });

  setgrp([]);
  

    }

  

    return (
      verify?
      <Routes />:
      
      <View>
        <Appbar.Header>
          <Appbar.Content title="Home Screen" />
          <Appbar.Action icon="logout" onPress={()=>signout()} />
          
        </Appbar.Header>
  
        <Button
             title="Create Group"
             color="#841584"
             onPress={()=> navigation.navigate("Creategrp")} />
      
      <Text>hello</Text>
      <Button
             title="Groups"
             color="#841584"
             onPress={()=> shoot() } />
      
      <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={nb}
          renderItem={({item}) => (
            <View style={styles.item} >
               <Text style={styles.title} onPress={()=>navigation.navigate("tabnavi",{g:item.title})} >{item.title}</Text>
            </View>
            
          )}
          
          keyExtractor={item => item.id}
        />
      
        
      
    </View>
    
      
    );    

  
  

  
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
});

/*<FlatList
        data={Grps}
        renderItem={({ item }) => (
          <Item title={item.title} />
        )}
        
        keyExtractor={item => item.id}
      /> */