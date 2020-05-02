import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Axios from 'axios';

import {Colors} from '../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import ImageComponent from '../components/Shared/ImageComponent';
import TextComponent from '../components/Shared/TextComponent';
import {FontType, IconType} from '../constants/AppConstants';
import Ripple from 'react-native-material-ripple';
import IconComponent from '../components/Shared/IconComponent';
import {PlaceholderLine, Placeholder} from 'rn-placeholder';
import Orientation from 'react-native-orientation-locker';

const det = {
  Title: 'Shazam',
  Year: '2017',
  Rated: 'N/A',
  Released: '19 Mar 2017',
  Runtime: '6 min',
  Genre: 'Short, Family',
  Director: 'Royston Innes',
  Writer: 'Royston Innes',
  Actors: 'Roman Dior Degeddingseze, Christopher Mychael Watson',
  Plot:
    'A father teaches his son about the harsh realities of being a black man in a new and inventive way.',
  Language: 'English',
  Country: 'USA',
  Awards: 'N/A',
  Poster:
    'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSoar8y_ZLMjpU2DUCmYy4twmLqIGwLIUr7OHvV4oGYWYt3aB0-',
  Ratings: [{Source: 'Internet Movie Database', Value: '8.2/10'}],
  Metascore: 'N/A',
  imdbRating: '8.2',
  imdbVotes: '41',
  imdbID: 'tt6723576',
  Type: 'movie',
  DVD: 'N/A',
  BoxOffice: 'N/A',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

const MovieDetails = ({navigation, route}) => {
  const {Name, Image, Link} = route.params;
  const [Detail, setDetail] = useState(null);
  const [Loading, setLoading] = useState(false);
  console.log('MovieDetails', Name);

  useEffect(() => {
    getDetails();
  }, [Name]);
  const getDetails = () => {
    // setLoading(true);
    // setDetail(null);
    Axios.get(`http://www.omdbapi.com/?t=${Name}&apikey=a851fc51`)
      .then((res) => {
        // setLoading(false);
        setDetail(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.themeBlack}}>
      <View
        style={{
          height: 60,
          backgroundColor: Colors.themeBlack,
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <Ripple
          onPress={() => navigation.goBack()}
          rippleContainerBorderRadius={25}
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
          }}>
          <IconComponent
            type={IconType.AntDesign}
            name="left"
            color={Colors.yellow}
            size={20}
          />
        </Ripple>
        <TextComponent
          type={FontType.BOLD}
          style={{color: Colors.yellow, fontSize: 20}}>
          More details
        </TextComponent>
      </View>
      <View style={{padding: 10, flex: 1}}>
        {Detail && !Loading ? (
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
            <View
              style={{
                width: '100%',
                height: heightPerc(40),
                borderRadius: 5,
                overflow: 'hidden',
              }}>
              <ImageComponent source={{uri: Image}} />
              {/* <TextComponent
            style={{
              position: 'absolute',
              fontSize: widthPerc(15),
              color: Colors.white,
              top: 5,
              left: 5,
            }}
            type={FontType.BOLD}>
            {Detail.Title}
          </TextComponent> */}
            </View>
            <TextComponent
              type={FontType.BOLD}
              style={{color: Colors.yellow, fontSize: 30, paddingTop: 10}}>
              {Detail.Title}
            </TextComponent>
            <View style={{flexDirection: 'row'}}>
              <IconComponent
                type={IconType.AntDesign}
                name="star"
                color={Colors.yellow}
              />
              <TextComponent
                type={FontType.BOLD}
                style={{color: Colors.yellow, marginLeft: 5}}>
                {Detail.imdbRating}
              </TextComponent>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{flexDirection: 'row', flexGrow: 1}}>
              {/* <View
                style={{
                  backgroundColor: Colors.yellow,
                  alignSelf: 'flex-start',
                  marginVertical: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginRight: 10,
                }}>
                <TextComponent type={FontType.BOLD}>
                  {Detail.Language}
                </TextComponent>
              </View> */}
              <View
                style={{
                  backgroundColor: Colors.yellow,
                  alignSelf: 'flex-start',
                  marginVertical: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginRight: 10,
                }}>
                <TextComponent type={FontType.BOLD}>Tamil Dubbed</TextComponent>
              </View>
              <View
                style={{
                  backgroundColor: Colors.yellow,
                  alignSelf: 'flex-start',
                  marginVertical: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                }}>
                <TextComponent type={FontType.BOLD}>
                  {Detail.Genre}
                </TextComponent>
              </View>
            </ScrollView>
            <View
              style={{
                // marginTop: 10,
                backgroundColor: Colors.themeBlack1,
                borderRadius: 8,
                padding: 10,
              }}>
              <TextComponent
                style={{fontSize: 15, color: Colors.accordionBorderColor}}
                type={FontType.BOLD}>
                Plot
              </TextComponent>
              <TextComponent style={{color: Colors.accordionBorderColor}}>
                {Detail.Plot}
              </TextComponent>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextComponent
                  style={{fontSize: 15, color: Colors.accordionBorderColor}}
                  type={FontType.BOLD}>
                  Genre :{` `}
                </TextComponent>
                <TextComponent style={{color: Colors.accordionBorderColor}}>
                  {Detail.Genre}
                </TextComponent>
              </View>
              <View style={{paddingTop: 10}}>
                <TextComponent
                  style={{fontSize: 15, color: Colors.accordionBorderColor}}
                  type={FontType.BOLD}>
                  Actors :{` `}
                </TextComponent>
                <View>
                  <TextComponent style={{color: Colors.accordionBorderColor}}>
                    {Detail.Actors}
                  </TextComponent>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: Colors.yellow,
                  alignSelf: 'flex-start',
                  marginTop: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                  marginRight: 10,
                }}>
                <TextComponent style={{}} type={FontType.BOLD}>
                  {Detail.Year}
                </TextComponent>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                height: heightPerc(40),
                backgroundColor: Colors.themeBlack1,
              }}
            />
            <PlaceholderLine
              color={Colors.themeBlack1}
              width={50}
              //   height={heightPerc(35)}
              style={{borderRadius: 3, marginTop: 10}}
            />
            <PlaceholderLine
              color={Colors.themeBlack1}
              width={20}
              //   height={heightPerc(35)}
              style={{borderRadius: 3, marginTop: 0}}
            />
            <View style={{flexDirection: 'row'}}>
              <PlaceholderLine
                color={Colors.themeBlack1}
                width={30}
                //   height={heightPerc(35)}
                style={{
                  borderRadius: 50,
                  marginRight: 10,
                  height: 30,
                  marginTop: 0,
                }}
              />
              <PlaceholderLine
                color={Colors.themeBlack1}
                width={30}
                //   height={heightPerc(35)}
                style={{borderRadius: 50, height: 30, marginTop: 0}}
              />
            </View>
            <View
              style={{
                height: 100,
                backgroundColor: Colors.themeBlack1,
                borderRadius: 5,
              }}></View>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('VideoPage', {URL: Link})}
        activeOpacity={0.8}
        style={{
          height: 60,
          width: 60,
          backgroundColor: Colors.yellow,
          borderRadius: 30,
          position: 'absolute',
          bottom: 10,
          left: widthPerc(50) - 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconComponent
          name="play"
          type={IconType.MaterialCommunityIcons}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};
export default MovieDetails;
