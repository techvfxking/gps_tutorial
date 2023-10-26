import { Component } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { AndroidSettings, IOSSettings, NativeSettings } from 'capacitor-native-settings';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pageTitle: string = 'Geo Location';
  constructor() { }
  
  getCurrentLocation = async () => {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Permission status: ', permissionStatus.location);
      if (permissionStatus?.location !== 'granted') {
        const requestPermission = await Geolocation.requestPermissions();
        if (requestPermission?.location !== 'granted') {
          return;
        }
      }
      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true
      };
      
      const postion = await Geolocation.getCurrentPosition(options);
      console.log(postion);
      console.log("position: "+ postion.coords.latitude)
    } catch (error) {
      console.log(error);
    }
  }

  openSettings(app = false) {
    console.log("Opening settings");
    return NativeSettings.open({
      optionIOS: app ? IOSSettings.App: IOSSettings.LocationServices,
      optionAndroid: app ? AndroidSettings.ApplicationDetails : AndroidSettings.Location
    })
  }
}
