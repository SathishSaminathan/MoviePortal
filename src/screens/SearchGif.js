import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
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
        // console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }; /// add facebook fresco

  function onEdit(newTerm) {
    updateTerm(newTerm);
  }
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
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: item.images.preview_gif.url}}
              />
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
    width: '50%',
    height: 100,
    borderWidth: 3,
    marginBottom: 5,
  },
});
