import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';

import {Colors} from '../constants/ThemeConstants';
import IconComponent from '../components/Shared/IconComponent';
import {IconType} from '../constants/AppConstants';

// do not forget to add fresco animation to build.gradle
export default function SearchGif() {
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');

  const fetchGifs = () => {
    const API_KEY = 'ea8tMej2SwTcfk5HS3uOPkyLDDqg3ixn';
    const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
    let url = `${BASE_URL}?api_key=${API_KEY}&q=${term}&limit=100`;
    // console.log(url);
    Axios.get(url)
      .then((res) => {
        setGifs(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }; /// add facebook fresco

  function onEdit(newTerm) {
    updateTerm(newTerm);
  }

  const shareImage = (image) => {
    const shareOptions = {
      title: 'Checkout the Image',
      message: 'Picso Image',
      url: image,
    };
    Share.open(shareOptions);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Picso App requires Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.showWithGravityAndOffset(
          'Your Gif is downloading...',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return true;
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Please grant permission to save the images...',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const saveToCameraRoll = (image) => {
    // const isGranted = requestCameraPermission();
    // if (Platform.OS === 'android') {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'gif',
    })
      .fetch('GET', image)
      .then((res) => {
        shareImage(`file://${res.path()}`);
        // CameraRoll.saveToCameraRoll(res.path())
        //   .then((res) => {
        //     ToastAndroid.showWithGravityAndOffset(
        //       'Gif added to Gallery!',
        //       ToastAndroid.SHORT,
        //       ToastAndroid.BOTTOM,
        //       25,
        //       50,
        //     );
        //   })
        //   .catch((err) => console.log('err:', err));
      });
    // } else {
    //   CameraRoll.saveToCameraRoll(image.urls.small).then(
    //     Alert.alert('Success', 'Photo added to camera roll!'),
    //   );
    // }
  };

  return (
    <View style={styles.view}>
      <View
        style={{
          padding: 5,
          //   paddingTop: '50%',
          //   flex: 1,
          //   height: 80,
          backgroundColor: Colors.themeBlack,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          borderWidth: 1,
          borderColor: Colors.darkGrey,
          elevation: 5,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 8}}>
            <TextInput
              placeholder="Search Giphy"
              placeholderTextColor={Colors.darkGrey}
              style={styles.textInput}
              onChangeText={(text) => onEdit(text)}
            />
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!term}
              onPress={fetchGifs}
              // onPress={saveToCameraRoll}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                elevation: 5,
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: Colors.darkGrey,
              }}>
              <IconComponent
                type={IconType.Feather}
                name="search"
                size={20}
                color={Colors.yellow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {gifs ? (
        <FlatList
          style={{width: '100%', marginTop: 10}}
          data={gifs}
          //   horizontal
          numColumns={2}
          renderItem={({item}) => {
            //   console.log("item.images.preview_gif.url", item.images.preview_gif.url)
            return (
              <TouchableOpacity
                style={{width: '50%', height: 100}}
                onPress={() => saveToCameraRoll(item.images.original.url)}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={{uri: item.images.preview_gif.url}}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    // alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.themeBlack,
    paddingTop: '10%',
  },
  textInput: {
    fontSize: 20,
    color: Colors.yellow,
    fontFamily: 'Proxima Nova Condensed Semibold',
  },
  image: {
    flex: 1,
    borderWidth: 3,
    marginBottom: 5,
  },
});
