import React, { useEffect, useState } from 'react';
import { Modal, Text, View,Button, TouchableOpacity, StyleSheet, Image ,Platform, PermissionsAndroid} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar } from 'native-base';
import Home from '../page/home';
import Profile from '../page/profile/profile';
import Explore from '../page/explore/explore';
import calculateResponsiveFontSize from '../utils/font';
import { useNavigation } from '@react-navigation/native';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'; // Import the library

import { useDispatch } from 'react-redux';
import { setImage } from '../redux/imageSlice';
const Tab = createBottomTabNavigator();

const MiddleButton = ({ onPress }) => (
  <TouchableOpacity style={styles.addButtonOuter} onPress={onPress}>
    <View style={styles.addButtonInner}>
      <Image
        source={require('../images/exploreApp.png')} // Replace with your icon image
        resizeMode="contain"
        style={{
          width: '90%',
          height: '90%',
          marginTop: 10,
        }}
      />
    </View>
  </TouchableOpacity>
);

function BottomStack({logout}) {

  const navigation = useNavigation()
  const dispatch = useDispatch();

 
const [hasPermission, setHasPermission] = useState(false);

const requestPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version < 33) {
        // Android 12 or below, request READ_EXTERNAL_STORAGE permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission to access photos',
            message: 'We need your permission to access your photos',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      } else {
        // Android 13 (Android S) and higher, request ACCESS_MEDIA_IMAGE permission
        const granted = await PermissionsAndroid.request(
          'android.permission.READ_MEDIA_IMAGES',
          {
            title: 'Permission to access photos',
            message: 'We need your permission to access your photos',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

// const handleImagePicker = () => {
//   READ_MEDIA_IMAGES
//     ImagePicker.launchImageLibrary(
//       {
//         mediaType: 'photo',
//         includeBase64: false,
//         quality: 0.1,
//       },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else {
//           // console.log(response)
//           dispatch(setImage(response?.assets));
//           navigation.navigate('Snap');
//         }
//       }
//     );
//   } else {
//     // console.log('Permission denied');
//     requestPermission()

//     // You can provide feedback to the user here
//   }
 
// };

const handleImagePicker = async() => {
  if(hasPermission){
    try {
      const response = await ImagePicker.openPicker({
        mediaType: 'photo',
      });

      if (response.path) {
        // Compress the image before setting it
        const compressedImage = await ImagePicker.openCropper({
          path: response.path,
          width: 800, // Adjust the desired width
          height: 800, // Adjust the desired height
          cropperCircleOverlay: false, // Adjust as needed
          compressImageQuality: 1, // Adjust the quality (0 to 1)
        });
// console.log(compressedImage?.path, "conpresssssssssssa")
        dispatch(setImage(compressedImage.path));
        navigation.navigate('Snap')
      }
    } catch (error) {
      console.log('Image picking or cropping error:', error);
    }
  }
  else{
    requestPermission()
  }
 
};
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabIconContainer}>
                <Image
                  source={require('../images/home.png')}
                  resizeMode="contain"
                  style={[styles.tabIcon]}
                />
                <Text
                  fontSize="sm"
                  fontWeight="400"
                  color={focused ? '#159575' : '#242424'}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          options={{
            tabBarButton: (props) => <MiddleButton {...props} />,
          }}
        >
          {() => (
               <View style={styles.modalContainer}>
               <View style={styles.modalContent}>
                 <Text style={[styles.modalText, {fontSize:calculateResponsiveFontSize(8)}]}>
                 Select Explore method 
                 </Text>
                 <TouchableOpacity
                 style={{
                  marginTop:10,
                  borderWidth:3,
                  borderColor:'#23CCA2',
                  backgroundColor:'transparent',
                  padding:15,
                  justifyContent:'center',
                  alignItems:'center'
                 }}
onPress={ handleImagePicker} >
                 <Image
                  source={require('../images/uploadImage.png')}
                  bg="transparent"
               
                />
                 </TouchableOpacity>

                 <TouchableOpacity
                 style={{
                  marginTop:10,
                  borderWidth:3,
                  borderColor:'#23CCA2',
                  backgroundColor:'transparent',
                  padding:15,
                  justifyContent:'center',
                  alignItems:'center'
                 }}
 >
                 <Image
                  source={require('../images/connectDrone.png')}
                  bg="transparent"
               
                />
                 </TouchableOpacity>
               </View>
             </View>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
       
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabIconContainer}>
             <Avatar
                  source={require('../images/miracle.jpg')}
                  resizeMode="contain"
                  style={[styles.tabIcon]}
                />
                <Text
                  fontSize="sm"
                  fontWeight="400"
                  color={focused ? '#159575' : '#242424'}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        >
          {
            ()=><Profile logout={logout} />
          }
        </Tab.Screen>
      </Tab.Navigator>

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    padding: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: 'rgba(217, 217, 217, 0.1)',
    borderTopColor: 'transparent',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    paddingTop: 3,
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabIconContainer: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 32,
    height: 32,
  },
  addButtonOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonInner: {
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    padding: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(35, 204, 162, 0.1)',
  },
  modalContent: {
    backgroundColor: '#E3FFF8',
    padding: 20,
    borderRadius: 20,
    width:'90%'
  },
  modalText: {
    marginBottom: 10,
    fontWeight:"800",
    color:'#000'
  },
});

export default BottomStack;
