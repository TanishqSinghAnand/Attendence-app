import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Button,ScrollView , TextInput} from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
      text : "",
      date:"",
      time:"",
    };
  }
    componentDidMount = async() => {
    var class_ref =await db.ref('/'+this.props.navigation.getParam('cs') + '/').on('value', data => {
      var all_students =  []
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours(); 
    var min = today.getMinutes();
    today = dd + '-' + mm + '-' + yyyy + '-' + hh;
    var time = hh + " : " + min ;
    this.setState({date:today , time:time});
  };

  /*getStudentData= () => {
    console.log("jhjhj" + this.props.navigation.getParam('cs'));
    var class_ref =db.ref('/'+this.props.navigation.getParam('cs') + '/').on('value', data => {
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (roll_no1, roll_no2) {
        return roll_no1.roll_no - roll_no2.roll_no;
      });
      this.setState({ all_students: all_students });
      console.log(all_students);
    });
  };*/

  updateAttendence(roll_no, status) {
    var id = '';
      id = roll_no;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours(); 
    today = dd + '-' + mm + '-' + yyyy + '-' + hh;
    var class_ref = db.ref(this.props.navigation.getParam('cs') +'/' + id);
    class_ref.update({
      [today]: status,
    });
  }


 

  
  goToSummary = (()=>{
    var text = this.props.navigation.getParam('cs');
    this.props.navigation.navigate('SummaryScreen' , {cm:text});
  })


  render(){
  var all_students = this.state.all_students;

   return (
     
     <ScrollView>
        <View style={styles.container}>
        <Text style={{textAlign:"center"}}> Date : {this.state.date}</Text>
        <Text style={{textAlign:"center"}}> Time : {this.state.time}</Text>

          
          <View style={{ flex: 3 }}>
            {all_students.map((student, index) => (
              <View key={index} style={styles.studentChartContainer}>
                  <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold',marginRight: 10 }}>
                    {student.roll_no}.
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight:'bold' }}>{student.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: 'green' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text>Present</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: 'red' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                var text = this.props.navigation.getParam('cs');
                this.props.navigation.navigate('SummaryScreen' , {cm:text});              }}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
          
        </View>
        </ScrollView>
      );

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 4,
  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    marginTop:10,  
  },
});
