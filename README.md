# Movement Tracker
React Native mobile app used to track and save the user's movement

## Backend
This app includes an Express backend to save and fetch past user movements.

## Frontend
This app allows the user to view a list of their previously tracked movements. Also, the user can start and stop a movement from within the app. They will have the option to save this to their personal account.

## How it works
Currently, the user's movement is simulated using the _mockLocation.js_ file within the _src_ directory. In order to begin tracking your current location, feel free to comment out the `import '../_mockLocation'` as listed at the first line of the _TrackCreateScreen.js_ file.

This mobile app was created apart of "The Complete React Native + Hooks Course" by Stephen Grider.
