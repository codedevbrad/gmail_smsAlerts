import React from 'react';
import { Text , View , LogBox } from 'react-native';
import { useFonts, SecularOne_400Regular } from '@expo-google-fonts/secular-one';

const SecularText = ( { children , style } ) => {
    let [fontsLoaded] = useFonts({
      SecularOne_400Regular,
    });

    if (!fontsLoaded) {
      return <Text> </Text>
    } else {
      return (
          <View style={{ flex: 0 , justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  // Note the quoting of the value for `fontFamily` here; it expects a string!
                  fontFamily: 'SecularOne_400Regular',
                  ...style
                }}>
                  { children }
              </Text>
          </View>
      );
    }
};

export default SecularText;
