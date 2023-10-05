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

// //import BackgroundJob from 'react-native-background-actions';
import BackgroundService from 'react-native-background-actions';

// //const sleep = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));
// const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

// BackgroundJob.on('expiration', () => {
//   console.log('iOS: I am being closed!');
// });

// const taskRandom = async taskData => {
//   console.log('taskRandom called ');
//   if (Platform.OS === 'ios') {
//     console.warn(
//       'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
//       'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
//     );
//   }
//   await new Promise(async resolve => {
//     // For loop with a delay
//     const {delay} = taskData;
//     console.log(BackgroundJob.isRunning(), delay);
//     for (let i = 0; BackgroundJob.isRunning(); i++) {
//       console.log('Runned -> ', i);
//       await BackgroundJob.updateNotification({taskDesc: 'Runned -> ' + i});
//       await sleep(delay);
//     }
//     resolve();
//   });
// };

// const options = {
//   taskName: 'Example',
//   taskTitle: 'ExampleTask title',
//   taskDesc: 'ExampleTask desc',
//   taskIcon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   linkingURI: 'exampleScheme://chat/jane',
//   parameters: {
//     delay: 1000,
//   },
// };

export default App = () => {
  const usingHermes =
    typeof HermesInternal === 'object' && HermesInternal !== null;

  //let playing = BackgroundJob.isRunning();

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

  /**
   * Toggles the background task
   */
  // const toggleBackground = async () => {
  //   playing = !playing;
  //   if (playing) {
  //     try {
  //       console.log('Trying to start background service');
  //       await BackgroundJob.start(taskRandom, options);
  //       console.log('Successful start!');
  //     } catch (e) {
  //       console.log('Error', e);
  //     }
  //   } else {
  //     console.log('Stop background service');
  //     await BackgroundJob.stop();
  //   }
  // };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}
          {!usingHermes ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <TouchableOpacity
              style={{height: 100, width: 100, backgroundColor: 'red'}}
              onPress={() => {}}></TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fff',
  },
  footer: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
