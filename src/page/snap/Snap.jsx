import { View, Text , StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import { useTheme, HStack , Image, Stack, Button, Spinner} from 'native-base';
import calculateResponsiveFontSize from '../../utils/font';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadDocumentMutation } from '../../redux/api';
import Toast from 'react-native-toast-message';
import { clearImage } from '../../redux/imageSlice';

const Snap = () => {
    const { colors } = useTheme();
    const navigation = useNavigation()
   const [identifyImage, setidentifyImage] = React.useState("Vegetation")
  // Access the color from the theme
  const bgColor = colors.brand.bg;
  const bgColor2 = colors.brand.bg2;
  const bgColor3 = colors.brand.bg3;
const dispatch = useDispatch()
  const selectedImage = useSelector((state) => state.image?.selectedImage);
  const [uploadDocument,{isLoading}] =  useUploadDocumentMutation()

// console.log(selectedImage, "image")
const sendImage = async()=>{

  const formData = new FormData();
  formData.append('inputted_image', {
    uri:selectedImage,
    type: 'image/jpeg', // Change the type if needed
    name: 'image.jpg',
  });
  formData.append('identify_object', identifyImage)
// console.log(selectedImage[0]?.uri)
  // navigation.navigate('SnapDetail')
  try {

 
    const data = await uploadDocument(formData).unwrap();
    // Handle the response data accordingly (e.g., redirect to the home stack)
if(data?.status ==="success"){
  Toast.show({
    type: 'success',
    text1: '',
    text2: data?.message
  });
  dispatch(clearImage());
  navigation.goBack()
}
else{
  Toast.show({
    type: 'error',
    text1: '',
    text2: "something went wrong"
  });
}

   
  } catch (error) {
    // Handle any registration error
    console.log(error, "error")
    if(error){
      Toast.show({
        type: 'error',
        text1: '',
        text2: "something went wrong or unable to identify the image"
      });
    }
  }



}
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
      <HStack mb="3" space="3" alignItems="center" justifyContent="space-between" style={styles.header}>
      <HStack space="3" alignItems="center">
    <TouchableOpacity onPress={()=>{
      navigation.navigate('Explore')
    }}>
    <Image
          source={require('../../images/back.png')}
          alt="Alternate Text"
        />
    </TouchableOpacity>
        <Text style={[styles.text, { fontSize: calculateResponsiveFontSize(8) }]}>Aerial Data</Text>
      </HStack>
   
   
      </HStack>
      <View style={styles.content}>
      {selectedImage && <Image  alt="image"  style={styles.image} source={{ uri: selectedImage }}  />}
     
        
         <Image
          source={require('../../images/cancel.png')}
          alt="map"
          style={styles.imageCancel}
        />
      </View>
      <View style={styles.bottomContainer}>
   <Text style={[styles.head, {fontSize:calculateResponsiveFontSize(9)}]}> Select Object to analyze</Text>
   {/* <HStack flexWrap="wrap" my="4" space="2">
   <Button bg={identifyImage==="Vegetation" ? bgColor2:"#fff"} px="4" my="1" onClick={()=>{
    setidentifyImage("Vegetation")
   }}>
  <Text style={[{fontSize:calculateResponsiveFontSize(5), color:bgColor3}]}>Vegetation</Text>
</Button>

<Button bg={identifyImage==="A" ? bgColor2:"#fff"} px="4"  my="1"
onClick={()=>{
  setidentifyImage("B")
 }}
>
  <Text style={[{fontSize:calculateResponsiveFontSize(5), color:"#000"}]}>Default Small</Text>
</Button>
<Button bg={identifyImage==="B" ? bgColor2:"#fff"} px="4"  my="1">
  <Text style={[{fontSize:calculateResponsiveFontSize(5), color:"#000"}]}>Default Small</Text>
</Button>
<Button bg={identifyImage==="C" ? bgColor2:"#fff"} px="4" my="1"
onClick={()=>{
  setidentifyImage("C")
 }}
>
  <Text style={[{fontSize:calculateResponsiveFontSize(5), color:"#000"}]}>Default Small</Text>
</Button>
   </HStack> */}
   <Stack justifyContent="center" mt="10" alignItems="center" w="100%">
<Button  bg={colors.brand.bg2} _hover={{
      backgroundColor: colors.brand.bg2
    }} px="4" py={4} w="80%" onPress={sendImage}>
      {
        isLoading ?   <Spinner accessibilityLabel="Loading posts" 
        color={colors.brand.bg3}

        /> :
    <Text style={[{fontSize:calculateResponsiveFontSize(7), color:colors.brand.bg3, fontWeight:'500'}]}>Analyze</Text>

      }
  </Button>
   </Stack>
      </View>
    </View>
  )
}

export default Snap


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
        backgroundColor: '#D3F5EC',
      },
      header: {
        paddingHorizontal: 10,
        paddingTop: 2,
      },
      text: {
      color:"#000",
      fontWeight:"800"
      },
      content: {
        flex: 1.3,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '80%',
        height: '90%',
        resizeMode: 'contain',
        borderRadius:20
      },
      bottomContainer: {
        flex: 1,
        paddingHorizontal: 10,
            paddingTop:20
      },
      head:{
        color:'#000',
        fontWeight:'600'
      },
      buttonText:{
        fontWeight:"400"
      },
      imageCancel:{
        position:'absolute',
        top:10,
        right:30,
        resizeMode: 'contain',

      }
   
  });