import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, StatusBar } from 'react-native';
import calculateResponsiveFontSize from '../../utils/font';
import { Button, Spinner, Stack, useTheme } from 'native-base';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { useLoginAccountMutation } from '../../redux/api';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({logInFunc}) => {

  const [showPassword, setShowPassword] = useState(false);
 const [ loginAccount, {isLoading}]= useLoginAccountMutation()

 const navigation = useNavigation()


 const [formValues, setFormValues] = useState({
  email: '',
  password: '',
  errors: {
    email: '',
    password: '',
  },
});


const handleChange = (field, value) => {
  setFormValues({
    ...formValues,
    [field]: value,
    errors: {
      ...formValues.errors,
      [field]: '', // Clear the error message for this field
    },
  });
};
const handleSubmit = async() => {
  const { name, email, password } = formValues;
  const errors = {};


  if (email === '') {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (password === '') {
    errors.password = 'Password is required';
  }

  setFormValues({
    ...formValues,
    errors,
  });

  // Check if there are no errors before proceeding with form submission
  if (Object.keys(errors).length === 0) {
    const d = {
      email: formValues.email,
      password: formValues.password,
    };

    try {
 
      const data = await loginAccount(d).unwrap();
      // Handle the response data accordingly (e.g., redirect to the home stack)
      const {token} =data
      // console.log(token , "token")
      if(token){
        await AsyncStorage.setItem('token', token);
      logInFunc()

      }
    } catch (error) {
      // Handle any registration error
 
      if(error){
        Toast.show({
          type: 'error',
          text1: '',
          text2: error?.error ??''
        });
      }
    }
  }
};

const isValidEmail = (email) => {
  const emailPattern = /\S+@\S+\.\S+/;
  return emailPattern.test(email);
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

        <Text style={[styles.title, {fontSize:calculateResponsiveFontSize(11), color:bgColor2, 
paddingTop:calculateResponsiveFontSize(25)
        
        }]}>AERIAL DATA</Text>
        <Text style={[ {fontSize:calculateResponsiveFontSize(8), color:bgColor4, fontWeight:'500', marginBottom:1}]}>Login Your Account</Text>
  {/* <Text style={styles.textContent}>quis cras tellus nibh egestas mauris venenatis nibh. </Text> */}
       
       <Stack mb="8">
        <Text style={styles.inputText}>E-mail</Text>
       <TextInput
          style={styles.input}
          placeholder="Email"
          value={formValues.email}
          onChangeText={(value) => handleChange('email', value)}
        />
       </Stack>
       {formValues.errors.email !== '' && <Text style={styles.error}>{formValues.errors.email}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={formValues.password}
            onChangeText={(value) => handleChange('password', value)}
          />

          <TouchableOpacity style={styles.eyeIconContainer} onPress={togglePasswordVisibility}>
            <Image source={showPassword ? require('../../images/eye.png') : require('../../images/eye.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
        {formValues.errors.password !== ''  && <Text style={styles.error}>{formValues.errors.password }</Text>}

<TouchableOpacity style={styles.forgot}  
onPress={()=>{
  navigation.navigate('Forgot')
}}
>
    <Text style={styles.forgotText}>Forget password?</Text>
</TouchableOpacity>
<Stack justifyContent="center" mt="10" alignItems="center" w="100%">
<Button bg={colors.brand.bg2} _hover={{
      backgroundColor: colors.brand.bg2
    }} px="4" py={4} w="80%" onPress={handleSubmit}>
      {
        isLoading ?   <Spinner accessibilityLabel="Loading posts" 
        color={colors.brand.bg3}

        /> :
    <Text style={[{fontSize:calculateResponsiveFontSize(7), color:colors.brand.bg3, fontWeight:'500'}]}>Login</Text>

      }
  </Button>
   </Stack>
   <Stack mt="10"  alignItems="center">
    <Text style={[styles.textSignup, {fontSize:calculateResponsiveFontSize(5)}]}>you don't have an account?
</Text>
<TouchableOpacity
onPress={()=>{
  navigation.navigate('Register')
}}> 
<Text style={[styles.signupText, {fontSize:calculateResponsiveFontSize(5), color:bgColor2}]}>Sign Up</Text>

</TouchableOpacity>
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

  textSignup:{
    fontWeight:'500',
    // lineHeight:18,
    color:"#444444",

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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
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
  forgot:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    marginTop:1,
    marginBottom:10
  },
  forgotText:{
    color:'#920000',
    fontWeight:"500",
    lineHeight:20,
    fontSize:16
  },
  signupText:{

fontWeight:'500'

}
});

export default LoginScreen;
