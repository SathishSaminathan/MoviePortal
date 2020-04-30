import React from 'react';
import {View, ScrollView} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
  ShineOverlay,
} from 'rn-placeholder';

import TextComponent from '../Shared/TextComponent';
import ImageComponent from '../Shared/ImageComponent';
import {Colors} from '../../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../../helpers/styleHelper';
import {FontType} from '../../constants/AppConstants';

const SkeletonMovie = ({videos, title, navigation}) => (
  <View style={{height: heightPerc(35), marginBottom: 20}}>
    <View style={{width: widthPerc(30), paddingLeft: 5}}>
      <Placeholder
        // Animation={Shine}
        style={{
          borderRadius: 0,
          backgroundColor: Colors.transparent,
          paddingLeft: 5
        }}>
        <PlaceholderLine color={Colors.themeBlack1} width={100} />
      </Placeholder>
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        paddingTop: 0,
        paddingLeft: 0,
      }}>
      {Array(2)
        .fill('')
        .map((video, i) => (
          <View
            key={i}
            style={{
              width: widthPerc(47),
              marginTop: 0,
              marginHorizontal: widthPerc(1),
              backgroundColor: Colors.themeBlack,
              borderRadius: 5,
              elevation: 8,
              overflow: 'hidden',
              height: '100%',
            }}>
            <View key={i} style={{flex: 1}}>
              <View style={{flex: 8}}>
                <View style={{flex: 1, padding: 5}}>
                  <Placeholder
                    // Animation={Shine}
                    style={{
                      borderRadius: 0,
                      height: '100%',
                      overflow: 'hidden',
                    }}>
                    <PlaceholderLine
                      color={Colors.themeBlack1}
                      width={100}
                      height={heightPerc(35)}
                      style={{borderRadius: 5}}
                    />
                  </Placeholder>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Placeholder
                  // Animation={Shine}
                  style={{
                    borderRadius: 0,
                    height: '100%',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  <PlaceholderLine
                    color={Colors.themeBlack1}
                    width={70}
                    //   height={heightPerc(35)}
                    style={{borderRadius: 3}}
                  />
                </Placeholder>
              </View>
            </View>
          </View>
        ))}
    </View>
  </View>
);

export default SkeletonMovie;
