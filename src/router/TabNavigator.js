import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconComponent from '../components/Shared/IconComponent';
import {IconType} from '../constants/AppConstants';
import Home from '../screens/Home';
import SearchGif from '../screens/SearchGif';
import TabBarButton from './TabBarButton';
import VideoPage from '../screens/VideoPage';
import MovieDetails from '../screens/MovieDetails';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MovieDetails"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return (
            <IconComponent
              type={IconType.Ionicons}
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBar={(props) => <TabBarButton {...props} />}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="VideoPage"
        // options={{
        //   cardStyleInterpolator:
        //     CardStyleInterpolators.forScaleFromCenterAndroid,
        // }}
        options={{
          tabBarVisible: false,
        }}
        component={VideoPage}
      />
      <Tab.Screen
        name="MovieDetails"
        // options={{
        //   cardStyleInterpolator:
        //     CardStyleInterpolators.forScaleFromCenterAndroid,
        // }}
        options={{
          tabBarVisible: false,
        }}
        component={MovieDetails}
      />
      <Tab.Screen name="Gifs" component={SearchGif} />
    </Tab.Navigator>
  );
}

export {TabNavigator};
