
import React , { useEffect , useState , useContext } from 'react';

import { CommonActions } from '@react-navigation/native';
import { Image , TextInput , View , Text , Button , SafeAreaView , TouchableWithoutFeedback , StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenWrapper from '../../sharable/screenWrapper';
import { AppContext } from '../../contexts/globalContext';
import { LoginAPI } from './network_requests';
import { navigateToReset } from '../../sharable/navigateReset';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

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

const link_styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
});

function LoginScreen( { navigation } ) {

    const { loginUserState }  = useContext( AppContext );
    const [result, setResult] = useState(null);

    const _handlePressButtonAsync = async () => {
       console.log('printed');
       let result = await WebBrowser.openBrowserAsync('https://gmail-application.herokuapp.com/');
       setResult(result);
    };

    const handleLogin = ( ) => {
          LoginAPI.loginWithGoogle()
              .then( userObj => {
                   loginUserState( userObj );
                   navigation.dispatch(
                    CommonActions.reset({
                      index: 1 , routes: [  { name: 'LoginDetails' }  ],
                    })
                  );
              })
              .catch( err => console.log( err ) );
    }

    return (
        <ScreenWrapper>
            <View style={ login_styles.template_image }>
                  <Image style={{ width: '100%' , height: '100%' }} source={require('../../assets/login_hello.png')} />
            </View>

            <View style={ login_styles.template_headText }>

                <View style={link_styles.container}>
                   <Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />
                   <Text> {result && JSON.stringify(result)}</Text>
                </View>

                <SecularText style={{ fontSize: 30 }}>
                    Login
                </SecularText>

                <Text style={{ paddingVertical: 20 , lineHeight: 28 }}>
                    Our app requires that you Login with your google account. We do this
                    so that we can generate the right tokens to query your gmail inbox.
                </Text>
            </View>

            <View style={ login_styles.template_progressButton }>
            <TouchableWithoutFeedback onPress={() => handleLogin()}>
                <View style={{ width: '70%' , ...styles.button   }}>
                    <Text style={ login_styles.button }>
                          Login with Google.
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            </View>
        </ScreenWrapper>
    );
}

export default LoginScreen;
