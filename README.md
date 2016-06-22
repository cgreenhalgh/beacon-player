# Beacon Player

Quick attempt to prototype i-beacon triggered audio player in Ionic.

initially based on [this plugin](https://github.com/petermetz/cordova-plugin-ibeacon) and [this tutorial](https://www.thepolyglotdeveloper.com/2015/09/support-ibeacons-in-your-ionic-framework-mobile-app/)

Current status: nothing here.

Chris Greenhalgh, Copyright (c) The University of Nottingham, 2016

## building ...

Done...
```
ionic platform add android
ionic resources
cordova plugin add https://github.com/cgreenhalgh/cordova-plugin-ibeacon
ionic browser add crosswalk

ionic build android
```

[ng-cordova-beacon.min.js](https://github.com/nraboy/ng-cordova-beacon/blob/master/dist/ng-cordova-beacon.min.js)

## beacons

Tried the following Android apps for testing and checking UUIDs:
- eBeacon by JAALEE, Inc. - worked with a re-programmed JAALEE tag
- Locate Beacon, by Radius Networks, Inc - did not detect the re-programmed JAALEE tag

UUID of borrowed beacons:
- F7826DA6-4FA2-4E98-8024-BC5B71E0893E - from James

