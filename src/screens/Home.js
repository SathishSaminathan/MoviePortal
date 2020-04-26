import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import TextComponent from '../components/Shared/TextComponent';
import ImageComponent from '../components/Shared/ImageComponent';
import {Colors} from '../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import {FontType} from '../constants/AppConstants';
import MovieComponent from '../components/Shared/MovieComponent';

const movieCategories = [
  {
    name: 'Ghost Movies',
    value: 'GHOST',
    key: 'GhostList',
  },
  {
    name: 'Action Movies',
    value: 'ACTION',
    key: 'ActionList',
  },
  {
    name: 'Fantasy Movies',
    value: 'FANTASY',
    key: 'FantasyList',
  },
];

const Home = (props) => {
  const [Videos, setVideos] = useState(null);
  const [GhostList, setGhostList] = useState(null);
  const [FantasyList, setFantasyList] = useState(null);
  const [ActionList, setActionList] = useState(null);
  const [List, setList] = useState({});
  useEffect(() => {
    firestore()
      .collection('videos')
      .onSnapshot((querySnapshot) => {
        let Videos = [];
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          Videos.push(doc.data());
          console.log('Videos', Videos);
        });
        // setVideos(Videos);
        let GhostList = [];
        let ActionList = [];
        let FantasyList = [];
        if (Videos) {
          Videos.map((video) => {
            let type = video.type;
            if (type) {
              switch (type) {
                case 'GHOST':
                  GhostList.push(video);
                  break;

                case 'FANTASY':
                  FantasyList.push(video);
                  break;

                case 'ACTION':
                  ActionList.push(video);
                  break;

                default:
                  break;
              }
            }
          });
          setVideos(Videos);
          setList({
            GhostList,
            FantasyList,
            ActionList,
          });
        }
      });
    // let dbReference = firestore().collection('videos');
    // videos.map((video) => dbReference.add({...video, type: 'ACTION'}));
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.yellow} />
      <ScrollView style={{flex: 1, backgroundColor: Colors.themeBlack}}>
        <View style={{padding: 20}}>
          <TextComponent
            type={FontType.BOLD}
            numberOfLines={2}
            style={{color: Colors.yellow, fontSize: 80}}>
            MOVIE
          </TextComponent>
          <TextComponent
            numberOfLines={2}
            style={{color: Colors.yellow, fontSize: 40}}>
            PORTEL
          </TextComponent>
        </View>

        {Videos &&
          movieCategories.map((cat, i) => (
            <MovieComponent
              key={i}
              title={cat.name}
              videos={List[cat.key]}
              {...props}
            />
          ))}
      </ScrollView>
    </>
  );
};

export default Home;
