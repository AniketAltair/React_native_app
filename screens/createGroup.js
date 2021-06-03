import React,{useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button,TextInput,SafeAreaView,StatusBar} from 'react-native';
import FormButton from '../components/FormButton';
import firebase from'firebase';
import Routes from '../navigation/Routes';

import { Appbar } from 'react-native-paper';

const DATA = [];



const Item = ({ title }) => (
  <View style={styles.item} >
    <Text style={styles.title}>{title}</Text>
    <Button  title="Remove"/>
  </View>
);

const changeD=()=>{
  DATA.length=0; 
}


const HomeScreen = ({navigation}) => {


    const [value, onChangeText] = useState("");
    const [name, setname] = useState("");
    const [k,setk]=useState(0);
    const [g,setg]=useState(0);
    const [d,setd]=useState([]);

    


  

  const makegrp = async()=>{




    const grps = await firebase.firestore()
  .collection('Groups')
  .get().then(snapshot => {
    snapshot.forEach(doc => {
      if (doc && doc.exists) {
        if (value === doc.data().groupname){
          alert("groupname exists");
          onChangeText("");
          
          throw {}
        }
        
      }
    });
  });

  

    const user = firebase.auth().currentUser;
    d.push(user.email);
    const newd=[...new Set(d)];

    firebase.firestore().collection('Groups').add({
      groupname: value,
      members: newd,

})
.then(() => {
  console.log('grp made!');
});

   await firebase.firestore().collection('Users').get().then(snapshot=>{
  snapshot.forEach(doc=>{
    for (var i=0;i<newd.length;i++){
      if(doc.data().email==newd[i]){
        const n=doc.data().email;
    const ar=doc.data().groups;
    ar.push(value);
    ar.pop()

    console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo');
    console.log(doc.id);
    console.log(ar);
    console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo');
    ar.push(value);
    firebase.firestore().collection('Users').doc(doc.id).update({groups: ar}).then(() => {
      console.log('user updated');
    });
    break
      }
    }
    
  });
});

/*for (var i=0;i<d.length;i++){

  firebase.firestore().collection('Users').add({
    groupname: value,
    members: d,
  
  

})



}*/


if(d.length!=0){
  setd([]);
}
console.log("==================================");
console.log(d);
console.log("==================================");

firebase.firestore().collection(value).add({
  chat: "Hello Users!!!",
  name: user.email,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
.then(() => {
console.log('grp made!');


});





  }

    
    
  
    
  const adduser=async({name})=>{

    
    console.log("@@@@@@@@@@@@");
    console.log(name);
    console.log("@@@@@@@@@@@@");
    const users = await firebase.firestore()
  .collection('Users')
  .get().then(snapshot => {
    snapshot.forEach(doc => {
      if (doc && doc.exists) {
        if (name === doc.data().email){
          setk(1);
          DATA.push({id: name,
            title: name
          });
          d.push(name);
          setname("");
          console.log(DATA);
          throw {}
        }
        
        //console.log(doc.id, ' => ', doc.data().email);
      }
    });
  });
if (k==0){
  alert("name does not exist");
}
      
    }



  return (
    
    <View>
      <Appbar.Header>
        <Appbar.Content title="Create Group" />
        <Appbar.Action icon="close" onPress={()=>navigation.pop()} />
      </Appbar.Header>
      <View>
      <TextInput
      placeholder="Group Name"
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(text) => onChangeText(text)}
      value={value}
    />
      </View>
      <View>
      <TextInput
      placeholder="Name"
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(text) => setname(text)}
      value={name}
    />
      </View>
      <Button
           title="Add"
           color="#841584"
           onPress={()=> adduser({name})} />
      <Button
           title="Make Group"
           color="#841584"
           onPress={()=> {
            makegrp(); 
            changeD();
            
            navigation.pop();
            }} />
      
    
    <Text>Members :-</Text>
    
    
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item title={item.title} />
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