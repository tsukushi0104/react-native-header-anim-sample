import React from 'react';
import { StyleSheet, Text, View, Animated, ScrollView, SafeAreaView } from 'react-native';

export default class App extends React.Component {
  state = {
    visibility : new Animated.Value(0),
    showTitle: false,
  }

  _onScroll = (e) => {
    const { y } = e.nativeEvent.contentOffset;
    if(y  > 128){
      Animated.timing(this.state.visibility, {
        toValue: 1,
        duration: 200,
      }).start(() => {
        this.setState({
          showTitle: true,
        })
      });
    } else {
      Animated.timing(this.state.visibility, {
        toValue: 0,
        duration: 200,
      }).start(() => {
        this.setState({
          showTitle: false,
        })
      });
    }
  }


  render() {
    const animatedStyle = {
      backgroundColor: this.state.visibility.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['transparent', 'gray', 'white']
      }),
    };
    const animatedTextStyle = {
      color: this.state.visibility.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['white', 'gray', 'black']
      }),
    };
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Animated.View 
          style={[{
            width: '100%',
            position: 'absolute',
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            zIndex: 10,
          }, animatedStyle]}    
        >
          <Animated.Text
            style={animatedTextStyle}
          >
            { this.state.showTitle ? 'Title' : 'Header' }
          </Animated.Text>
        </Animated.View>
        <View
            style={{
              height: 2000,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <ScrollView
            onScroll={this._onScroll}
            scrollEventThrottle={16}
          >
            <View
              style={{
                height: 360,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#374046',
              }}
            >
              <Text>Image</Text>
            </View>
            <Text
              style={{
                fontSize: 160,
              }}
            >Open up App.js to start working on your app!</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text>Shake your phone to open the developer menu.</Text>
          </ScrollView>
        </View>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
