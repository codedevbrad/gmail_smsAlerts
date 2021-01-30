
import React , { useEffect , useState , useContext } from 'react';
import { Image , TextInput , View , Text , Button , SafeAreaView , TouchableWithoutFeedback , StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenWrapper from '../../sharable/screenWrapper';
import { AppContext } from '../../contexts/globalContext';
import { LoginAPI } from './network_requests';

import { navigateToReset } from '../../sharable/navigateReset';

import SecularText from '../../fonts/secular';

import { styles } from '../../app_styles';

const login_styles = StyleSheet.create({
      inputField: {
         width: '100%' , padding: 20 , borderRadius: 9 ,
         marginVertical: 10 , backgroundColor: 'white' ,
         shadowColor: "#9c9c",
         shadowOffset: {
          width: 0,
          height: 3,
         },
         shadowOpacity: 0.27,
         shadowRadius: 4,
         elevation: 6
      } ,
      button: {
        fontSize: 17 , color: 'white' , paddingVertical: 20 ,
     } ,
     text: {
        marginVertical: 25 , lineHeight: 28
     } ,
     template_image: {
        width: '100%'  , flex: 2
     } ,
     template_headText: {
        width: '100%' , flex: 0 , alignItems: 'center'
     } ,
     template_bodyText: {
        width: '100%' , flex: 1
     } ,
     template_progressButton: {
        width: '100%' , flex: 1 , alignItems: 'center' , justifyContent: 'center'
     } ,
     template_minimal_headText: {
        width: '100%' , flex: 1 , alignItems: 'center' , justifyContent: 'center'
     }
});

const Tab = createStackNavigator();

function Stage2( { navigation } ) {

  const { user } = useContext( AppContext );

  const [ phoneNumber , onChangePhone ]  = useState('07715 789 333');
  const [ username , setUsername ] = useState( user.user.name );

  const postUserInfo = ( ) => {
        // navigateToReset(  navigation , 'Dashboard' );
        navigation.navigate('LoginDetails' , { screen: 'Stage3' } );
  }

  return (
    <ScreenWrapper>
            <View style={ login_styles.template_minimal_headText }>
                <SecularText style={{ fontSize: 30  } }>
                  First things First.
                </SecularText>
                <Text style={ login_styles.text }>
                  We need to know a few things about you ...
                </Text>

                <TextInput
                  style={ login_styles.inputField }
                  onChangeText={ text => onChangePhone(text)}
                  value={ phoneNumber }
                />

                <TextInput
                  style={ login_styles.inputField }
                  onChangeText={ text => setUsername( text ) }
                  value={ username }
                />
                <TouchableWithoutFeedback onPress={() => postUserInfo() }>
                     <View style={{ width: '70%' , ...styles.button   }}>
                         <Text style={ login_styles.button }>
                            Save these details
                         </Text>
                     </View>
                 </TouchableWithoutFeedback>
            </View>
    </ScreenWrapper>
  );
}

function Stage3( { navigation } ) {

    const [ sender1 , updateSender1 ] = useState( 'sender1@email.com' );
    const [ sender2 , updateSender2 ] = useState( 'sender2@email.com' );
    const [ sender3 , updateSender3 ] = useState( 'sender3@email.com' );

    return (
        <ScreenWrapper>

            <View style={ login_styles.template_headText }>
                  <SecularText style={{ fontSize: 30 }}>
                      Track senders
                  </SecularText>
                  <Text style={ { marginVertical: 30 } }>
                     As a standard account User, You can add up to 3 senders to track.
                  </Text>

                <TextInput
                  style={ login_styles.inputField }
                  onChangeText={ text => updateSender1(text)}
                  value={ sender1 }
                />
                <TextInput
                  style={ login_styles.inputField }
                  onChangeText={ text => updateSender2(text)}
                  value={ sender2 }
                />
                <TouchableWithoutFeedback onPress={() => test() }>
                      <View style={{ width: '70%' , ...styles.button   }}>
                          <Text style={ login_styles.button }>
                            i'm all set.
                          </Text>
                      </View>
                </TouchableWithoutFeedback>
            </View>
        </ScreenWrapper>
    )
}

function LoginSteps ( ) {
    return (
        <Tab.Navigator screenOptions={{  headerShown: false }}>
          <Tab.Screen name="stage2" component={ Stage2 } />
          <Tab.Screen name="Stage3" component={ Stage3 } />
        </Tab.Navigator>
    );
}

export default LoginSteps;
