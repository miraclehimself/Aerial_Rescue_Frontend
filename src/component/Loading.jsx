import React from 'react';
import {View, StyleSheet, ImageBackground, StatusBar} from 'react-native';

const Loading = () => {
    return (
        <View style={{flex:1}}>
      <StatusBar backgroundColor="#159575" barStyle="dark-content" />

           <ImageBackground source={require('../images/splash.png')} style={styles.backgroundImage}></ImageBackground> 
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        
      },
})

export default Loading;
