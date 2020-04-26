import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';

const Divider = ({style}) => (
  <View
    style={[{height: 2, backgroundColor: Colors.dividerColor}, style]}></View>
);

export default Divider;
