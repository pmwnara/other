import React, {Component} from 'react';
import { Platform, StyleSheet, Modal, ListView,Text, View, Image,Alert, ScrollView, TouchableOpacity, FlatList, AsyncStorage} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, Card,CardItem, Item, Input, Label, ListItem, Thumbnail} from 'native-base';
import { Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {Col, Row,Grid} from 'react-native-easy-grid';
import {AdMobInterstitial} from 'react-native-admob';
import {  Menu,MenuOptions,MenuOption,  MenuTrigger,} from 'react-native-popup-menu';
import Mailer from 'react-native-mail'


import {timeDay} from '../constants';
//import Menu from '../components/menu';
import Banner from '../components/bannerAd';
import PlanYourDay from './planYourDay';
import AboutChaughadiya from './aboutChaughadiya'

const date = new Date() ;
const currentHour = date.getHours();
const currentMinute = date.getMinutes();

class HomeScreen extends Component{

  constructor(props) {
     super(props);
     this.state = {
       city : '',
      //  sunrise : '6:00',
      //  sunset: '6:00',
       currentHour,
       currentMinute,
       desc : '',
       chaughariya:'',
       boxColor:'red',
       timeSlot: '',
       detail:'',
       hindiName:''
  };
}

static navigationOptions = {
  header: null,
}

async componentWillMount(){
  try{
  const check = await AsyncStorage.setItem('name','meghna');
  console.log('check value from async' , check);
}catch(err){
  console.log('async error',err);
}
}

 componentDidMount(){
  AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  AdMobInterstitial.setAdUnitID('ca-app-pub-4893744760365554/3683396312');
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('location----------------------.>', position);
    },
    (error) =>{
      console.log('error', error);
    },
    { timeout: 20000, maximumAge: 1000 },
  );

  this.checkChaughariya()
  setTimeout(() => {
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, 80000);
}


checkChaughariya(){
  let current = new Date();
  let num = (current.getDay()) +1 ;
  let hour = currentHour;
  let minute = currentMinute;
  var chaughariya;
  var boxColor;
  var desc;
  var timeSlot;
  if (hour == 18 || hour == 19 && minute < 30)
    { timeSlot = "6:00 PM - 7:30 PM"
      if (num == 1)
      {
        chaughariya = "Shubh";
      }
      else if (num == 2)
      {
        chaughariya = "Char";
      }
      else if (num == 3)
      {
        chaughariya = "Kaal";
      }
      else if (num == 4)
      {
        chaughariya = "Udveg";
      }
      else if (num == 5)
      {
        chaughariya = "Amrit";
      }
      else if (num == 6)
      {
        chaughariya = "Rog";
      }
      else if (num == 7)
      {
        chaughariya = "Laabh";
      }
    }
    else if (hour == 20 || hour == 19 && minute >= 30)
    {  timeSlot = "7:30 PM - 9:00 PM"
      if (num == 1)
      {
        chaughariya = "Amrit";
      }
      else if (num == 2)
      {
        chaughariya = "Rog";
      }
      else if (num == 3)
      {
        chaughariya = "Laabh";
      }
      else if (num == 4)
      {
        chaughariya = "Shubh";
      }
      else if (num == 5)
      {
        chaughariya = "Char";
      }
      else if (num == 6)
      {
        chaughariya = "Kaal";
      }
      else if (num == 7)
      {
        chaughariya = "Udveg";
      }
    }
    else if (hour == 21 || hour == 22 && minute < 30)
    { timeSlot= '9:00 PM - 10:30 PM'
      if (num == 1)
      {
        chaughariya = "Char";
      }
      else if (num == 2)
      {
        chaughariya = "Kaal";
      }
      else if (num == 3)
      {
        chaughariya = "Udveg";
      }
      else if (num == 4)
      {
        chaughariya = "Amrit";
      }
      else if (num == 5)
      {
        chaughariya = "Rog";
      }
      else if (num == 6)
      {
        chaughariya = "Laabh";
      }
      else if (num == 7)
      {
        chaughariya = "Shubh";
      }
    }
    else if (hour == 23 || hour == 22 && minute >= 30)
    { timeSlot = "10:30 PM - 12:00 AM"
      if (num == 1)
      {
        chaughariya = "Rog";
      }
      else if (num == 2)
      {
        chaughariya = "Laabh";
      }
      else if (num == 3)
      {
        chaughariya = "Shubh";
      }
      else if (num == 4)
      {
        chaughariya = "Char";
      }
      else if (num == 5)
      {
        chaughariya = "Kaal";
      }
      else if (num == 6)
      {
        chaughariya = "Udveg";
      }
      else if (num == 7)
      {
        chaughariya = "Amrit";
      }
    }
    else if (hour == 0 || hour == 1 && minute < 30)
    {  timeSlot = '12:00 AM - 1:30 AM'
      if (num == 1)
      {
        chaughariya = "Kaal";
      }
      else if (num == 2)
      {
        chaughariya = "Udveg";
      }
      else if (num == 3)
      {
        chaughariya = "Amrit";
      }
      else if (num == 4)
      {
        chaughariya = "Rog";
      }
      else if (num == 5)
      {
        chaughariya = "Laabh";
      }
      else if (num == 6)
      {
        chaughariya = "Shubh";
      }
      else if (num == 7)
      {
        chaughariya = "Char";
      }
    }
    else if (hour == 2 || hour == 1 && minute >= 30)
    { timeSlot = "1:30 AM - 3:00 AM"
      if (num == 1)
      {
        chaughariya = "Laabh";
      }
      else if (num == 2)
      {
        chaughariya = "Shubh";
      }
      else if (num == 3)
      {
        chaughariya = "Char";
      }
      else if (num == 4)
      {
        chaughariya = "Kaal";
      }
      else if (num == 5)
      {
        chaughariya = "Udveg";
      }
      else if (num == 6)
      {
        chaughariya = "Amrit";
      }
      else if (num == 7)
      {
        chaughariya = "Rog";
      }
    }
    else if (hour == 3 || hour == 4 && minute < 30)
    { timeSlot = "3:00 AM - 4:30 AM"
      if (num == 1)
      {
        chaughariya = "Udveg";
      }
      else if (num == 2)
      {
        chaughariya = "Amrit";
      }
      else if (num == 3)
      {
        chaughariya = "Rog";
      }
      else if (num == 4)
      {
        chaughariya = "Laabh";
      }
      else if (num == 5)
      {
        chaughariya = "Shubh";
      }
      else if (num == 6)
      {
        chaughariya = "Char";
      }
      else if (num == 7)
      {
        chaughariya = "Kaal";
      }
    }
    else if (hour == 5 || hour == 4 && minute >= 30)
    {  timeSlot = '4:30 AM - 6:00 AM'
      if (num == 1)
      {
        chaughariya = "Shubh";
      }
      else if (num == 2)
      {
        chaughariya = "Char";
      }
      else if (num == 3)
      {
        chaughariya = "Kaal";
      }
      else if (num == 4)
      {
        chaughariya = "Udveg";
      }
      else if (num == 5)
      {
        chaughariya = "Amrit";
      }
      else if (num == 6)
      {
        chaughariya = "Rog";
      }
      else if (num == 7)
      {
        chaughariya = "Laabh";
      }
    }
    else if (hour == 6 || hour == 7 && minute < 30)
    { timeSlot = "6:00 AM - 7:30 AM"
      if (num == 1)
      {
        chaughariya = "Udveg";
      }
      else if (num == 2)
      {
        chaughariya = "Amrit";
      }
      else if (num == 3)
      {
        chaughariya = "Rog";
      }
      else if (num == 4)
      {
        chaughariya = "Laabh";
      }
      else if (num == 5)
      {
        chaughariya = "Shubh";
      }
      else if (num == 6)
      {
        chaughariya = "Char";
      }
      else if (num == 7)
      {
        chaughariya = "Kaal";
      }
    }
    else if (hour == 8 || hour == 7 && minute >= 30)
    { timeSlot = "7:30 AM - 9:00 AM"
      if (num == 1)
      {
        chaughariya = "Char";
      }
      else if (num == 2)
      {
        chaughariya = "Kaal";
      }
      else if (num == 3)
      {
        chaughariya = "Udveg";
      }
      else if (num == 4)
      {
        chaughariya = "Amrit";
      }
      else if (num == 5)
      {
        chaughariya = "Rog";
      }
      else if (num == 6)
      {
        chaughariya = "Laabh";
      }
      else if (num == 7)
      {
        chaughariya = "Shubh";
      }
    }
    else if (hour == 9 || hour == 10 && minute < 30)
    { timeSlot = '9:00 AM - 10:30 AM'
      if (num == 1)
      {
        chaughariya = "Laabh";
      }
      else if (num == 2)
      {
        chaughariya = "Shubh";
      }
      else if (num == 3)
      {
        chaughariya = "Char";
      }
      else if (num == 4)
      {
        chaughariya = "Kaal";
      }
      else if (num == 5)
      {
        chaughariya = "Udveg";
      }
      else if (num == 6)
      {
        chaughariya = "Amrit";
      }
      else if (num == 7)
      {
        chaughariya = "Rog";
      }
    }
    else if (hour == 11 || hour == 10 && minute >= 30)
    {  timeSlot = '10:30 AM - 12:00 PM'
      if (num == 1)
      {
        chaughariya = "Amrit";
      }
      else if (num == 2)
      {
        chaughariya = "Rog";
      }
      else if (num == 3)
      {
        chaughariya = "Laabh";
      }
      else if (num == 4)
      {
        chaughariya = "Shubh";
      }
      else if (num == 5)
      {
        chaughariya = "Char";
      }
      else if (num == 6)
      {
        chaughariya = "Kaal";
      }
      else if (num == 7)
      {
        chaughariya = "Udveg";
      }
    }
    else if (hour == 12 || hour == 13 && minute < 30)
    { timeSlot = '12:00 PM - 1:30 PM'
      if (num == 1)
      {
        chaughariya = "Kaal";
      }
      else if (num == 2)
      {
        chaughariya = "Udveg";
      }
      else if (num == 3)
      {
        chaughariya = "Amrit";
      }
      else if (num == 4)
      {
        chaughariya = "Rog";
      }
      else if (num == 5)
      {
        chaughariya = "Laabh";
      }
      else if (num == 6)
      {
        chaughariya = "Shubh";
      }
      else if (num == 7)
      {
        chaughariya = "Char";
      }
    }
    else if (hour == 14 || hour == 13 && minute >= 30)
    { timeSlot = '1:30 PM - 3:00 PM'

      if (num == 1)
      {
        chaughariya = "Shubh";
      }
      else if (num == 2)
      {
        chaughariya = "Char";
      }
      else if (num == 3)
      {
        chaughariya = "Kaal";
      }
      else if (num == 4)
      {
        chaughariya = "Udveg";
      }
      else if (num == 5)
      {
        chaughariya = "Amrit";
      }
      else if (num == 6)
      {
        chaughariya = "Rog";
      }
      else if (num == 7)
      {
        chaughariya = "Laabh";
      }
    }
    else if (hour != 15 && (hour != 16 || minute >= 30))
    {
      if (hour == 17 || hour == 16 && minute >= 30)
      { timeSlot = '4:30 PM - 6:00 PM'
        if (num == 1)
        {
          chaughariya = "Udveg";
        }
        else if (num == 2)
        {
          chaughariya = "Amrit";
        }
        else if (num == 3)
        {
          chaughariya = "Rog";
        }
        else if (num == 4)
        {
          chaughariya = "Laabh";
        }
        else if (num == 5)
        {
          chaughariya = "Shubh";
        }
        else if (num == 6)
        {
          chaughariya = "Char";
        }
        else if (num != 7)
        {
          chaughariya = "some error";
        }
        else
        {
          chaughariya = "Kaal";
        }
      }
    }
    else if (num == 1)
    {
      timeSlot = '3:00 PM - 4:30 PM'
      chaughariya = "Rog";
    }
    else if (num == 2)
    {timeSlot = '3:00 PM - 4:30 PM'
      chaughariya = "Laabh";
    }
    else if (num == 3)
    {
      timeSlot = '3:00 PM - 4:30 PM'
      chaughariya = "Shubh";
    }
    else if (num == 4)
    {timeSlot = '3:00 PM - 4:30 PM'
      chaughariya = "Char";
    }
    else if (num == 5)
    {timeSlot = '3:00 PM - 4:30 PM'
      chaughariya = "Kaal";
    }
    else if (num == 6)
    {timeSlot = '3:00 PM - 4:30 PM'
      chaughariya = "Udveg";
    }
    else if (num == 7)
    {timeSlot = '3:00 PM - 4:30 PM'
      chaughariya = "Amrit";
    }
    if(chaughariya=='Shubh'){
        boxColor = 'green'
       desc = 'Good'
       hindiName='शुभ '
       detail='Shubh Choghadiya is considered good to conduct ceremonies especially marriage ceremony.'
    }

    else if (chaughariya=='Laabh') {
       boxColor = 'green'
       desc = 'Gain'
       hindiName = 'लाभ '
       detail='Labh Choghadiya is considered most appropriate to start education and to acquire new skills.'
    }

    else if (chaughariya =='Amrit') {
      boxColor = '#558B2F'
      desc='Best'
      hindiName='अमृत '
      detail = 'Amrit Choghadiya is considered good for all type of works.'
    }
    else if (chaughariya=='Kaal') {
        boxColor = '#DD2C00',
        hindiName='काल '
        desc = 'Loss'
        detail='No auspicious work is done during Kala Choghadiya. However, Kaal Choghadiya is recommended for those activities which are performed to accumulate wealth.'
    }

    else if (chaughariya=='Rog') {
      boxColor = '#FF3D00'
      hindiName='रोग '
      desc ='Evil'
      detail = 'No auspicious work is done during Rog Choghadiya. However, Rog Choghadiya is recommended for war and to defeat the enemy.'
    }
    else if (chaughariya=='Udveg') {
        boxColor= '#E65100'
        desc = 'Bad'
        hindiName='उद्वेग '
        detail = 'No auspicious work is done during Udveg Choghadiya. However, for government related work Udveg Choghadiya is considered good.'
    }

    else if (chaughariya=='Char') {
      boxColor= '#FF8F00'
      desc = 'Neutral'
      hindiName='चार '
      detail = 'Char Choghadiya is considered most appropriate for travelling purpose.'
    }


  console.log("Chaughariya------------..>>" , chaughariya);
  this.setState({
    chaughariya,
    boxColor,
    desc,
    timeSlot,
    detail,
    hindiName
  })
}


// getSunrise(location){
//
//    let longitude = location.coords.longitude
//    let latitude =location.coords.latitude
//
//   return fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=4883f97ee2cd615cf8d3143a2c161419')
//  .then((response) => response.json())
//  .then((responseJson) => {
//    this.setState({
//      city : responseJson.name,
//      sunrise : responseJson.sys.sunrise,
//      sunset : responseJson.sys.sunset
//    })
//    console.log("Weather-------------------->", responseJson);
//        })
//    .catch((error) => {
//      console.error(error);
//    });
// }


preChaughadiya=()=>{
  let hour ;
  let minute;

  if(currentMinute>30){
    hour = currentHour -1;
    minute = currentMinute - 30;
  }

  else if (currentMinute<30) {
    hour = currentHour -2;
    minute = currentMinute + 30;
  }

  else if (currentMinute=30) {
    hour = currentHour -2;
    minute = 0;
  }
  console.log(hour, minute);
  if(hour<0){
    hour = hour+24
  }

    currentHour = hour,
    currentMinute = minute


  this.checkChaughariya()
}

nextChaughadiya=()=>{
  let hour ;
  let minute;
  if(currentMinute>30){
    console.log('currentHour', currentHour,currentMinute);
    hour = currentHour +2;
    minute = currentMinute - 30;
  }

  else if (currentMinute<30) {
    hour = currentHour +1;
    minute = currentMinute + 30;
  }

  else if (currentMinute=30) {
    hour = currentHour +2;
    minute = 0;
  }
  console.log("new time",hour, minute);
  if (hour >= 24) {
    hour = hour-24
  }

    currentHour = hour,
    currentMinute = minute


  this.checkChaughariya()
}

setCurrentTime=()=>{
  currentHour = date.getHours();
  currentMinute = date.getMinutes();
  this.checkChaughariya()
}

renderButton=()=>{
  if(currentHour!=date.getHours()){
    return(
      <Button block style={{backgroundColor:'#FF7043'}} onPress={()=> this.setCurrentTime()}>
        <Text style={{color:'#FFF8E1' , fontWeight:'bold'}}> View Current Choghadiya</Text>
      </Button>
    )
  }

  else {
    return null
  }
}

contactUs=()=>{

    Mailer.mail({
      subject: 'Auspicious Time Calculator Feedback',
      recipients: ['s.meghna.sharma@gmail.com'],
      ccRecipients: ['s.meghna.sharma@live.com'],
      isHTML: true,
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });

}


  render(){

    return(
      <Container style={{backgroundColor: '#FFF8E1'}}>
       <Header style={{backgroundColor:'#E64A19'}} androidStatusBarColor="#FF7043">
         <Left style={{flex:1}}>
         </Left>
          <Body style={{flex:2}}>
           <Text style = {styles.headingWhite}>Auspicious Time</Text>
          </Body>
          <Right style={{flex:1}}>
          <Menu>
           <MenuTrigger>
            <Icon name='md-more' style={{color : '#FAFAD2' , paddingRight:15 , paddingLeft:15}} />
           </MenuTrigger>
           <MenuOptions>
             <MenuOption onSelect={() => this.props.navigation.navigate('planYourDay')} >
               <Text style={{fontSize:16, padding:14}}>Choose Date</Text>
             </MenuOption>
             <MenuOption onSelect ={ ()=>this.props.navigation.navigate('aboutChaughadiya' , {from : 'About Chaughadiya'})}>
               <Text style={{fontSize:16, padding:14}}>About Choghadiya</Text>
             </MenuOption>
             <MenuOption onSelect={() =>this.props.navigation.navigate('aboutChaughadiya' , {from : 'About Us'})}>
               <Text style={{fontSize:16, padding:14}}>About Us</Text>
             </MenuOption>
             <MenuOption onSelect={() => this.contactUs()}>
               <Text style={{fontSize:16, padding:14}}>Feed Back</Text>
             </MenuOption>

           </MenuOptions>
          </Menu>
          </Right>
        </Header>
        <Content>
          <Banner/>
          <Card>

            <CardItem style = {{backgroundColor : this.state.boxColor , paddingTop:10,paddingBottom:0, justifyContent:'center' }} >
             <Text style ={styles.chaughariya}> {this.state.chaughariya} - {this.state.desc} </Text>
            </CardItem>

            <CardItem style = {{backgroundColor : this.state.boxColor , paddingRight:0,paddingLeft:10 , paddingTop:0, paddingBottom:0}}>
              <Grid>
                <Col>
                <TouchableOpacity onPress = {()=> this.preChaughadiya()}>
                  <Icon name='md-arrow-back' style={{color : '#FAFAD2'}}/>
                </TouchableOpacity>
                </Col>
                <Col style={{alignItems:'flex-end'}}>
                 <TouchableOpacity onPress = {()=> this.nextChaughadiya()}>
                  <Icon name='md-arrow-forward' style={{color : '#FAFAD2'}}/>
                </TouchableOpacity>
                </Col>
              </Grid>
            </CardItem>

            <CardItem style = {{backgroundColor : this.state.boxColor , padding:10, justifyContent:'center' }}>
              <Text style = {styles.time}> {this.state.timeSlot} </Text>
            </CardItem>

          </Card>
          {this.renderButton()}
          <Card style={{padding:30 , backgroundColor: '#FFF8E1'}}>
          <View style={{ alignItems:'center'}}>
            <Text style={{padding:10 , fontWeight:'bold' , fontSize:16}}>About {this.state.chaughariya}</Text>
            <Text style={{padding:7, textAlign:'center', fontStyle:'italic' ,textShadowColor:'grey', fontSize:20 , fontWeight:'bold', color: this.state.boxColor}}>{this.state.hindiName}</Text>
            <Text style={{padding:7, textAlign:'center', fontStyle:'italic' , lineHeight:30 , textShadowColor:'grey'}}>{this.state.detail}</Text>
          </View>
          </Card>

        </Content>
        <Button block style={{backgroundColor:'#FF7043'}} onPress={()=>this.props.navigation.navigate('planYourDay')}>
          <Text style={styles.textWhite}>Plan your day</Text>
        </Button>
      </Container>


    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAD2',
  },

  headingWhite: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color :'#FFF8E1'
  },
  textWhite: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color :'#FFF8E1'
  },
  time: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color :'#FFF8E1',
    paddingTop:0

  },

  chaughariya: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color :'#FFF8E1',
    paddingTop:20,
    paddingBottom:0
  },


});

const mainPageRoute = StackNavigator(
  {
    mainPage : {screen :  HomeScreen,},
    planYourDay : {screen : PlanYourDay,},
    aboutChaughadiya : {screen : AboutChaughadiya,},
  },
)



export default mainPageRoute;
//
