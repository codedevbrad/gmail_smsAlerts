
import React from 'react';
import { Text , Button } from 'react-native';
import ScreenWrapper from '../../sharable/screenWrapper';

import navigateToReset from '../../sharable/navigateReset';

function DashboardScreen ( { navigation } ) {
    return (
      <ScreenWrapper>
        <Text> Dashboard Screen </Text>
        <Button title="logout" onPress={() => navigateToReset( navigation , 'Home' ) } />
      </ScreenWrapper>
    )
}

export default DashboardScreen;
