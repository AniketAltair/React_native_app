import React,{useState,useEffect,useRef } from 'react';
import {View, Text, StyleSheet, FlatList, Button, SafeAreaView,Dimensions} from 'react-native';
import FormButton from '../components/FormButton';
import firebase from'firebase';
import Routes from '../navigation/Routes';
import { Appbar } from 'react-native-paper';
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { set } from 'react-native-reanimated';





const height=Dimensions.get('window').height-22;

const gps = ({navigation}) => {

  const reload=()=>{
    console.log("hi");

    setlocs([{latitude:19.1765,longitude:72.9716,name:"nyname"},
  {latitude:15.1765,longitude:75.9716,name:"nyname1"},{latitude:18.1765,longitude:87.9716,name:"nyname2"}]);

    
    
  }
  

  /*const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mylatitude, setlat] = useState(0);
  const [mylong, setmylong] = useState(0);*/


  const [markers, setlocs] = useState([{latitude:19.1765,longitude:72.9716,name:"nyname"},
  {latitude:15.1765,longitude:75.9716,name:"nyname1"},{latitude:18.1765,longitude:87.9716,name:"nyname2"}]);

 


  const [region, setRegion] = useState({
    latitude: 33.8220918,
    longitude: -117.9199742,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });




 /*useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      
    })();
  }, []);

  useEffect(() => {
    (async () => {

      let gpsServiceStatus = await Location.hasServicesEnabledAsync();
      if (gpsServiceStatus) {
let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

} else {
        alert("Enable Location services"); //or any code to handle if location service is disabled otherwise
      }
      
    })();
  }, []);*/

  //dssdsds

  const mapRef = useRef();

  
  
  useEffect(() => {
    if (mapRef.current) {
      
      mapRef.current.fitToSuppliedMarkers(markers.map(({ _id }) => _id));
    }
  }, [markers]);

  console.log(markers);

  //sdddasda

 /* console.log("!!!!!!!!!!!!!!!!!!!");
  console.log(mylatitude);
  console.log(mylong);
  console.log("!!!!!!!!!!!!!!!!!!!");*/

  
 
  return (
    <SafeAreaView style={{flex:1}}>
      
      <MapView style={styles.map} ref={mapRef} zoomControlEnabled={true} >
        
      {markers.map((marker) => (
        <MapView.Marker
          key={marker._id}
          identifier={marker._id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name}
        />
        
      ))}
    </MapView>
    <View
    style={{
        position: 'absolute',//use absolute position to show button on top of the map
        top: '95%', //for center align
        alignSelf: 'flex-end',
        paddingRight:100
        //for align to right
    }}
>
    <Button title="zoom to markers" onPress={()=>reload()}/>
</View>

      
      
    
    </SafeAreaView>
    
    
  );
};

export default gps;

const styles=StyleSheet.create({
  map:{
    height,
    flex:1
  }
})