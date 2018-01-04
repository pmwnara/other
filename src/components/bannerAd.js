import React from 'react' ;
import {AdMobBanner,} from 'react-native-admob';

const banner =()=>{
  return(
  <AdMobBanner
    adSize="fullBanner"
    adUnitID="ca-app-pub-4893744760365554/7526438406"
    testDeviceID="EMULATOR"
    adViewDidReceiveAd={null}
    didFailToReceiveAdWithError={this.bannerError} />
  )
}

export default banner;
