import React from 'react';
import {Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../constants/ThemeConstants';
import IconComponent from './IconComponent';
import {IconType} from '../../constants/AppConstants';
import {widthPerc} from '../../helpers/styleHelper';
import TextComponent from './TextComponent';

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

const Splash = ({params}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: Colors.themeBlack,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <AnimatedIcon
      name={'movie-outline'}
      size={widthPerc(25)}
      color={Colors.yellow}
      duration={1000}
      animation="bounceInLeft"
      //   iterationCount="infinite"
    />
    <Animatable.Text
      delay={500}
      animation="fadeIn"
      style={{
        fontFamily: 'Proxima Nova Regular',
        color: Colors.yellow,
        fontSize: widthPerc(10),
      }}>
      Movie Portal
    </Animatable.Text>
  </View>
);

export default Splash;
