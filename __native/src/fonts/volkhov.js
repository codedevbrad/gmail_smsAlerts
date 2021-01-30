import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Volkhov_400Regular
} from '@expo-google-fonts/volkhov';

const CustomFont = ( { children , style } ) => {
  let [fontsLoaded] = useFonts({
    Volkhov_400Regular
  });

  let fontSize = 24;
  let paddingVertical = 6;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            ...style ,
            fontFamily: 'Volkhov_400Regular',
          }}>
          { children }
        </Text>
      </View>
    );
  }
};

export default CustomFont;
