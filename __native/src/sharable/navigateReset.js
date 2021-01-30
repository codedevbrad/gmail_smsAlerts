
import { CommonActions } from '@react-navigation/native';

export default navigateToReset = ( nav , screen ) => {
    nav.dispatch(
      CommonActions.reset({ index: 1 , routes: [
          { name: screen }
        ],
      })
    )
}
