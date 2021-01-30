
import * as Google from 'expo-google-app-auth';
import { authTokens } from '../../../../env';
console.ignoredYellowBox = ['Warning:'];

async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        iosClientId: authTokens.iosID ,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return {
          type: 'success' ,
          body: result
        }
      } else {
        return {
           type: 'cancelled' ,
           body: null
        }
      }
    } catch (e) {
        throw e;
    }
}

export default signInWithGoogleAsync;
