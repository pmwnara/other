
import React, { Component } from 'react';
import { StyleSheet, Modal,
   Text, View, Alert, TouchableHighlight, FlatList, Dimensions } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, ListItem } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import DatePicker from 'react-native-datepicker';
import { StackNavigator, } from 'react-navigation';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Mailer from 'react-native-mail';
import { timeDay, timeNight, days, month, morning, night, details } from '../constants';
import Banner from '../components/bannerAd';
//const morning = ["Udveg","Char","Laabh","Amrit", "Kaal","Shubh" , "Rog"]
var currentDay = (new Date().getDay())
var currentMonth = (new Date().getMonth())
class planDay extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      morning,
      night,
      currentDay : days[currentDay],
      currentMonth : month[currentMonth],
      date : "",
      displayDate : days[currentDay]+" "+new Date().getDate()+" "+ month[currentMonth]+" "+new Date().getFullYear(),
      modalVisiblity: false
    }

  }

  componentDidMount(){
console.log(this.state.date);
  this.checkDate()
  }


  static navigationOptions = {
    header: null,
  }

  nextDay=()=>{
    this.setState({
      currentDay : days[currentDay+1],
      displayDate : ""
    })
    this.checkDate()
  }

  checkDate(){
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



  render() {
    console.log("CHECK oBJECT", this.state.night[0].cha);
    return (
      <Container style={styles.container}>
       <Content>
        <Header style={{backgroundColor : '#E64A19'}} androidStatusBarColor="#FF7043">
        <Left style={{flex:1}}>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='md-arrow-back' style={{color : '#FAFAD2'}}/>
            </Button>
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
        <View style={{backgroundColor : '#FF7043'}}>
        <Banner/>
        </View>
        <View style={{backgroundColor : '#FF7043'}}>
        <Grid>
        <Col size={70}>
          <Text style={styles.textWhite}>{this.state.displayDate}</Text>
        </Col>
        <Col size={30}>
          <DatePicker
             style={{width: 200}}
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

           </Grid>

        </View>
        <View style={{padding:15 , alignItems : 'center'}} >
          <Grid>
            <Icon name = 'md-sunny' style={{color: 'orange', paddingTop : 5}} />
            <Text style={styles.heading}>Day Choghadiya</Text>
          </Grid>
        </View>
        <Grid>
        <Col>
        <FlatList
          extraData = {this.state}
          data = {this.state.morning}
          renderItem={({ item }) => (
            <ListItem style ={styles.listItem} onPress={()=>this.setState({modalVisiblity: true})}>
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
          <Text style={styles.heading}>Night Choghadiya</Text>
        </Grid>
      </View>
      <Grid>
      <Col>
      <FlatList
        extraData = {this.state}
        data = {this.state.night}
        renderItem={({ item }) =>(
          <ListItem style ={styles.listItem} onPress={()=>this.setState({modalVisiblity: true})}>
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
          onRequestClose = {() => this.setState({modalVisiblity : false}) }>

          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(238,238,238,0.8)'
          }}>
            <View style={{
              width:(Dimensions.get('window').width),
              height: 500,
              padding:15,
              backgroundColor: '#DCDCDC',
            }}>

            <View style={{alignItems:'flex-end', padding:7 }}>
              <TouchableHighlight onPress={ ()=> this.setState({modalVisiblity:false})}>
                <Icon name='close'/>
              </TouchableHighlight>
              </View>
              <FlatList
                data = {details}
                renderItem={({ item }) => (
                  <View style ={{justifyContent:'center' , alignItems:'center' , backgroundColor:'#FFF8E1' , padding:10}}>
                   <Text style={{padding:8, fontWeight:'bold'}}>{item.name}</Text>
                   <Text style={{textAlign:'center'}}>{item.detail}</Text>
                  </View>
                )}
               keyExtractor={item => item.name}
             />

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
    backgroundColor: '#FFF8E1',
  },

  listItem:{
    justifyContent:'center',
    marginLeft : 0,
    backgroundColor: '#FFF8E1',

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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color :'#8B0000',
    padding : 7
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
    textAlign: 'right',
    margin: 10,
    paddingRight : 0,
    marginLeft: 0,
    color :'#FFF8E1'
  },
  time: {
    textAlign: 'center',
    color :'#8B0000',
    fontSize: 20,
    padding : 10
  },
});


const planDayRoute = StackNavigator(
  {
    planDay : {screen : planDay,},
  },
  {
    headerMode : 'screen',
  }
)

export default planDayRoute;
