/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import BackgroundService from 'react-native-background-actions';

export default App = () => {
  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async taskDataArguments => {
    console.log('veryIntensiveTask called ');
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        await sleep(delay);
      }
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  const mBackgroundTask = async () => {
    console.log('mBackgroundTask called ');
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'New ExampleTask description',
    }); // Only Android, iOS will ignore this call
    // iOS will also run everything here in the background until .stop() is called
    setTimeout(async () => {
      await BackgroundService.stop();
    }, 10000);
  };

  useEffect(() => {
    mBackgroundTask();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Text>Background Service</Text>
        </View>
      </SafeAreaView>
    </>
  );
};
