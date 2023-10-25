import { View, Text,  StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import calculateResponsiveFontSize from '../../utils/font'
import { useTheme, HStack , Image, Stack, Button, Skeleton} from 'native-base';
import { useNavigation } from '@react-navigation/native';


import ButtonComponent from '../../component/ButtonComponent';
import { useGetUserQuery } from '../../redux/api';

const Profile = ({logout}) => {
  const { colors } = useTheme();
  const navigation = useNavigation()
 const {data, isLoading, isError, error, isSuccess}= useGetUserQuery()
  //  console.log(data, "dataatatat")
  return (
    <View style={{flex:1, backgroundColor: colors.brand.bg5}}>
        <StatusBar backgroundColor={colors.brand.bg5} barStyle="dark-content" />
      <Stack mt="10" mx="5" mb="10">
      <HStack space="3" alignItems="center">
      <TouchableOpacity>
    <Image
          source={require('../../images/back.png')}
          alt="Alternate Text"
        />
    </TouchableOpacity>
    <Text style={[styles.textHead, { fontSize: calculateResponsiveFontSize(5) }]}>Aerial Data</Text>

      </HStack>

</Stack>
<HStack borderRadius="2"  p="2" space="3" h={calculateResponsiveFontSize(50)} w="100%" mx="5" bg={colors.brand.bg5} style={styles.shadow}>
<Image
borderRadius={5}
        w="30%"
        h="98%"
        source={require('../../images/map.jpeg')}
          alt="Alternate Text"
        />
<Stack w="68%" >

       <HStack mb="1">
       <Text  fontWeight="400" fontSize={calculateResponsiveFontSize(1)} style={styles.heading2}>Full Name: </Text>
       {
        isLoading &&<Skeleton.Text px="4" />

       }
       {
        isSuccess && 
        <Text fontWeight="800"   fontSize={calculateResponsiveFontSize(1)} style={styles.heading}>{data?.data?.name}</Text>

       }
        
       </HStack>
       <HStack aliggnItems="center" flexWrap="wrap">
       <Text  fontWeight="400" fontSize={calculateResponsiveFontSize(1)} style={styles.heading2}>Email: </Text>
  

{
  isSuccess && 
  <Text fontWeight="800"    fontSize={calculateResponsiveFontSize(1)} style={styles.heading}>{data?.data?.email} </Text>

}
       </HStack>
       <Stack  mt="3" >
       <Button bg={colors.brand.bg4}
       onPress={()=>{
        navigation.navigate('Editprofile')
      }}
       _hover={{
        backgroundColor: colors.brand.bg4
       }}
       px="4" py="2" w="60%">
    <Text style={[{fontSize:calculateResponsiveFontSize(7), color:"#fff", fontWeight:'500'}]}>Edit Details</Text>
  </Button>
   </Stack>
        </Stack>
      
</HStack>
<HStack mx="5" mt="5" space="4">
<Stack justifyContent="center" alignItems="center" h="100" style={styles.shadow} w="40%" bg={colors.brand.bg}>
 <Text style={{
  fontSize:calculateResponsiveFontSize(8),
  fontWeight:'500',
  color:'#000'
 }}>60</Text>
 <Text style={{
  fontSize:calculateResponsiveFontSize(5),
  fontWeight:'400',
  color:'#000'
 }}>Uploaded Image</Text>

</Stack>
<Stack justifyContent="center" alignItems="center" h="100" style={styles.shadow} w="40%" bg={colors.brand.bg}>
<Text style={{
  fontSize:calculateResponsiveFontSize(8),
  fontWeight:'500',
  color:'#000'
 }}>60</Text>
 <Text style={{
  fontSize:calculateResponsiveFontSize(5),
  fontWeight:'400',
  color:'#000'
 }}>Analyzed Object </Text>
</Stack>
</HStack>

<Stack mx="5" space="5" mt={calculateResponsiveFontSize(20)}>
<TouchableOpacity onPress={()=>{
  navigation.navigate('ChangePassword')
}}>
<HStack space="3" alignItems='center'>
  <Image
          source={require('../../images/changepassword.png')}
          alt="Alternate Text"
        />
    <Text style={{
      fontSize:calculateResponsiveFontSize(6),
      color:'#000',
      fontWeight:'500'

    }}>Change Password</Text>
  </HStack>
</TouchableOpacity>
<TouchableOpacity>
<HStack space="3" alignItems='center'>
  <Image
          source={require('../../images/contactus.png')}
          alt="Alternate Text"
        />
    <Text style={{
      fontSize:calculateResponsiveFontSize(6),
      color:'#000',
      fontWeight:'500'

    }}>Contact Us</Text>
  </HStack>
</TouchableOpacity>
<TouchableOpacity onPress={logout}>
<HStack space="3" alignItems='center'>
  <Image
          source={require('../../images/logout.png')}
          alt="Alternate Text"
        />
    <Text style={{
      fontSize:calculateResponsiveFontSize(6),
      color:'#000',
      fontWeight:'500'

    }}>LogOut</Text>
  </HStack>
</TouchableOpacity>
</Stack>
    </View>
  )
}

export default Profile



const styles = StyleSheet.create({
    text: {
      marginVertical: 20,
    },
    shadow:{
      shadowColor: "#000000",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.15,
shadowRadius: 1.00,
elevation: 1
    },
    heading:{
      color:"#000",
    fontWeight:'700'
    },
    heading2:{
      color:"#000",
    fontWeight:'400'
    },
    textHead: {
      color:"#000",
      fontWeight:"500"
      },
  });