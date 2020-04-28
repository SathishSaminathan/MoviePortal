import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Orientation from 'react-native-orientation-locker';

import TextComponent from '../components/Shared/TextComponent';
import Carousel from '../components/Shared/Carousel';
import ImageComponent from '../components/Shared/ImageComponent';
import {Colors} from '../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import {FontType} from '../constants/AppConstants';
import MovieComponent from '../components/Shared/MovieComponent';
import SkeletonMovie from '../components/Shared/SkeletonMovie';

const movieCategories = [
  {
    name: 'Ghost Movies',
    value: 'Ghost',
    key: 'GhostList',
  },
  {
    name: 'Action Movies',
    value: 'Action',
    key: 'ActionList',
  },
  {
    name: 'Fantasy Movies',
    value: 'Fantasy',
    key: 'FantasyList',
  },
];

const dummyData = [
  {
    title: 'Anise Aroma Art Bazar',
    url: 'https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 1,
  },
  {
    title: 'Food inside a Bowl',
    url: 'https://i.ibb.co/JtS24qP/food-inside-bowl-1854037.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 2,
  },
  {
    title: 'Vegatable Salad',
    url:
      'https://i.ibb.co/JxykVBt/flat-lay-photography-of-vegetable-salad-on-plate-1640777.jpg',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    id: 3,
  },
];

const Home = (props) => {
  const [Videos, setVideos] = useState(null);
  const [GhostList, setGhostList] = useState(null);
  const [FantasyList, setFantasyList] = useState(null);
  const [ActionList, setActionList] = useState(null);
  const [TopFive, setTopFive] = useState(null);
  const [List, setList] = useState({});
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      Orientation.lockToPortrait();
    });
    // StatusBar.setBackgroundColor(Colors.yellow);
    // StatusBar.setBarStyle('dark-content');
    firestore()
      .collection('movielist')
      .onSnapshot((querySnapshot) => {
        let Videos = [];
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          Videos.push(doc.data());
          // console.log('Videos', Videos);
        });
        setTimeout(() => {
          setVideos(Videos);
        }, 2000);
        let GhostList = [];
        let ActionList = [];
        let FantasyList = [];
        if (Videos) {
          Videos.map((video) => {
            let type = video.Category;
            if (type) {
              switch (type) {
                case 'Ghost':
                  GhostList.push(video);
                  break;

                case 'Fantasy':
                  FantasyList.push(video);
                  break;

                case 'Action':
                  ActionList.push(video);
                  break;

                default:
                  break;
              }
            }
            let topVideos = Videos.sort((a, b) => b.Views - a.Views).splice(0, 5);
            setTopFive(topVideos);
          });
          // setVideos(Videos);
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
      <ScrollView
        style={{flex: 1, backgroundColor: Colors.white}}
        showsVerticalScrollIndicator={false}>
        <View style={{padding: 20}}>
          <TextComponent
            type={FontType.BOLD}
            numberOfLines={2}
            style={{color: Colors.yellow, fontSize: 80}}>
            MOVIE
          </TextComponent>
          <TextComponent
            numberOfLines={2}
            style={{color: Colors.themeBlack, fontSize: 40}}>
            PORTAL
          </TextComponent>
        </View>
        {Videos && <Carousel {...props} data={TopFive} />}
        {Videos
          ? movieCategories.map((cat, i) => (
              <MovieComponent
                key={i}
                title={cat.name}
                videos={List[cat.key]}
                {...props}
              />
            ))
          : movieCategories.map((cat, i) => <SkeletonMovie key={i} />)}
      </ScrollView>
    </>
  );
};

export default Home;
