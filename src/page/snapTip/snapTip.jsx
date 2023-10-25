import { View, Text , StyleSheet, StatusBar, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { useTheme, HStack , Image, Stack, Button} from 'native-base';
import calculateResponsiveFontSize from '../../utils/font';
import ButtonComponent from '../../component/ButtonComponent';
import { useNavigation } from '@react-navigation/native';

const SnapTip= () => {
    const { colors } = useTheme();
    const navigation = useNavigation()
  
  // Access the color from the theme
  const bgColor = colors.brand.bg;
  const bgColor2 = colors.brand.bg2;
  const bgColor3 = colors.brand.bg3;


  return (
    <View style={styles.container}>
    <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
    
    <HStack space="3" alignItems="center" h="20" px="5">
        <TouchableWithoutFeedback onPress={()=>{
          navigation.goBack()
        }}>
        <Image
          source={require('../../images/back.png')}
          alt="Alternate Text"
        />
        </TouchableWithoutFeedback>
        <Text style={[styles.text, { fontSize: calculateResponsiveFontSize(8) }]}>Tip</Text>
      </HStack>
  
    <View style={styles.content}>
      <HStack h="30%" mx="5" bg="#fff" style={styles.shadow} borderRadius="5"> 
        
        <Stack w="30%" h="100%" p="1">
        <Image
          source={require('../../images/map.jpeg')}
          alt="map"
          style={styles.image}
        />
        </Stack>
<Stack w="70%" justifyContent="center" alignItems="center" p="3">
<Text style={{fontSize:calculateResponsiveFontSize(5.2), color:'#242424', fontWeight:'500'}}> <Text style={{fontWeight:'800'}}>Step 1:</Text>  Get an aerial image of a good quality size and format.</Text>
</Stack>
      </HStack>
    </View>
  
    <Stack my="5" justifyContent="center" h="20" alignItems="center" style={styles.bottomButton}>
        <ButtonComponent width="80%" text="Done" onClick={()=>{
          navigation.navigate('HomeStack')
        }} />
      </Stack>
  </View>
  
  )
}

export default SnapTip


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
       flex:1
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    
      },
    
   
      headText:{
        color:'#000',
        fontWeight:'400',
      },
      buttonText:{
        fontWeight:"400"
      },
   
   shadow:{
    shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.16,
shadowRadius: 1.51,
elevation: 2
   }
  });