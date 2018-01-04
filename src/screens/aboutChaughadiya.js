import React , {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Linking} from 'react-native';
import {Card, CardItem , Button , Header , Left, Right , Body, Icon , Container, Content} from 'native-base';
import {StackNavigator} from 'react-navigation';
import { SocialIcon } from 'react-native-elements'
import {aboutChaughadiyaText } from '../constants'

class aboutChaughadiya extends Component{

  static navigationOptions = {
    header: null,
  }

  handleRender(){
    let from = this.props.navigation.state.params.from
    if(from == 'About Chaughadiya'){
      console.log('about chaughadias');
    return(
      <View style={{padding:15}}>
      <Text style={styles.text}>{aboutChaughadiyaText}</Text>
      </View>
    )
  }

  else if (from =='About Us') {
    return(
      <View style={{alignItems:'center', padding:20}}>
        <Text style={{fontSize:18 , fontWeight:'bold', padding:20 , color:'grey'}}>Version : <Text style={{color:'black'}}> 0.1</Text> </Text>
        <Text style ={{fontSize:18 , fontWeight:'bold', padding:20 , color:'grey'}}>Developed by - <Text style={{color:'black'}}> Meghna Sharma</Text></Text>
        <View style={{padding :30 , alignItems:'center'}}>
        <Text style={{fontWeight:'bold'}}>Social Media Profiles</Text>
        <SocialIcon
          type='linkedin'
          onPress={()=>Linking.openURL('http://linkedin.com/in/meghna-sharma-b4904312a')}
        />
        <SocialIcon
          type='youtube'
          onPress={()=>Linking.openURL('https://www.youtube.com/c/MeghnaSharma')}
        />
        </View>
      </View>

    )
  }

  else if (from =='Contact Us') {
    return(
      <Text style={styles.text}>Contact</Text>
    )
  }
}

  render(){

  return(
      <Container style={styles.container}>
      <Content>
      <Header style={{backgroundColor:'#E64A19'}} androidStatusBarColor="#FF7043">
      <Left>
          <Button transparent onPress={() => this.props.navigation.goBack(null)}>
            <Icon name='md-arrow-back' style={{color : '#FAFAD2'}}/>
          </Button>
        </Left>
         <Body>
         <Text style = {styles.headingWhite}>{this.props.navigation.state.params.from}</Text>
         </Body>

       </Header>
       <View style={{justifyContent:'center'}}>
        {this.handleRender()}
        </View>
      </Content>
      </Container>
    )
  }
}


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

  text : {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding:5
  }


});



const aboutChaughadiyaRoute = StackNavigator(
  {
    aboutChaughadiya : {screen :  aboutChaughadiya,},
  },
)

export default aboutChaughadiyaRoute;
