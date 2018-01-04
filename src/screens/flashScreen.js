import React, { Component } from 'react';
import {Text, View, Image } from 'react-native';
import HomeScreen from './homeScreen';
import { MenuContext } from 'react-native-popup-menu';
import {StackNavigator} from 'react-navigation';


class flashScreen extends Component<{}> {

  constructor(props){
  super(props);
  this.state = {
  timePassed: false
  };
}

componentDidMount() {
  setTimeout( () => {
     this.setTimePassed();
  },2000);
}



setTimePassed() {
   this.setState({timePassed: true});
}


static navigationOptions = {
  header: null,
}


render() {

if (!this.state.timePassed){
  return (
    <View style = {{ alignItems : 'center' , justifyContent: 'center' , height :null , width : null, flex:1 , backgroundColor: '#FFF8E1'}}>
     <Text style = {{
       fontSize: 34,
       fontWeight: 'bold',
       textAlign: 'center',
       margin: 10,
       color :'#8B0000'
     }}>ॐ गं गणपतये नमः</Text>
      <View>
        <Image source = {require('../../assets/ganesha.jpg')} style = {{height : 200 ,  width : 200}} resizeMode= 'contain'/>
      </View>
      <Text>Loading..</Text>
    </View>
  )
}else {
  return(
    <MenuContext>
      <HomeScreen/>
    </MenuContext>
);
}
 }
}

const flashScreenRoute = StackNavigator({
  flashScreen: {screen : flashScreen},
})

export default flashScreenRoute;
