import React from 'react';
import {View, ScrollView} from 'react-native';
import Ripple from 'react-native-material-ripple';
import firestore from '@react-native-firebase/firestore';

import TextComponent from '../Shared/TextComponent';
import ImageComponent from '../Shared/ImageComponent';
import {Colors} from '../../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../../helpers/styleHelper';
import {FontType} from '../../constants/AppConstants';

const ref = firestore().collection('movielist');

const MovieComponent = ({videos, title, navigation}) => {
  const handleClick = (Value, Views, Link, Image) => {
    ref
      .doc(Value)
      .update({
        // Views: Views + 1,
        Views,
      })
      .then((res) => {
        navigation.navigate('MovieDetails', {Link, Name: Value, Image});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    videos.length !== 0 && (
      <View style={{marginBottom: 20}}>
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
            // padding: 8,
            paddingVertical: 8,
            paddingLeft: 10,
            justifyContent: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {videos &&
            videos.map((video, i) => (
              <Ripple
                key={i}
                onPress={() =>
                  handleClick(
                    video.Name,
                    video.Views || 0,
                    video.Link,
                    video.Image,
                  )
                }
                style={{
                  width: widthPerc(47),
                  backgroundColor: Colors.white,
                  marginRight: 10,
                  backgroundColor: Colors.white,
                  borderRadius: 5,
                  elevation: 5,
                  overflow: 'hidden',
                  height: heightPerc(35),
                }}>
                <View key={i} style={{flex: 1}}>
                  <View style={{flex: 8}}>
                    <View style={{flex: 1}}>
                      <ImageComponent source={{uri: video.Image}} />
                    </View>
                  </View>
                  {/* <View
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
                    {video.Name}
                  </TextComponent>
                </View> */}
                </View>
              </Ripple>
            ))}
        </ScrollView>
      </View>
    )
  );
};

export default MovieComponent;
