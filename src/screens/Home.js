import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Orientation from 'react-native-orientation-locker';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

import TextComponent from '../components/Shared/TextComponent';
import IconComponent from '../components/Shared/IconComponent';
import Carousel from '../components/Shared/Carousel';
import ImageComponent from '../components/Shared/ImageComponent';
import {Colors} from '../constants/ThemeConstants';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import {FontType, IconType} from '../constants/AppConstants';
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
  const [InfoVisible, setInfoVisible] = useState(false);
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
            // let topVideos = Videos.sort((a, b) => b.Views - a.Views).slice(
            //   0,
            //   5,
            // );
            // setTopFive(topVideos);
            let videos = JSON.parse(JSON.stringify(Videos));
            setTopFive(videos.sort((a, b) => b.Views - a.Views).slice(0, 5));
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
        overScrollMode="never"
        style={{flex: 1, backgroundColor: Colors.themeBlack}}
        showsVerticalScrollIndicator={false}>
        <View style={{padding: 20, paddingTop: '10%'}}>
          <TextComponent
            type={FontType.BOLD}
            numberOfLines={2}
            style={{color: Colors.yellow, fontSize: 60}}>
            MOVIE
          </TextComponent>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextComponent
              numberOfLines={2}
              style={{color: Colors.white, fontSize: 30, paddingRight: 10}}>
              PORTAL
            </TextComponent>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setInfoVisible(true)}>
              <IconComponent
                color={Colors.lightGrey}
                type={IconType.Feather}
                name="info"
                size={15}
              />
            </TouchableOpacity>
          </View>
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
      <Dialog
        containerStyle={{backgroundColor: '#00000085'}}
        visible={InfoVisible}
        onTouchOutside={() => {
          setInfoVisible(false);
        }}>
        <DialogContent
          style={{backgroundColor: Colors.white, width: widthPerc(80)}}>
          <View style={{paddingTop: 10}}>
            <TextComponent type={FontType.BOLD} style={{fontSize: 20}}>
              Disclaimer
            </TextComponent>
            <TextComponent>
              The content provided in this application is available free on
              public domains. This is title third party streaming player app,
              not title downloader. We do not upload any videos or not showing
              any modified content. This app is just customising the videos in
              title more user-friendly way for users. We don't claim right on
              any file in this application. All the content provided in this
              application has the copyrights of their respective owners.
            </TextComponent>
          </View>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;
