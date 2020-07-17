import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Animation from 'lottie-react-native';

export default class lottieloader extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 350,
              height: 350
            }}
            loop={true}
            source="27509-privacy.json"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b0a91'
  }
});

AppRegistry.registerComponent('lottieloader', () => lottieloader);