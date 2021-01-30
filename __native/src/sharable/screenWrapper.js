
import React from 'react';
import { View , Text , Button , SafeAreaView } from 'react-native';
import { styles } from '../app_styles';
import SecularText from '../fonts/secular';

const ScreenWrapper = ( { children } ) => {
    return (
      <SafeAreaView style={ styles.container }>
          <View style={ { flex: 0 , width: '100%' , padding: 20 , alignItems: 'center' , ...styles.app_color } }>
                <SecularText style={ { fontSize: 23 } }>
                  Notifyme
                </SecularText>
          </View>
          <View style={
             { flex: 1 , width: '100%' , alignItems: 'center' , justifyContent: 'center', padding: 15 , ...styles.app_color } }>
                { children }
          </View>
      </SafeAreaView>
    )
}

export default ScreenWrapper;
