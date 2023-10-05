#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
WHITE='\033[0;37m'
YELLOW='\033[0;33m'
RESET='\033[0m'

#echo -e "The Italian flag colors are ${GREEN}GREEN${RESET}, ${WHITE}WHITE${RESET}, and ${RED}RED${RESET}."

echo -e "${GREEN}### Welcome to Document Organiser App Launch CLI ###${RESET}\n"
# echo -e "${WHITE}iOS : Enter ios and press Enter${RESET}"
# echo -e "${YELLOW}Android : Enter android and press Enter${RESET}"
# echo -e "${RED}Android with cache clean : Enter android-cache and press Enter${RESET}"

echo "Enter ios | ios-cache | ios-insall | android | android-cache to star the execution ..."

read name

if [ $name == 'ios' ]
then
   echo "Builing & starting simulator... iPhone 14 Pro Max 16.2"
   npx react-native run-ios --udid '84DF6787-2E70-4F20-8271-020526CEBBA6'

elif [ $name == 'ios-install' ]
then
   echo "Executing commands ... please wait"
   rm -rf ~/Library/Developer/Xcode/DerivedData
   npm cache clean --force
   npm install --legacy-peer-deps
   cd ios && pod install && cd ..
   echo "Builing & starting simulator... iPhone 14 Pro Max 16.2"
   npx react-native run-ios --udid '84DF6787-2E70-4F20-8271-020526CEBBA6'

elif [ $name == 'ios-cache' ]
then
   echo "Executing commands ... please wait"
   # rm -rf ~/Library/Developer/Xcode/DerivedData
   npm cache clean --force
   npm install --legacy-peer-deps
   npx pod-install ios
   echo "Builing & starting simulator... iPhone 14 Pro Max 16.2"
   npx react-native run-ios --udid '84DF6787-2E70-4F20-8271-020526CEBBA6'

elif [ $name == 'android-cache' ]
then
   echo "Executing commands ... please wait"
   cd android
   echo "RUN ./gradlew --stop"
   ./gradlew --stop
   echo "RUN ./gradlew cleanBuildCache"
   ./gradlew cleanBuildCache
   echo "RUN rm -rf ~/.gradle/caches/"
   rm -rf ~/.gradle/caches/
   echo "RUN rm -rf .idea"
   rm -rf .idea && cd ..
   echo "RUN npm cache clean --force"
   npm cache clean --force
   echo "RUN npm install --legacy-peer-deps"
   npm install --legacy-peer-deps
   echo "RUN npx react-native run-android"
   npx react-native run-android

elif [ $name == 'android' ]
then
   echo "Executing commands ... please wait"
   cd android
   echo "RUN ./gradlew --stop"
   ./gradlew --stop
   echo "RUN ./gradlew cleanBuildCache"
   ./gradlew cleanBuildCache && cd ..
   echo "RUN npm cache clean --force"
   npm cache clean --force
   echo "RUN npm install --legacy-peer-deps"
   npm install --legacy-peer-deps
   echo "Done"
   echo "READY TO BUILD FOR Android"
   echo "Building & starting emulator..."
   npx react-native run-android
fi
