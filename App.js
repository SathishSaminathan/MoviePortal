/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, View, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import TextComponent from './src/components/Shared/TextComponent';
import ImageComponent from './src/components/Shared/ImageComponent';
import {Colors} from './src/constants/ThemeConstants';
import {heightPerc, widthPerc} from './src/helpers/styleHelper';
import {FontType} from './src/constants/AppConstants';
import MovieComponent from './src/components/Shared/MovieComponent';

// const videos = [
//   {
//     movieImage:
//       'https://images-na.ssl-images-amazon.com/images/I/91YM5LJ84QL._SY445_.jpg',
//     movieName: 'Ghost Ship',
//     movieURL:
//       'http://d3.uptofiles.site//files/Tamil%20Dubbed%20Movies/Ghost%20Ship%20(2002)/Ghost%20Ship%20(640x360)/Ghost%20Ship%20HD.mp4',
//   },
//   {
//     movieImage: 'https://i.ytimg.com/vi/M7H_pDISW-w/maxresdefault.jpg',
//     movieName: 'Lights Out',
//     movieURL:
//       'http://d8.uptofiles.site//files/Tamil%20Dubbed%20Movies/Lights%20Out%20(2016)/Lights%20Out%20(640x360)/Lights%20Out%20HD.mp4',
//   },
//   {
//     movieImage:
//       'https://images-na.ssl-images-amazon.com/images/I/81pnutci-hL._SX342_.jpg',
//     movieName: 'The Frighteners',
//     movieURL:
//       'http://d7.uptofiles.site//files/Tamil%20Dubbed%20Movies/The%20Frighteners%20(1996)/The%20Frighteners%20(480x320)/The%20Frighteners%20(480x320).mp4',
//   },
//   {
//     movieImage:
//       'https://images-na.ssl-images-amazon.com/images/I/51SHfYGIToL._SY445_.jpg',
//     movieName: 'The Haunted Mansion',
//     movieURL:
//       'http://d2.uptofiles.site//files/Tamil%20Dubbed%20Movies/The%20Haunted%20Mansion%20(2003)/Mp4%20HD%20(480x320)/The%20Haunted%20Mansion%20(2003)%20HD%20(480x320).mp4',
//   },
//   {
//     movieImage:
//       'https://images-na.ssl-images-amazon.com/images/I/51P%2BgpqvwbL._SY445_.jpg',
//     movieName: 'Lights Out',
//     movieURL:
//       'http://d6.uptofiles.site//files/Tamil%20Dubbed%20Movies/Thir13en%20Ghosts%20(2001)/Thir13en%20Ghosts%20(480x320)/Thir13en%20Ghosts.mp4',
//   },
// ];

const movieCategories = [
  {
    name: 'Ghost Movies',
    value: 'GHOST',
  },
  {
    name: 'Action Movies',
    value: 'ACTION',
  },
  {
    name: 'Fantasy Movies',
    value: 'FANTASY',
  },
];

const App = () => {
  const [Videos, setVideos] = useState(null);
  const [GhostList, setGhostList] = useState(null);
  const [FantasyList, setFantasyList] = useState(null);
  const [ActionList, setActionList] = useState(null);
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
        setGhostList(GhostList);
        setActionList(ActionList);
        setFantasyList(FantasyList);
        // this.setState({Videos});
      });
    // let dbReference = firestore().collection('videos');
    // videos.map((video) => dbReference.add({...video, type:"GHOST"}));
    // let data = data;
    // firestore().in(data, dbReference);
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
        {Videos && <MovieComponent videos={GhostList} title={'Ghost Movies'} />}
        {Videos && <MovieComponent videos={GhostList} title={'Ghost Movies'} />}
        {Videos && <MovieComponent videos={GhostList} title={'Ghost Movies'} />}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
