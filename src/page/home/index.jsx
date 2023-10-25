import { View, Text,  StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native'
import React from 'react'
import calculateResponsiveFontSize from '../../utils/font'
import { useTheme, HStack , Image, Stack, Button, Center, Box, VStack, Skeleton} from 'native-base';
import { useGetAllIdentfyImageQuery } from '../../redux/api';

const Home = () => {
  const { colors } = useTheme();
   const { data, isLoading, error, isError,  isSuccess} =   useGetAllIdentfyImageQuery()

   const renderItem = ({ item , index}) => (
    <Stack key={item?.id}
    style={index % 2 === 0 ? styles.itemContainer : styles.itemContainerOdd}
    borderRadius="2" h={calculateResponsiveFontSize(90)} p="3" bg={colors.brand.bg5} >
    <Image
            w="100%"
            h="60%"
            source={ item?.analysed_image ?   {
              uri:  item?.analysed_image 
            }: require('../../images/map.jpeg')}
              alt="Alternate Text"
            />
        
            <Stack pt="2">
            <Text  fontSize={calculateResponsiveFontSize(2)} style={styles.heading}>Object to analyze: 
              {/* <Text  style={{fontWeight:'400'}}> car, Building</Text> */}
    
              </Text>
              <Text  fontSize={calculateResponsiveFontSize(2)} style={styles.heading}>Date & Time:{
                " "
              } 

              <Text  style={{fontWeight:'400', fontSize:calculateResponsiveFontSize(4)}}>
              {
             new Date(item?.creation_date).toLocaleDateString()
              }  {" "}
                {
             new Date(item?.creation_date).toLocaleTimeString()
              }</Text>
    
              </Text>
            </Stack>
    </Stack>
  );
  
  return (
    <View style={{flex:1, backgroundColor: colors.brand.bg5}}>
        <StatusBar backgroundColor={colors.brand.bg5} barStyle="dark-content" />
      <Stack mt="10" mb="10">
      <HStack space="3" mx="5" mb='5' lignItems="center">
      <TouchableOpacity>
    <Image
          source={require('../../images/back.png')}
          alt="Alternate Text"
        />
    </TouchableOpacity>
    <Text style={[styles.textHead, { fontSize: calculateResponsiveFontSize(5) }]}>Aerial Data</Text>

      </HStack>

{
  isLoading ? (
    <Center w="100%">
      <VStack mt="10" w="90%"  overflow="hidden" rounded="md" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }}>
        <Skeleton h="40" />

      </VStack>
    </Center>
  ):
  isSuccess && data && data?.length >0 ?(
   <>
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    numColumns={2} 
    style={{
      paddingHorizontal:10,
      marginBottom:calculateResponsiveFontSize(30)
    }}
  />
   </>
  ):(
   <Center justifyContent="center" h="100%" alignItems="center">
 <Box
  maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _light={{
      backgroundColor: "gray.50"
    }}>
    
        <Stack p="4" space={3}>
          
          <Text fontWeight="bold"  style={{ letterSpacing: 1, lineHeight: 24, color:'#000' }}>
          Welcome to our image analysis feature! You can now upload images and have them analyzed to gain insights. To get started, simply select an image from your phone's gallery using the provided 'Select Image' button. Our system will then process the image and provide you with valuable information. It's a great way to learn more about the content of your images and discover hidden details. Try it out and explore the power of image analysis!
          </Text>
     
        </Stack>
      </Box>
   </Center>
  )
}

</Stack>

    </View>
  )
}

export default Home



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


    itemContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderWidth: 1,
      
    },
    itemContainerOdd: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderWidth: 1,
    
    },
    heading:{
      color:"#000",
      fontWeight:'700'
    },
    textHead: {
      color:"#000",
      fontWeight:"500"
      },
  });