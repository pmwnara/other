
import React, { Component } from 'react';
import { Platform, AsyncStorage, StyleSheet, Modal, ListView, KeyboardAvoidingView,
   Text, View, Image,Alert, ScrollView, TouchableHighlight, FlatList} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title, Card,
   CardItem, H1, H2, H3, Form, Item, Input, Label, ListItem, Thumbnail} from 'native-base';
import { Dimensions } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import planDay from './PlanYourDay';
import DatePicker from 'react-native-datepicker';
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'





const timeDay = ["6:00-7:30 AM" , "7:30-9:00 AM", "9:00-10:30 AM","10:30-12:00 PM" , "12:00-1:30 PM", "1:30-3:00 PM" , "3:00-4:30 PM", "4:30-6:00 PM"]
const timeNight = ["6:00-7:30 PM" , "7:30-9:00 PM", "9:00-10:30 PM","10:30-12:00 AM" , "12:00-1:30 AM", "1:30-3:00 AM" , "3:00-4:30 AM", "4:30-6:00 AM"]


var days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
var month = ['Jan', 'Feb' , 'Mar', 'Apr' , 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var currentDay = (new Date().getDay())
var currentMonth = (new Date().getMonth())

var morning = [{'cha': "Udyoog" , 'color' : 'grey'},{'cha' : "Char", 'color' : 'grey'},{'cha' :"Laabh" , 'color' : 'green'},
{ 'cha' :"Amrit" , 'color' : 'green'}, {'cha':"Kaal" , 'color' : 'red'},{'cha':"Shubh" , 'color' : 'green'} ,
 {'cha':"Rog" , 'color' : 'red'}];


var night = [{'cha':"Shubh" , 'color' : 'green'}, { 'cha' :"Amrit" , 'color' : 'green'},{'cha' : "Char", 'color' : 'grey'},
{'cha':"Rog" , 'color' : 'red'},{'cha':"Kaal" , 'color' : 'red'},{'cha' :"Laabh" , 'color' : 'green'},
{'cha': "Udyoog" , 'color' : 'grey'}];

class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      morning : morning,
      night : night,
      hour : "",
      minute : "",
      chaughariya : "",
      currentDay : days[currentDay],
      currentMonth : month[currentMonth],
      date : "",
      displayDate : days[currentDay]+" "+new Date().getDate()+" "+ month[currentMonth]+" "+new Date().getFullYear(),
      boxColor:'white',
      image : require('./assets/happy.png'),
      color : 'white',
      desc : '',
      timeSlot : "",
      modalVisiblity: false
    }

  }

  componentDidMount(){
    this.checkChaughariya()
    this.checkDate()

    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
   AdMobInterstitial.setAdUnitID('ca-app-pub-4893744760365554/3683396312');

   AdMobInterstitial.addEventListener('adLoaded',
     () => console.log('AdMobInterstitial adLoaded')
   );
   AdMobInterstitial.addEventListener('adFailedToLoad',
     (error) => console.warn(error)
   );
   AdMobInterstitial.addEventListener('adOpened',
     () => console.log('AdMobInterstitial => adOpened')
   );
   AdMobInterstitial.addEventListener('adClosed',
     () => {
       console.log('AdMobInterstitial => adClosed');
       AdMobInterstitial.requestAd().catch(error => console.warn(error));
     }
   );
   AdMobInterstitial.addEventListener('adLeftApplication',
     () => console.log('AdMobInterstitial => adLeftApplication')
   );

   AdMobInterstitial.requestAd().catch(error => console.warn(error));

    setInterval(() => {
      this.checkChaughariya()
      this.showAd()
  }, 60000);
  }


  showAd=()=>{
     AdMobInterstitial.showAd()
  }


    checkDate(){
      console.log("Check Data method called");
      let currentDay = this.state.currentDay
      console.log(currentDay);
      let m = []
      let n = []
      if(currentDay == 'Sun'){
        //do nothing
        m = morning
        n=night
      }
      else if(currentDay == 'Mon'){
        m = [morning[3], morning[4] , morning[5], morning[6], morning[0], morning[1], morning[2]]
        n = [night[2], night[3] , night[4], night[5], night[6], night[0], night[1]]
      }

      else if (currentDay == 'Tue') {
        m = [morning[6], morning[0] , morning[1], morning[2], morning[3], morning[4], morning[5]]
        n = [night[4], night[5] , night[6], night[0], night[1], night[2], night[3]]

      }
      else if (currentDay == 'Wed') {
        m = [morning[2], morning[3] , morning[4], morning[5], morning[6], morning[0], morning[1]]
        n = [night[6], night[0] , night[1], night[2], night[3], night[4], night[5]]
      }
      else if (currentDay == 'Thu') {
        m = [morning[5], morning[6] , morning[0], morning[1], morning[2], morning[3], morning[4]]
        n = [night[1], night[2] , night[3], night[4], night[5], night[6], night[0]]
      }
      else if (currentDay == 'Fri') {
        m = [morning[1], morning[2] , morning[3], morning[4], morning[5], morning[6], morning[0]]
        n = [night[3], night[4] , night[5], night[6], night[0], night[1], night[2]]
      }
      else if (currentDay == 'Sat') {
        m = [morning[4], morning[5] , morning[6], morning[0], morning[1], morning[2], morning[3]]
        n = [night[5], night[6], night[0], night[1],night[2], night[3] , night[4]]
      }
      else{
        console.log("DOESNT MATCJ");
      }

      this.setState({
        morning : m,
        night : n
      })
    }

    dateChange(date){
      let x = date.slice(0,3)
      console.log(x);
      this.setState({
        displayDate : date,
        currentDay : x
      })
      this.checkDate()
    }


  checkChaughariya(){
    let current = new Date();
    let num = (current.getDay()) +1 ;
    let hour = current.getHours();
    let minute = current.getMinutes();
    var chaughariya;
    var boxColor;
    var image;
    var imageColor;
    var desc;
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
			{  timeSlot = '3:00 AM - 4:30 AM'
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
					chaughariya = "Udyoog";
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
						chaughariya = "Udyoog";
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
				chaughariya = "Udyoog";
			}
			else if (num == 7)
			{timeSlot = '3:00 PM - 4:30 PM'
				chaughariya = "Amrit";
			}
      if(chaughariya=='Shubh'|| chaughariya=='Amrit' || chaughariya=='Laabh'){
          boxColor = 'green'
          imageColor = 'green'
          image = require('./assets/happy.png')
         desc = 'Best'
      }
      else if (chaughariya=='Rog'||chaughariya=='Kaal') {
          boxColor = '#D13438',
          imageColor = 'red'
          image = require('./assets/bad.png')
          desc = 'Bad'
      }
      else if (chaughariya=='Udyoog'||chaughariya=='Char') {
          boxColor= '#FF8C00'
          imageColor = '#FF8C00'
          image = require('./assets/smiley_neutral-512.png')
          desc = 'Neutral'
      }

    console.log("Chaughariya------------..>>" , chaughariya);
    this.setState({
      chaughariya : chaughariya,
      boxColor : boxColor,
      color : imageColor,
      image : image,
      desc : desc,
      timeSlot : timeSlot,
    })
  }

  static navigationOptions = {
    header: null,
  }

  showInfo=()=>{
    console.log('method called');
    this.setState({
      modalVisiblity : !(this.state.modalVisiblity)
    })
  }



  render() {
    console.log("BOX COLOR", this.state.boxColor, this.state.chaughariya);
    console.log("CHECK oBJECT", this.state.night[0].cha);

    return (
      <Container style={styles.container}>
       <Content>
        <Header style={{backgroundColor : '#761721'}}>
        <Left/>
        <Body>
            <Text style ={styles.headingWhite}>Chaughariya</Text>
        </Body>
        <Right>
          <Menu>
           <MenuTrigger>
           <Icon name='md-menu' style={{color : '#FAFAD2'}} />
           </MenuTrigger>
           <MenuOptions>
             <MenuOption onSelect={() => alert(`About Chaughariya`)} text='About Chaughariya' />
             <MenuOption onSelect={() => alert(`About Us`)} >
               <Text style={{color: 'red'}}>About Us</Text>
             </MenuOption>
             <MenuOption onSelect={() => alert(`Contact us`)}  text='Contact Us' />
           </MenuOptions>
         </Menu>
        </Right>
        </Header>
        <View>
        <TouchableHighlight onPress={()=> this.showInfo()}>
          <View style = {{backgroundColor : this.state.boxColor , padding:5 }}>
            <Text style ={styles.headingWhite}> {this.state.chaughariya} - {this.state.desc} </Text>
            <Text style = {styles.textWhite}> {this.state.timeSlot} </Text>
          </View>
          </TouchableHighlight>
        </View>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-4893744760365554/7526438406"
          testDeviceID="EMULATOR"
          adViewDidReceiveAd={null}
          didFailToReceiveAdWithError={this.bannerError} />
        <View style={{backgroundColor : '#761721'}}>
        <Grid>
        <Button transparent>
          <Icon name='ios-arrow-back' style={{color : '#FAFAD2'}}/>
        </Button>
        <Col size={75}>
          <Text style={styles.textWhite}>{this.state.displayDate}</Text>
        </Col>
        <Col size={25}>
          <DatePicker
             style={{width: 200 }}
             date={this.state.date}
             mode="date"
             format="ddd  DD MMM YYYY"
             confirmBtnText="Confirm"
             cancelBtnText="Cancel"
             hideText = {true}
             customStyles={{
               dateIcon: {
                 position: 'absolute',
                 left: 0,
                 top: 8,
                 marginLeft: 0
               },
               dateInput: {
                 marginLeft: 36
               }
               // ... You can check the source to find the other keys.
             }}
             onDateChange={(date) => {this.dateChange(date)}}
           />
           </Col>
           <Button transparent>
             <Icon name='ios-arrow-forward' style={{color : '#FAFAD2'}}/>
           </Button>
           </Grid>

        </View>

        <View style={{padding:15 , alignItems : 'center'}} >
          <Grid>
            <Icon name = 'md-sunny' style={{color: 'orange', paddingTop : 5}} />
            <Text style={styles.heading}>Day Chaughadiya</Text>
          </Grid>
        </View>
        <Grid>
        <Col>
        <FlatList
          extraData = {this.state}
          data = {this.state.morning}
          renderItem={({ item }) => (
            <ListItem style ={styles.listItem}>
             <Text style ={{color : item.color , fontWeight : 'bold'}}>{item.cha}</Text>
            </ListItem>
          )}
         keyExtractor={item => item.cha}
       />
       <ListItem style ={styles.listItem}>
       <Text style ={{color : this.state.morning[0].color , fontWeight : 'bold'}}>{this.state.morning[0].cha}</Text>
       </ListItem>
       </Col>
       <Col>
       <FlatList
         data = {timeDay}
         renderItem={({ item }) => (
           <ListItem style ={styles.listItem}>
            <Text>{item}</Text>
           </ListItem>
         )}
        keyExtractor={item => item}
      />
      </Col>
      </Grid>
      <View style={{padding:15 , alignItems : 'center'}} >
        <Grid>
          <Icon name = 'md-moon' style={{color: 'grey' ,paddingTop : 5}} />
          <Text style={styles.heading}>Night Chaughadiya</Text>
        </Grid>
      </View>
      <Grid>
      <Col>
      <FlatList
        extraData = {this.state}
        data = {this.state.night}
        renderItem={({ item }) =>(
          <ListItem style ={styles.listItem}>
           <Text style ={{color : item.color , fontWeight : 'bold'}}>{item.cha}</Text>
          </ListItem>
        )}
       keyExtractor={item => item.cha}
     />
     <ListItem style ={styles.listItem}>
     <Text style ={{color : this.state.night[0].color , fontWeight : 'bold'}}>{this.state.night[0].cha}</Text>
     </ListItem>
     </Col>
     <Col>
     <FlatList
       data = {timeNight}
       renderItem={({ item }) => (
         <ListItem style ={styles.listItem}>
          <Text>{item}</Text>
         </ListItem>
       )}
      keyExtractor={item => item}
    />
    </Col>
    </Grid>

    <Modal animationType = {"slide"} transparent = {true}
          visible = {this.state.modalVisiblity}
          onRequestClose = {() => { console.log("Modal has been closed.") } }>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(238,238,238,0.8)'
          }}>
            <View style={{
              width:(Dimensions.get('window').width),
              height: 300,
              padding:15,
              backgroundColor: '#FAFAD2',
            }}>

            <View style={{alignItems:'flex-end'}}>
              <TouchableHighlight onPress={ ()=> {this.showInfo()}}>
                <Icon name='close' />
              </TouchableHighlight>
            </View>
              <ScrollView>
                <View  style={{alignItems:'center'}}>
              <Text>ABOUT - {this.state.chaughariya}</Text>
                </View>
              </ScrollView>
           </View>
         </View>
       </Modal>


       </Content>
      </Container>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAD2',
  },
  centerContent: {
    backgroundColor: "red",
    borderRadius : 50,
    height:100,
    width:100,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color :'#8B0000'
  },
  headingWhite: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color :'#FAFAD2'
  },
  textWhite: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color :'#FAFAD2'
  },
  time: {
    textAlign: 'center',
    color :'#8B0000',
    fontSize: 20,
    padding : 10
  },

  listItem:{
    justifyContent:'center',
    marginLeft : 0,
    backgroundColor: '#FAFAD2',

  },
});


const mainPageRoute = StackNavigator(
  {
    mainPage : {screen :  App,},
    planDay : {screen : planDay,},
  },
  {
    headerMode : 'screen',
  }
)

export default mainPageRoute;
//
// <View style ={{alignItems : 'center', justifyContent: 'center', padding:10}}>
//   <View style = {{backgroundColor: this.state.color,
//   borderRadius : 60,
//   height:120,
//   width:120,
//   flex:1,
//   justifyContent: 'center',
//   alignItems: 'center',}}>
//     <Image source = {this.state.image} style={{height : 120 , width : 120 , resizeMode : 'cover'}}/>
//   </View>
// </View>
