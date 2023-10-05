/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerHeadlessTask('SomeTaskName', () => {
  console.log('SomeTaskName');
  require('./SomeTaskName');
});
AppRegistry.registerComponent(appName, () => App);
