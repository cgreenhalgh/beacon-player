// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("ExampleController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {
 
    $scope.beacons = {};
    $scope.lastRangeTime = 0;
    
    $ionicPlatform.ready(function() {
 
        //$cordovaBeacon.requestWhenInUseAuthorization();
        $cordovaBeacon.requestAlwaysAuthorization();
 
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
        	$scope.lastRangeTime = new Date().getTime();
            var uniqueBeaconKey;
            for(var i = 0; i < pluginResult.beacons.length; i++) {
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                $scope.beacons[uniqueBeaconKey].date = new Date();
                console.log('Beacon '+JSON.stringify(pluginResult.beacons[i]));
            }
            $scope.$apply();
        });
 
        // Jaalee ? EBEFD083-70A2-47C8-9837-E7B5634DF524
        //$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("jaalee","EBEFD083-70A2-47C8-9837-E7B5634DF524"));
        // specific example... ACD6C87A-62D9-F53D-1CE4-F7726B53D4DA 12 58456 (proximity beacon)
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("jaalee-james","ACD6C87A-62D9-F53D-1CE4-F7726B53D4DA"));
        //$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
 
    });
});