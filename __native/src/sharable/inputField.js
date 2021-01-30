import Rea1ct from 'react';
import { Text , TextInput , View } from 'react-native';

const InputValidation = ( { placeholder , state } ) => {

   const shadow = {
      shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6
   }

   let [ state , updateState ] = state;

    return (
      <View style={{ width: '100%' , flex: 0 , justifyContent: 'center' , ...shadow }}>
          <View style={ { flex: 0 } }>
              <Text> { placeholder } </Text>
          <View style={ { flex: 1 } }>
                <TextInput onChangeText={ ( text ) => updateState( text ) } value={ state } />
          </View>
      </View>
    )
}
