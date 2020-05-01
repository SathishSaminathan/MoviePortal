/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, Animated, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MaskedView from '@react-native-community/masked-view';

import {Colors} from './src/constants/ThemeConstants';
import {MyStack} from './src/router/StackNavigator';
import {TabNavigator} from './src/router/TabNavigator';
import IconComponent from './src/components/Shared/IconComponent';
import {IconType} from './src/constants/AppConstants';
import TextComponent from './src/components/Shared/TextComponent';
import Splash from './src/components/Shared/Splash';

// Is CN=Sathish Saminathan, OU=SKTech, O=SKTech, L=Tirupur, ST=Tamilnadu, C=IN correct?
class App extends Component {
  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false,
    splashLoaded: false,
  };

  componentDidMount() {
    Animated.timing(this.state.loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        animationDone: true,
      });
    });
    setTimeout(() => {
      this.setState({
        splashLoaded: true,
      });
    }, 1500);
  }
  render() {
    const loadingProgress = this.state.loadingProgress;
    const {splashLoaded} = this.state;

    const opacityClearToVisible = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
        // clamp means when the input is 30-100, output should stay at 1
      }),
    };

    const imageScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 0.8, 70],
          }),
        },
      ],
    };

    const appScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const fullScreenBlueLayer = this.state.animationDone ? null : (
      <View
        style={[StyleSheet.absoluteFill, {backgroundColor: Colors.themeBlack}]}
      />
    );
    const fullScreenWhiteLayer = this.state.animationDone ? null : (
      <View
        style={[StyleSheet.absoluteFill, {backgroundColor: Colors.yellow}]}
      />
    );
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.themeBlack}
          translucent
          hidden
        />

      {/* {opacityClearToVisible !== 1 ? (
          <View style={{flex: 1}}>
            {fullScreenBlueLayer}
            <MaskedView
              style={{flex: 1}}
              maskElement={
                <View style={styles.centered}>
                  <Animated.Image
                    style={[{width: 50, height: 50}, imageScale]}
                    source={require('./src/assets/twitter.png')}
                    resizeMode="cover"
                  />
                </View>
              }>
              {fullScreenWhiteLayer}
              <Animated.View
                style={[opacityClearToVisible, appScale, {flex: 1}]}>
                <TextComponent>hai</TextComponent>
              </Animated.View>
            </MaskedView>
          </View>
        ) : ( */}
        {splashLoaded ? (
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        ) : (
          <Splash />
        )}
        {/* )} */}
      </>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
