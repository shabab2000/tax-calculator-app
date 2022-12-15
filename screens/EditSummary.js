import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , StatusBar , ScrollView, ToastAndroid} from 'react-native'
import { Icon, Avatar, ListItem, Divider, CheckBox} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-datepicker'
import { RadioButton } from 'react-native-paper';
import RNModal from 'react-native-modal';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function EditSummary({ route,navigation }) {

    const [id, setId] = useState(route.params.id)
    const [list,setList] = useState(route.params.name);
    const [item,setItem] = useState(route.params.item);
    const [price,setPrice] = useState(route.params.price);
    const [loading,setLoading] = useState(false)

    const load = async () => {
        try {
            
    console.log('idc: '+uid);
            if(uid!== null) {
             setIdc(uid);
            }
        } catch (err) {
            console.log(err);
        }
    };

  const handlePress = async () => {
    try {
         if (!list) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกรายการ!');
          }else if (!item) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกจำนวนสินค้า!');
          }else if (!price) {
            Alert.alert('แจ้งเตือน!','กรุณากรอกจำนวนเงิน!');
          }else{
            setLoading(true)
            let idc = await AsyncStorage.getItem("idc");
        fetch('https://taxcalculator.ml/updatesummary.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

    name: list,
    item:item,
    price: price,
    id: id

    })
   
  }).then((response) => response.json()) 
        .then((responseJson) => {
            setLoading(false)
          if(responseJson === 'อัปเดตข้อมูลสำเร็จ')
          {
            ToastAndroid.show(responseJson,2000);
            navigation.replace('Billsummary',{id: idc})
            }
          else{
            Alert.alert('แจ้งเตือน!',responseJson);
          }
        }).catch((error) => {
          console.log(error);
        });

    }} catch (err) {
        console.log(err);
    }
}

const Delete = async () => {
  try {
    setLoading(true)
    let idc = await AsyncStorage.getItem("idc");
     fetch('https://taxcalculator.ml/deletesummary.php?id='+id)
.then((response) => response.json())
.then((json) => {
  setLoading(false)
  if(json === 'success')
          {
            ToastAndroid.show('ลบสำเร็จ',2000);
            navigation.replace('Billsummary',{id: idc})
            }
          else{
            Alert.alert('แจ้งเตือน!',json);
          }
})
.catch((error) => console.error(error))
} catch (err) {
    console.log(err);
}
}

useEffect(() => {

}, [])
    
    return (
        
        <View style={styles.container}>
        <ProgressDialog
    title="รอสักครู่"
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    message="กำลังโหลด..."
    visible={loading}
/>
<ScrollView showsVerticalScrollIndicator={false}>
              <View style={{paddingTop: 20}}></View>
             
             <View style={{padding:10 }}>
                    <View style={{ paddingVertical: 8 }}>
                        <Text style={{fontSize:20,textAlign: 'center',}}>รายการรายรับ</Text>
                    </View>
              </View>
                
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <View style={styles.hr}></View>
            </View>

  <View style={{ paddingHorizontal: 20}}>
              <Text style={styles.inputLabel}>รายการ</Text>
    <View style={styles.inputView}>
              <TextInput
                value={list}
                placeholder='กรุณากรอกรายการ'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='email-address'
                onChangeText={(list) => setList(list)}
              />
            </View>

              <Text style={styles.inputLabel}>จำนวนสินค้า</Text>
            <View style={styles.inputView}>
              <TextInput
                value={item}
                placeholder='กรุณากรอกจำนวนสินค้า'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='number-pad'
                onChangeText={(numberProduct) => setItem(numberProduct)}
              />
            </View>

              <Text style={styles.inputLabel}>จำนวนเงิน/หน่วย</Text>
            <View style={styles.inputView}>
              <TextInput
                value={price}
                placeholder='กรุณากรอกจำนวนเงิน/หน่วย'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='number-pad'
                onChangeText={(itemMoney) => setPrice(itemMoney)}
              />
            </View>
            </View>
   
            <View style={{paddingTop: 20}}></View>
             
            <View style={{paddingTop: 30}}></View>
                    
                    <View style={{flexDirection: 'row' , paddingHorizontal: 25}}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => Delete()}> 
            <Text style={styles.loginButtonText}>ลบ</Text>
            </TouchableOpacity>
            <View style={{paddingRight: 43}}></View>
            <TouchableOpacity style={styles.loginButton} onPress={() => handlePress()}> 
            <Text style={styles.loginButtonText}>อัปเดต</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
                 </View>
    )
}

const styles = StyleSheet.create({
    containerstatusbar: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor:'#D4D4D4',

    },
    goBackcontainer: {
      left: 15,
      top: 15,
    },
    goBackimage: {
      width: 30,
      height: 30,
    },
    hr: {
        width: '90%',
        height: 2,
        backgroundColor: '#444',
        marginTop: 6,
    },
    inputView: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#4B4B4B',
      borderRadius: 10,
      paddingHorizontal: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
  },
      inputLabel: {
        fontSize: 14,
        marginBottom: 6,
      },
      input: {
        width: '100%',
        height: 40,
        //backgroundColor: '#dfe4ea',
        borderRadius: 4,
        paddingHorizontal: 10,
        fontSize: 12
      },
      loginButton: {
          width: '45%',
        backgroundColor: '#004FFF',
        marginTop: 30,
        paddingVertical: 10,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      deleteButton: {
        width: '45%',
      backgroundColor: '#fb1111',
      marginTop: 30,
      paddingVertical: 10,
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
    },
    loginButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize:14,
        fontWeight: 'bold',
        color: '#000000',
    },
    modal: {
      backgroundColor: '#fff',
      borderRadius:8,
      paddingHorizontal:10,
      paddingVertical:10,
      shadowColor:'#000',
      shadowOffset:{
          width:0,
          height:2,
      },
      shadowOpacity:0.25,
      shadowRadius:3.84,
      elevation:5

  },
});