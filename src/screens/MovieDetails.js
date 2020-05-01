import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import Axios from 'axios';

import {Colors} from '../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import ImageComponent from '../components/Shared/ImageComponent';
import TextComponent from '../components/Shared/TextComponent';
import {FontType, IconType} from '../constants/AppConstants';
import Ripple from 'react-native-material-ripple';
import IconComponent from '../components/Shared/IconComponent';

const MovieDetails = ({params}) => {
  const [Detail, setDetail] = useState({
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
  });
  useEffect(() => {
    // getDetails();
  }, []);
  const getDetails = () => {
    Axios.get('http://www.omdbapi.com/?t=shazam&apikey=a851fc51')
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.themeBlack}}>
      <View
        style={{
          height: 60,
          backgroundColor: Colors.themeBlack1,
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <Ripple
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
          {Detail.Title}
        </TextComponent>
      </View>
      <View style={{padding: 10}}>
        {Detail && (
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
            <View style={{width: '100%', height: heightPerc(40)}}>
              <ImageComponent source={{uri: Detail.Poster}} />
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
            <View
              style={{
                backgroundColor: Colors.yellow,
                alignSelf: 'flex-start',
                marginVertical: 10,
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 50,
              }}>
              <TextComponent style={{fontSize: 15}} type={FontType.BOLD}>
                {Detail.Language}
              </TextComponent>
            </View>
            <View
              style={{
                // marginTop: 10,
                backgroundColor: Colors.themeBlack1,
                borderRadius: 8,
                padding: 10,
              }}>
              <TextComponent
                style={{fontSize: 15, color: Colors.white}}
                type={FontType.BOLD}>
                Plot
              </TextComponent>
              <TextComponent style={{color: Colors.white}}>
                {Detail.Plot}
              </TextComponent>
              <View style={{paddingVertical: 10, flexDirection: 'row'}}>
                <TextComponent
                  style={{fontSize: 15, color: Colors.white}}
                  type={FontType.BOLD}>
                  Genre :{` `}
                </TextComponent>
                <TextComponent style={{color: Colors.white}}>
                  {Detail.Genre}
                </TextComponent>
              </View>
              <View>
                <TextComponent
                  style={{fontSize: 15, color: Colors.white}}
                  type={FontType.BOLD}>
                  Actors :{` `}
                </TextComponent>
                <View>
                  <TextComponent style={{color: Colors.white}}>
                    {Detail.Actors}
                  </TextComponent>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default MovieDetails;
