import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button,Image} from 'react-native';
import FormButton from '../components/FormButton';
import firebase from'firebase';
import Routes from '../navigation/Routes';
import { Appbar } from 'react-native-paper';
import FormInput from '../components/Forminput';
import Route from "../navigation/Routes";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { set } from 'react-native-reanimated';



const HomeScreen = ({navigation}) => {

  const [name,setname]=useState("");
  const [number,setnumber]=useState("");
  const [websitelinks,setlinks]=useState("");
  const [status,setstatus]=useState("");

  const [verify, setverify] = useState(false);

  const [imagesource, setimage] = useState(require('../assets/pro.png'));

  const user = firebase.auth().currentUser;
  

  useEffect(() => {
    let imageRef = firebase.storage().ref('images/' + user.email);
    if(imageRef!=null){
      imageRef.getDownloadURL().then((url) => {
        setimage({uri:url})
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
    }else{
      setimage(require('../assets/pro.png'));
    }

    

  }, []);


  const signout=()=>{
    firebase.auth().signOut().then(()=>console.log("user signed out"));
    setverify(true);
  }

  const changeImage=async ()=>{

    let result=await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
    })
    console.log(result);
    if(!result.cancelled){
      setimage({uri:result.uri});
    }



    
    }

    const savechanges=async (uri,imagename)=>{
       const response = await fetch(uri);
       const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/"+imagename);
        return ref.put(blob); 

        console.log("hiiiiii");
        console.log(user.uid);

        firebase.firestore().collection('Users').doc(user.uid).add({
          name: name,
          number: number,
          websitelinks: websitelinks,
          status:status,
      
      })
      .then(() => {
      console.log('update done');
      
      
      });
    }

  

 
  return (
    verify?
    <Routes/>:
    
    <View>
      <Appbar.Header>
        <Appbar.Content title="profile Settings Screen" />
        <Appbar.Action icon="logout" onPress={()=>signout()} />
      </Appbar.Header>
      
      <TouchableOpacity style={styles.pro} onPress={()=>changeImage()}>
        <Image style={{width:100,height:100,resizeMode:'cover'}} source={imagesource}/>
      </TouchableOpacity>
      <View style={{paddingLeft:10,paddingRight:10}}>
      <FormInput
        //labelValue={name}
        onChangeText={(name) => setname(name)}
        placeholderText="Name"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        //labelValue={number}
        onChangeText={(number) => setnumber(number)}
        placeholderText="Phone Number"
        iconType="phone"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        //labelValue={websitelinks}
        onChangeText={(websitelinks) => setlinks(websitelinks)}
        placeholderText="WebSite Links"
        iconType="link"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        //labelValue={status}
        onChangeText={(status) => setstatus(status)}
        placeholderText="Status"
        iconType="laptop"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Save changes" onPress={()=>{savechanges(imagesource.uri,user.email);
      navigation.navigate('HomeScreen');}}/>
      </View>
      
      
    </View>
    
  );
};

export default HomeScreen;

const styles=StyleSheet.create({
  
  pro:{
    paddingLeft:150,
    paddingTop:100,
    
  }
});

/*const options={
      quality:0.7, allowsEditing:true,mediaType:'photo',noData:true,
      storageOptions:{
        skipBackup:true,waitUntilSaved:true,path:'images',cameraRoll:true
      },
      };

      ImagePicker.showImagePicker(options,response=>{
        if(response.error){
          console.log(error);
        }else if(!response.didCancel){
          setimage(response.uri);
        }
      });*/