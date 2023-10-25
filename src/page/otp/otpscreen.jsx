import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, StatusBar } from 'react-native';
import calculateResponsiveFontSize from '../../utils/font';
import { Button, Stack, useTheme } from 'native-base';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const OtpScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation()

  const handleLogin = () => {
    // Perform login functionality with email and password
    if (email === '') {
      setEmailError('Please enter your email');
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Please enter your password');
    } else {
      setPasswordError('');
    }

    if (email !== '' && password !== '') {
      console.log('Login');
      // Additional login logic here...
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { colors } = useTheme();
  
  // Access the color from the theme
  const bgColor = colors.brand.bg;
  const bgColor2 = colors.brand.bg2;
  const bgColor4 = colors.brand.bg4;

  return (
    <ImageBackground source={require('../../images/blurbg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
<Stack mt="10">
    <TouchableOpacity>
    <Image
          source={require('../../images/back.png')}
          alt="Alternate Text"
        />
    </TouchableOpacity>
</Stack>
        <Text style={[styles.title, {fontSize:calculateResponsiveFontSize(11), color:bgColor2, 
paddingTop:calculateResponsiveFontSize(8)
        
        }]}>AERIAL DATA</Text>
        <Text style={[ {fontSize:calculateResponsiveFontSize(10), color:bgColor4, fontWeight:'500', marginBottom:1}]}>Check your Email!  To input your OTP.</Text>
  <Text style={styles.textContent}>We have sent an OTP code to your email. </Text>
       
       <Stack mb="8">
        <Text style={styles.inputText}>OTP</Text>
       <TextInput
          style={styles.input}
          placeholder="******"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
       </Stack>
        {emailError !== '' && <Text style={styles.error}>{emailError}</Text>}

<Stack justifyContent="center" mt="10" alignItems="center" w="100%">
  <ButtonComponent width="80%" text="Confirm OTP" onClick={()=>{
    navigation.navigate('CreatePassword')
  }} />
   </Stack>
   <Stack mt="10"  alignItems="center">
   
<Button bg="transparent"> 
<Text style={[styles.signupText, {fontSize:calculateResponsiveFontSize(5), color:"#000"}]}>Resend OTP</Text>

</Button>
   </Stack>
  
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',

  },
inputText:{
fontSize:20,
fontWeight:'500',
color:"#000",
paddingLeft:4,
paddingBottom:5
},
  textContent:{
    fontWeight:'500',
    // lineHeight:18,
    color:"#444444",
    marginBottom:40
  },

  head:{
fontWeight:'600',
lineHeight:20,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth:1,
    borderColor:'#000',
    width:'100%'
  },
  
  loginButton: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  
  signupText:{

fontWeight:'500',
textDecorationLine:'underline'
}
});

export default OtpScreen;
