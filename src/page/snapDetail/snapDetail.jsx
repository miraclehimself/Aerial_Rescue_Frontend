import { View, Text , StyleSheet, StatusBar, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { useTheme, HStack , Image, Stack, Button} from 'native-base';
import calculateResponsiveFontSize from '../../utils/font';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const SnapDetail = () => {
    const { colors } = useTheme();
    const navigation = useNavigation()
  
  // Access the color from the theme
  const bgColor = colors.brand.bg;
  const bgColor2 = colors.brand.bg2;
  const bgColor3 = colors.brand.bg3;


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
    
      <View style={styles.content}>
       <TouchableWithoutFeedback onPress={()=>{
        navigation.navigate('Snap')
       }}>
       <Image
          source={require('../../images/map.jpeg')}
          alt="map"
          style={styles.image}
        />
       </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={styles.imageCancel}>
      <Image
          source={require('../../images/arrowBack.png')}
          alt="map"
          style={styles.imageCancel}
        />
      </TouchableWithoutFeedback>
      </View>
      <View style={styles.bottomContainer}>
   <Text style={[styles.head, {fontSize:calculateResponsiveFontSize(7)}]}> Result</Text>
<HStack justifyContent="space-between" alignItems="center">
<Text style={[styles.headText, {fontSize:calculateResponsiveFontSize(5)}]}>Building’s Discover:</Text>
<Text style={[styles.headText, {fontSize:calculateResponsiveFontSize(5)}]}>1470 Buildings</Text>

</HStack>
  <HStack justifyContent="center" mt="20%" alignItems="center" w="100%" space="1">
  <Stack  w="80%">
  <ButtonComponent width="95%" text="Save Analyze" onClick={()=>{
     navigation.navigate('SnapTip')
  }} />
   </Stack>
     <TouchableWithoutFeedback>
     <Image
          source={require('../../images/share.png')}
          alt="share"
          style={{
            resizeMode:'contain'
          }}
        />
     </TouchableWithoutFeedback>
  </HStack>

  <Stack  w="100%" mt="15%" alignItems="center"  justifyContent="center">
  <Button borderColor={bgColor2} bg={bgColor3}px="4" w="80%" borderWidth="1">
    <Text style={[{fontSize:calculateResponsiveFontSize(7), color:bgColor2, fontWeight:'500'}]}>Yes</Text>
  </Button>
   </Stack>
      </View>
    </View>
  )
}

export default SnapDetail


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight || 0,
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
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    
      },
      bottomContainer: {
        flex: 1,
        paddingHorizontal: 10,
            paddingTop:20
      },
      head:{
        color:'#000',
        fontWeight:'600',
        marginBottom:7
      },
      headText:{
        color:'#000',
        fontWeight:'400',
      },
      buttonText:{
        fontWeight:"400"
      },
      imageCancel:{
        position:'absolute',
        top:10,
        left:10,
        resizeMode: 'contain',

      }
   
  });