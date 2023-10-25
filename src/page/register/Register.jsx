import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, StatusBar } from 'react-native';
import calculateResponsiveFontSize from '../../utils/font';
import { Button, Spinner, Stack, useTheme } from 'native-base';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { useRegisterAccountMutation } from '../../redux/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const  RegisterScreen = ({logInFunc}) => {

  const [showPassword, setShowPassword] = useState(false);
 const [  registerAccount, {isLoading}]= useRegisterAccountMutation()
  const navigation = useNavigation()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    errors: {
      name: '',
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
  const handleSubmit = async () => {
    const { name, email, password } = formValues;
    const errors = {};
  
    if (name === '') {
      errors.name = 'Name is required';
    }
  
    if (email === '') {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }
  
    if (password === '') {
      errors.password = 'Password is required';
    }
  
    // Update the state with the errors object
    setFormValues({
      ...formValues,
      errors,
    });
  
    // Check if there are no errors before proceeding with form submission
    if (Object.keys(errors).length === 0) {
      const d = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      };
  
      try {
 
        const data = await registerAccount(d).unwrap();
        // Handle the response data accordingly (e.g., redirect to the home stack)
        const {token} =data
        // console.log(token , "token")
        if(token){
          await AsyncStorage.setItem('token', token);
        logInFunc()

        }
      } catch (error) {
        // Handle any registration error
        console.log(error);
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
paddingTop:calculateResponsiveFontSize(10)
        
        }]}>AERIAL DATA</Text>
        <Text style={[ {fontSize:calculateResponsiveFontSize(8), color:bgColor4, fontWeight:'500', marginBottom:1}]}>Create an account</Text>
  {/* <Text style={styles.textContent}>quis cras tellus nibh egestas mauris venenatis nibh. </Text> */}
       
  <Stack mb="5">
        <Text style={styles.inputText}>User Name</Text>
       <TextInput
          style={styles.input}
          placeholder="Name"
          value={formValues.name}
          onChangeText={(value) => handleChange('name', value)}
        />
       {formValues?.errors?.name !== ''&& <Text style={styles.error}>{formValues?.errors?.name}</Text>}

       </Stack>
       <Stack mb="5">
        <Text style={styles.inputText}>E-mail</Text>
       <TextInput
          style={styles.input}
          placeholder="Email"
          value={formValues.email}
          onChangeText={(value) => handleChange('email', value)}
        />
       {formValues?.errors?.email !== '' && <Text style={styles.error}>{formValues?.errors?.email}</Text>}

       </Stack>

     <Stack >
     <Text style={styles.inputText}>Password</Text>

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
        {formValues?.errors?.password !== '' && <Text style={styles.error}>{formValues?.errors?.password}</Text>}

     </Stack>
<Stack justifyContent="center" mt="10" alignItems="center" w="100%">
<Button bg={colors.brand.bg2} _hover={{
      backgroundColor: colors.brand.bg2
    }} px="4" py={4} w="80%" onPress={handleSubmit}>
      {
        isLoading ?   <Spinner accessibilityLabel="Loading posts" 
        color={colors.brand.bg3}

        /> :
    <Text style={[{fontSize:calculateResponsiveFontSize(7), color:colors.brand.bg3, fontWeight:'500'}]}>Register</Text>

      }
  </Button>
   </Stack>
   <Stack mt="1"  alignItems="center">
    <Text style={[styles.textSignup, {fontSize:calculateResponsiveFontSize(5)}]}>Already have an account?

</Text>
<TouchableOpacity
onPress={()=>{
  navigation.navigate('Login')
}}
_hover={{
  background:'transparent'
}}> 
<Text style={[styles.signupText, {fontSize:calculateResponsiveFontSize(5), color:bgColor2}]}>Sign in</Text>

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
    width:'100%',
    fontSize:15
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
   
  },

  signupText:{

fontWeight:'500'

}
});

export default RegisterScreen;
