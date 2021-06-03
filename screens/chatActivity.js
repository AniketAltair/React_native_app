import React,{useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button,StatusBar,TextInput,RefreshControl} from 'react-native';
import FormButton from '../components/FormButton';
import firebase from'firebase';
import Routes from '../navigation/Routes';




import { Appbar } from 'react-native-paper';

const chatActivity = ({route,navigation}) => {

  const [value, onChangeText] = useState("");
  const [chat,setchat]=useState([]);
  const [l,setl]=useState(0);
  const [nb, setnb] = useState([]); 

  

  //refresh control

  


  


  const {g}=route.params;
  //const g =navigation.dangerouslyGetParent();
  console.log(g);
  const user = firebase.auth().currentUser;

  

//setchat([]);
//bring data from firestore
if(user!=null){
  
  const info = firebase.firestore()
  .collection(g)
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      setl(querySnapshot.size);
      chat.push({id:documentSnapshot.id, message: documentSnapshot.data().chat, name:documentSnapshot.data().name});
      
      //setchat([]);
      console.log(chat);
      //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data(), documentSnapshot.data());
    });
    //setnb(chat.slice(0,l));
    //setchat([]);
  });
}



//ends here firestore data







//on add message to datastore
const add=()=>{
  firebase.firestore().collection(g).add({
    chat: value,
    name: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),

})
.then(() => {
console.log('chat done');


});
onChangeText("")

}


//ends here

  return (
    
    
    
    <View>
      <Appbar.Header>
        <Appbar.Content title="Chat Room" />
        <Appbar.Action icon="close" onPress={()=>navigation.pop()} />        
      </Appbar.Header>

      
    <View style={styles.flexxy}>
    <TextInput
      
      multiline={true}
      removeClippedSubviews={false}
      placeholder="Message"
      //keyboardAppearance=
      style={{ height: 40, borderColor: 'gray',marginLeft:5 ,borderWidth: 1,padding:5,width:360,marginTop:5}}
      onChangeText={(text) => onChangeText(text)}
      value={value}
    />
    <Button style={styles.button}
           title="Add"
           color="#841584"
           onPress={()=>add()}
            />

    </View>

    
    
    
    
    
    
    
  </View>
  
    
  );
};

export default chatActivity;

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
  title_m: {
    fontSize: 5,
  },
  flexxy:{
    flexDirection: 'row'
  },
  button:{
    marginTop:10,
    height:10
  }
});

/*<FlatList
          
          data={chat}
          renderItem={({item}) => (
            <View style={styles.item} >
               <Text style={styles.title} >{item.message}</Text>
               <Text style={styles.title_m} >{item.name}</Text>
            </View>
            
          )}
          
          keyExtractor={item => item.id}
        />*/