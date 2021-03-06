import React, {useEffect, Component} from 'react';
import {Dimensions, View, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation-locker';

import TextComponent from '../components/Shared/TextComponent';
import WebView from 'react-native-webview';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import {Colors} from '../constants/ThemeConstants';
import Loader from '../components/Shared/Loader';
const {width, height} = Dimensions.get('window');

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: true,
      Visible: true,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      Orientation.lockToLandscape();
      this.setState({Visible: true});
    });
    this.props.navigation.addListener('blur', () => {
      this.setState({Visible: false});
      Orientation.lockToPortrait();
    });
  }
  render() {
    const {Loading, Visible} = this.state;
    const {URL, type, videoURL} = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
        }}>
        {/* <StatusBar
          backgroundColor={Colors.themeBlack}
          barStyle="light-content"
          hidden={!Loading}
        /> */}
        {Visible && (
          <WebView
            source={{
              uri: URL,
            }}
            onLoadStart={() => this.setState({Loading: true})}
            onLoadEnd={() => this.setState({Loading: false})}
            // style={[
            //   {
            //     width: height,
            //     height: width,
            //     // backgroundColor: Colors.black,
            //   },
            // ]}
          />
        )}
        {Loading && <Loader />}
      </View>
    );
  }
}
export default VideoPage;
