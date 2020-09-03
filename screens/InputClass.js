import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Button,ScrollView , TextInput , Alert} from 'react-native';
import db from '../config';


export default class InputScreen extends React.Component{
  constructor(){
    super()
    this.state={
      text:"",
      allSutdents:[],
      date:'',
      time:"",
    }
  }
  componentDidMount=()=>{
    var tsa = db.ref('/').on('value',(data)=>{
      let class_a = data.val();
      var tss = [class_a];
      var tsa = this.state.text;
      this.setState({
        allSutdents:tss
      })
      if(class_a.includes === tsa){
      console.log(tsa);
      }
      else{
        console.log(class_a);
      }
    })

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours(); 
    var min = today.getMinutes();
    today = dd + '-' + mm + '-' + yyyy + '-' + hh;
    var time = hh + " : " + min ;
    this.setState({date:today , time:time});
  
  }
  render(){
    return(
      <View style={styles.container}>
                <Text style={{textAlign:"center"}}> Date : {this.state.date}</Text>
                <Text style={{textAlign:"center"}}> Time : {this.state.time}</Text>

        <View style={styles.op}>
              <Text style={styles.ttext}>
                Enter your class (eg 8o )  :
              </Text>
            <TextInput
                onChangeText={cs => {
                  var text  = cs.toLowerCase().trim();
                  this.setState({ text: text });
                  console.log(text);   

                }}
                style={styles.ti}
                value={this.state.text}
              />
              </View>
              <TouchableOpacity  style={styles.buttn} onPress={() => {
                var class1 = ['1e','1o','1n','1s','2e','2o','2n','2s','3e','3o','3n','3s','4e','4o','4n','4s','4t','5e','5o','5n','5s','5t','6e','6o','6n','6s','6t','7e','7o','7n','7s','7t','8e','8o','8n','8s','8t','9e','9o','9n','9s','9t','10e','10o','10n','10s','10t','11e','110','11n','11s','12e','12o','12n','12s'];
                var tunni = this.state.text;
                class1.includes(tunni)?(
                  this.props.navigation.navigate('HomeScreen',{cs:this.state.text  })

                ):(
                    Alert.alert("This class does not exist in our database"))
              }}><Text style={styles.toto}>Get Attendance</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1
  },
  op:{
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'flex-end', 
    alignSelf:"center" 
  },
  ti:{
    marginLeft: 20,
    width: '30%',
    alignSelf: 'center',
    height: 26,
    textAlign: 'center',
    borderWidth: 4,
    marginTop:10

  },
  ttext:{
    marginLeft:20,
    color:"red",
  },
  buttn:{
    width:'35%',
    alignSelf:"center",
    backgroundColor:"red",
    alignContent:"center",
    alignItems:"center",
    marginTop:10,
    height:26,
  },
  toto:{
    marginTop:5,
   color:"white",
    height:26

  }
})