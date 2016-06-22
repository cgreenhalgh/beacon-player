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
 
    	// Note: non-standard function for beacon plugin - use https://github.com/cgreenhalgh/cordova-plugin-ibeacon
    	try {
    		cordova.plugins.locationManager.setRssiFilterRunningAverage(2000);
    	}
    	catch (err) {
    		console.log('Error setting RSSI filter on locationManager '+cordova.plugins.locationManager+': '+err.message,err);
    	}
 
        //$cordovaBeacon.requestWhenInUseAuthorization();
        $cordovaBeacon.requestAlwaysAuthorization();
 
        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
        	$scope.lastRangeTime = new Date().getTime();
            var uniqueBeaconKey;
            for(var i = 0; i < pluginResult.beacons.length; i++) {
            	// e.g. {"proximity":"ProximityImmediate","tx":-60,"rssi":-39,"uuid":"acd6c87a-62d9-f53d-1ce4-f7726b53d4da","accuracy":0.02,"minor":"7256","major":"12"}],"eventType":"didRangeBeaconsInRegion"}
            	// I think James has minor ID rotating pseudo-randomly! - I often see other minor IDs!
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
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("kontakt-wayward","f7826da6-4fa2-4e98-8024-bc5b71e0893e"));
        //$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));
 
    });
});