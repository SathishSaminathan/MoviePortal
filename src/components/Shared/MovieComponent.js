import React from 'react';
import {StyleSheet, StatusBar, View, ScrollView} from 'react-native';
import Ripple from 'react-native-material-ripple';

import TextComponent from '../Shared/TextComponent';
import ImageComponent from '../Shared/ImageComponent';
import {Colors} from '../../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../../helpers/styleHelper';
import {FontType} from '../../constants/AppConstants';

const MovieComponent = ({videos, title}) => (
  <View style={{height: heightPerc(35)}}>
    <TextComponent
      type={FontType.BOLD}
      numberOfLines={2}
      style={{color: Colors.yellow, fontSize: 20, paddingLeft: 10}}>
      {title}
    </TextComponent>
    <ScrollView
      //   pagingEnabled
      contentContainerStyle={{
        flexDirection: 'row',
        // width: '100%',
        padding: 10,
        paddingLeft: 0,
        justifyContent: 'center',
      }}
      showsHorizontalScrollIndicator={false}
      horizontal>
      {videos.map((video, i) => (
        <Ripple
          key={i}
          style={{
            width: widthPerc(47),
            backgroundColor: Colors.white,
            marginHorizontal: widthPerc(1),
            backgroundColor: Colors.darkGrey,
            borderRadius: 5,
            elevation: 8,
            overflow: 'hidden',
            height: '100%',
          }}>
          <View key={i} style={{flex: 1}}>
            <View style={{flex: 8}}>
              <View style={{flex: 1}}>
                <ImageComponent source={{uri: video.movieImage}} />
              </View>
            </View>
            <View
              style={{
                flex: 2,
                padding: 5,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <TextComponent
                type={FontType.BOLD}
                numberOfLines={2}
                style={{color: Colors.yellow, fontSize: 15}}>
                {video.movieName}
              </TextComponent>
            </View>
          </View>
        </Ripple>
      ))}
    </ScrollView>
  </View>
);

export default MovieComponent;
