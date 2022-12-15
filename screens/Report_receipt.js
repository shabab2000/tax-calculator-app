import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , StatusBar , ScrollView, ToastAndroid, FlatList} from 'react-native'
import { Icon, Avatar, ListItem, Divider, CheckBox} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-datepicker'
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Report_receipt({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [data, setData] =useState('');
    const [date,setDate] = useState('');
    const [user, setUser] = useState('');

    const load = async () => {
      try {
          let uid = await AsyncStorage.getItem("uid");
          setUser(uid);
      } catch (err) {
          console.log(err);
      }
  };

    const handlePress = async () => {
        try {
            
            fetch('https://taxcalculator.ml/report_receipt.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
                setData(responseJson)
              
            }).catch((error) => {
              console.log(error);
            });
    
        } catch (err) {
            console.log(err);
        }
    }
useEffect(() => {
  load()
}, [])
console.log(data)
    return (
        <View style={styles.container}>
                <ProgressDialog
    title="รอสักครู่"
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    message="กำลังโหลด..."
    visible={loading}
/>
              <View style={{paddingTop: 20}}></View>
             
             <View style={{padding:10 }}>
                    <View style={{ paddingVertical: 8 }}>
                        <Text style={{fontSize:20,textAlign: 'center',}}>รายงานใบเสร็จรับเงิน</Text>
                    </View>
              </View>
                
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <View style={styles.hr}></View>
            </View>
                 
                    <View style={{ left: 30 ,backgroundColor: '#FFCC00' , width:'81%' , alignItems: 'center' }}>
                    <DatePicker
        style={{width: '100%'}}
        date={date}
        mode="date"
        placeholder="เลือกวันที่"
        //format="DD-MM-YYYY"
        //minDate="2016-05-01"
        maxDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            width:0,
            height:0,
            },
          placeholderText: {
            fontSize: 15,
            color: "#000"
            },
          dateInput: {
            paddingHorizontal:10,
            borderWidth: 0,
            alignItems: "flex-start",
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
            setDate(date)
            setLoading(true)
            fetch('https://taxcalculator.ml/report_receipt.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,
            uid: user
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
                setData(responseJson)
                setLoading(false)
              
            }).catch((error) => {
              console.log(error);
            });
        }}
      />
                    </View>
                    <View style={{paddingBottom: 10}}/>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingBottom: 10}}>
                    {data.length > 0 ? <FlatList 
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
              <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Detail_receipt',{img: item.img})}>
      <FontAwesome5 name="receipt" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>เล่มที่ {item.volume}  เลขที่ {item.no_id}</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
              }
              />:<Text style={{textAlign:'center'}} >ไม่มีข้อมูลใบเสร็จ</Text>}
              </View>
                    </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
