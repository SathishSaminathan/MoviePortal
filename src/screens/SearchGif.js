import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Button,
} from 'react-native';
import Axios from 'axios';
import {Colors} from '../constants/ThemeConstants';
// do not forget to add fresco animation to build.gradle
export default function SearchGif() {
  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');

  const fetchGifs = () => {
    const API_KEY = 'ea8tMej2SwTcfk5HS3uOPkyLDDqg3ixn';
    const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
    let url = `${BASE_URL}?api_key=${API_KEY}&q=${term}&limit=100`;
    console.log(url);
    Axios.get(url)
      .then((res) => {
        setGifs(res.data.data);
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
      <View style={{paddingVertical: 10}}>
        <TextInput
          placeholder="Search Giphy"
          placeholderTextColor="#fff"
          style={styles.textInput}
          onChangeText={(text) => onEdit(text)}
        />
      </View>
      {term ? <Button title="search" onPress={fetchGifs} /> : null}
      {gifs ? (
        <FlatList
          style={{width: '100%'}}
          data={gifs}
          //   horizontal
          numColumns={2}
          renderItem={({item}) => {
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
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'white',
  },
  image: {
    width: '50%',
    height: 100,
    borderWidth: 3,
    marginBottom: 5,
  },
});
