import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import calculateResponsiveFontSize from '../utils/font';
import {  NativeBaseProvider, Button, Stack, HStack  } from "native-base";

const OnboardingScreen = ({ onComplete }) => {
  const handleComplete = () => {
    onComplete();
  };

  return (
   <NativeBaseProvider>
     <View style={styles.container}>
      <StatusBar backgroundColor="#D3F5EC" barStyle="dark-content" />

      <ImageBackground source={require('../images/bg.png')} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
            <View style={styles.paddingContent}>
            <Text style={[styles.title, {fontSize:calculateResponsiveFontSize(9)}]}>AERIAL DATA</Text>
          <Text style={[styles.description, {fontSize:calculateResponsiveFontSize(7)}]}>Scrolling share invite font follower reesizing boolean. Strikethrough boolean underline layer opacity rectangle font. Overflow clip ellipse ellipse bullet. Draft layout overflow ellipse group move horizontal strikethrough image. Auto.</Text>
            </View>
          
        <Stack justifyContent="center" alignItems="center" w="100%">
        <Button bg="#159575" px="4" py="4" w="90%" onPress={handleComplete}>
   <HStack justifyContent="center" alignItems="center" space="3">
   <Image
          source={require('../images/explore.png')}
          alt="map"
          
        />
   <Text style={[{fontSize:calculateResponsiveFontSize(7),color:"#D3F5EC", fontWeight:'500'}]}>Export</Text>
   </HStack>
  </Button>
        </Stack>
        </View>
      </ImageBackground>
    </View>
   </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
   
    height:'50%'
  },
  paddingContent:{
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
   
    fontWeight: 'bold',
    color: '#242424',
    marginBottom: 10,
  },
  description: {
    color: '#444444',
    marginBottom: 20,
    fontWeight:"500",
    lineHeight:20,
    textAlign:"left"
  },
  getStartedButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
