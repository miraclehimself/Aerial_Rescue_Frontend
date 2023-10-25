import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { extendTheme, NativeBaseProvider } from "native-base";
import Snap from '../page/snap/Snap';
import SnapDetail from '../page/snapDetail/snapDetail';
import SnapTip from '../page/snapTip/snapTip';
import LoginScreen from '../page/login/Login';
import RegisterScreen from '../page/register/Register';
import ForgotScreen from '../page/forgotpassword/forgotpassword';
import OtpScreen from '../page/otp/otpscreen';
import CreateNewPasswordScreen from '../page/createnewpassword/createnewpassword';
import BottomStack from './bottomStack';
import EditProfile from '../page/editProfile/editProfile';
import ChangePassword from '../page/changePassword/changePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../component/Loading';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();
const newColorTheme = {
  brand: {
    bg: "#D3F5EC",
    bg2:'#159575',
    bg3:'#D3F5EC',
    bg4:'#23CCA2',
    bg5:'#E3FFF8',
    bg6:' rgba(35, 204, 162, 0.1)'
  },
};
const theme = extendTheme({ colors: newColorTheme });

function StackNav() {
  const [isLoading, setIsLoading] = useState(true);
const [hasToken, setHasToken] = useState(false);

useEffect(() => {
  checkToken();
}, []);

const checkToken = async () => {
  const token = await AsyncStorage.getItem('token');
  setHasToken(!!token); // Convert the token value to a boolean
  setIsLoading(false);
};
const logout = async() => {
  try {
  const token = await AsyncStorage.removeItem('token');
  setHasToken(false);
    
  } catch (error) {
    
  }

};
const logInFunc =()=>{
  setHasToken(true)
}


  if (isLoading) {
    // You can show a loading spinner while checking for the token
    return <Loading/>
  }
  return (
 <>
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
        {hasToken ? (
            <>
              {/* User has a token, redirect to HomeStack */}
              <Stack.Screen name="HomeStack" options={{ headerShown: false }}  >
                {()=> <BottomStack logout={logout} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              {/* No token found, redirect to Login */}
              <Stack.Screen name="Login" options={{ headerShown: false }}  >
              {() => <LoginScreen logInFunc={logInFunc} />}
              </Stack.Screen>
              <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePassword} />
              <Stack.Screen name="CreatePassword" options={{ headerShown: false }} component={CreateNewPasswordScreen} />
              <Stack.Screen name="Otp" options={{ headerShown: false }} component={OtpScreen} />
              <Stack.Screen name="Forgot" options={{ headerShown: false }} component={ForgotScreen} />
              <Stack.Screen name="Register" options={{ headerShown: false }}  >
              {() => <RegisterScreen logInFunc={logInFunc} />}
              </Stack.Screen>
            </>
          )}
       
        <Stack.Screen name="Editprofile" options={{
            headerShown:false
          }}  >
            {
              ()=> <EditProfile logout={logout} />
            }
          </Stack.Screen>
       
       
        <Stack.Screen name="SnapTip" options={{
            headerShown:false
          }} component={SnapTip} />
      
    
        <Stack.Screen name="SnapDetail" options={{
            headerShown:false
          }} component={SnapDetail} />
        <Stack.Screen name="Snap" options={{
            headerShown:false
          }} component={Snap} />
        
        
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    <Toast />

 </>
  );
}

export default StackNav;
