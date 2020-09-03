import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import db from '../config';


class SummaryScreen extends React.Component{
 constructor() {
    super();
    this.state = {
      present_students: [],
      absent_students: [],
      text:"",
      date : "",
      time:"",
    };
  }

  getTodaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours(); 
    today = dd + '-' + mm + '-' + yyyy + '-' + hh;
    this.setState({date:today});
    return today
  }

  componentDidMount = () => {
    var today =  this.getTodaysDate();
    var refi = this.props.navigation.getParam('cm') ;

    var students_ref = db.ref('/' + refi + '/').on('value',(data)=>{
      var class_a = data.val();
      var present_students = []
      var absent_students = []

      for(var i in class_a){
        if(class_a[i][today] === 'present'){
          present_students.push(class_a[i])
        }
        if(class_a[i][today] === 'absent'){
          absent_students.push(class_a[i])
        }
      }

      present_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
  
      absent_students.sort(function(a, b) {
        return a.roll_no - b.roll_no;
      });
      var today0 = new Date();
      var hh = today0.getHours(); 
      var min = today0.getMinutes();
      var time0 = hh + " : " + min ;

      this.setState({
        present_students : present_students,
        absent_students : absent_students,
        time:time0
      })
      console.log(class_a);
    })
  };

  render() {
    console.log(this.state.present_students);
    return (
      <View style={{ flex: 1 }}>
        <Text style={{textAlign:"center"}}>Date : {this.state.date}</Text>
        <View style={{ flex: 0.1 }}>
          
        </View>
        <Text style={styles.title}>Present Students List</Text>
        <View style={styles.presentContainer}>
          {
            this.state.present_students.map((student, index)=>(
                <Text style={{fontSize:18}}>{student.name}</Text>
              )
            )
          }
        </View>
        <Text style={styles.title}>Absent Students List</Text>

        <View style={styles.absentContainer}>
          {
            this.state.absent_students.map((student, index)=>(
                <Text style={{fontSize:18}}>{student.name}</Text>
              )
            )
          }
        </View>
        <View style={{flex:0.1, flexDirection:'row', justifyContent:'space-around'}}>
          <Text>Present: {this.state.present_students.length}</Text>
          <Text>Absent: {this.state.absent_students.length}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  presentContainer: {
  
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
  },
  absentContainer :{
    
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
  },
  title:{
    fontSize:20, 
    fontWeight:'bold',
    alignSelf:'center', 
    marginTop:40
  }

});


export default SummaryScreen;