import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  View,
  ActivityIndicator,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';

import {Colors} from '../constants/ThemeConstants';

const GifImage = ({item}) => {
  const [IsLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    // const isGranted = requestCameraPermission();
    // if (Platform.OS === 'android') {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'gif',
    })
      .fetch('GET', image)
      .then((res) => {
        setIsLoading(false);
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
    <View style={{width: '50%', height: 100}}>
      {IsLoading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#00000085',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color={Colors.yellow} />
        </View>
      )}
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => saveToCameraRoll(item.images.downsized.url)}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: item.images.preview_gif.url}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderWidth: 3,
    marginBottom: 5,
  },
});

export default GifImage;
