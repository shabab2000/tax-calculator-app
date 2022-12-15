import React, { useState } from 'react'
import { ScrollViewBase } from 'react-native';
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , StatusBar , ScrollView, ToastAndroid} from 'react-native'
import { Icon, Avatar, ListItem, Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Customer({navigation}) {

    const[ operatorname,setOperatorname ] = useState('');
    const[ idcard,setIdcard ] = useState('');
    const[ workplace,setWorkplace ] = useState('');
    const[ taxno,setTaxno ] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        try {
          let uid = await AsyncStorage.getItem("uid");
            if (!operatorname) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อลูกค้า!');
              }else if (!workplace) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกที่อยู่ของลูกค้า!');
              }else if (idcard.length !==13) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประจำตัวประชาชน 13หลัก!');
              }else{
                setLoading(true)
            fetch('https://taxcalculator.ml/customer.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        operatorname: operatorname,
        idcard: idcard,
        workplace: workplace,
        taxno: taxno,
        uid: uid,

        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
              setLoading(false);
              if(responseJson.result === 'บันทึกข้อมูลสำเร็จ')
              {
                ToastAndroid.show(responseJson.result,2000);
                 setOperatorname('')
                 setWorkplace('')
                 setTaxno('')
                 setIdcard('')
                 AsyncStorage.setItem('idc',responseJson.id);
                 navigation.navigate('Wishlist')
              }else{
                Alert.alert('แจ้งเตือน!',responseJson);
              }
            }).catch((error) => {
              Alert.alert(error)
            });
        }} catch (err) {
            Alert.alert(err)
        }
    }
      
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
             <ScrollView>
            <Text style={{textAlign:'center',fontSize:34, color:'#000', paddingTop: 50}}>
                กรอกข้อมูลลูกค้า
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <View style={styles.hr}></View>
            </View>

            <View style={{paddingHorizontal: 40}}>
              
              <Text style={styles.inputLabel}>ชื่อลูกค้า</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกชื่อลูกค้า'
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(operatorname) => setOperatorname(operatorname)}
              />
            </View>


              <Text style={styles.inputLabel}>ที่อยู่ของลูกค้า</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกที่อยู่ของลูกค้า'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='numbers-and-punctuation'
                textContentType='creditCardNumber'
                onChangeText={(workplace) => setWorkplace(workplace)}
              />
            </View>

            
              <Text style={styles.inputLabel}>เลขที่ผู้เสียภาษี</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกเลขที่ผู้เสียภาษี'
                style={styles.input}
                autoCapitalize="none"
                maxLength={13}
                keyboardType='number-pad'
                onChangeText={(taxid) => setTaxno(taxid)}
              />
            </View>

              <Text style={styles.inputLabel}>เลขบัตรประจำตัวประชาชน</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกเลขบัตรประจำตัวประชาชน'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='number-pad'
                maxLength={13}
                onChangeText={(idcard) => setIdcard(idcard)}
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={() => handlePress()}> 
            <Text style={styles.loginButtonText}>บันทึก</Text>
            </TouchableOpacity>

            {/* <Image source={require('./img/bottom.png')} style={{width: '100%', height: '20%'}}/> */}
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
        backgroundColor:'#f8f7fd',
        justifyContent: 'center'
    },
    goBackcontainer: {
      left: 15,
      top: 15,
    },
    goBackimage: {
      width: 30,
      height: 30,
    },
    textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
    },
    textLogin: {
        textAlign: 'center',
        color:'#FFFFFF',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
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
    inputBox: {
        marginTop: 10,
      },
      inputLabel: {
        fontSize: 14,
        marginBottom: 6,
        paddingTop: 5,
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
        backgroundColor: '#ffcc00',
        marginTop: 30,
        paddingVertical: 10,
        borderRadius: 25,
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
        fontSize:18,
    },
})
