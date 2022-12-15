import React, { useState } from 'react'
import { ScrollViewBase } from 'react-native';
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , StatusBar , ScrollView} from 'react-native'
import { Icon, Avatar, ListItem, Divider } from "react-native-elements";
import { Appbar,Badge } from 'react-native-paper';

export default function Store({navigation}) {

    const[ operatorname,setOperAtorName ] = useState('');
    const[ idcard,setIdCard ] = useState('');
    const[ workplace,setWorkplace ] = useState('');
    const[ taxno,setTaxNo ] = useState('');



    // const handlePress = async () => {
    //     try {
    //         if (!operatorname) {
    //             Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อผู้ประกอบการ!');
    //           }else if (!idcard) {
    //             Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประจำตัวประชาชน!');
    //           }else if (!workplace) {
    //             Alert.alert('แจ้งเตือน!','กรุณากรอกสถานที่ประกอบการ!');
    //           }else if (!taxno) {
    //             Alert.alert('แจ้งเตือน!','กรุณากรอกเลขผู้เสียภาษี!');
    //           }else{
                
    //         fetch('https://taxcalculator.tk/Store.php', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({

    //     operatorname: operatorname,
    //     idcard: idcard,
    //     workplace: workplace,
    //     taxno: taxno,

    //     })
       
    //   }).then((response) => response.json()) 
    //         .then((responseJson) => {
      
    //           if(responseJson === 'เข้าสู่เมนูรายรับ-รายจ่ายสำเร็จ')
    //           {
    //             Alert.alert('แจ้งเตือน!',responseJson);
    //                 navigation.replace('MenuStore');
            
    //             //AsyncStorage.setItem("Email", email);
    //             }
              
    //           else{
    //             Alert.alert('แจ้งเตือน!',responseJson);
    //           }
    //   // Showing response message coming from server after inserting records.
    //    //       Alert.alert(responseJson);
    //          // navigation.navigate('Profile');
    //         }).catch((error) => {
    //           console.log(error);
    //         });

    //     }} catch (err) {
    //         console.log(err);
    //     }
    // }
      
    return (
        
        <View style={styles.container}>
             <Image source={require('../src/assets/register.png')} style={{position: 'absolute',width: '100%',height: '100%'}}/>      

              <View style={{paddingTop: 80}}></View>
             <ScrollView>
            <Text style={{textAlign:'center',fontSize:25, color:'#fff', paddingTop: 15}}>
                กรอกข้อมูลผู้ประกอบการ
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <View style={styles.hr}></View>
            </View>

            <View style={{paddingHorizontal: 40}}>
              
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>ชื่อผู้ประกอบการ</Text>
              <TextInput
                placeholder='กรุณากรอกชื่อผู้ประกอบการ'
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(operatorname) => setOperAtorName(operatorname)}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>เลขบัตรประจำตัวประชาชน</Text>
              <TextInput
                placeholder='กรุณากรอกเลขบัตรประจำตัวประชาชน'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='number-pad'
                textContentType='creditCardNumber'
                onChangeText={(idcard) => setIdCard(idcard)}
              />
            </View>
            
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>สถานที่ประกอบการ</Text>
              <TextInput
                placeholder='กรุณากรอกสถานที่ประกอบการ'
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(workplace) => setWorkplace(workplace)}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>เลขผู้เสียภาษี</Text>
              <TextInput
                placeholder='กรุณากรอกเลขผู้เสียภาษี'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='number-pad'
                onChangeText={(taxno) => setTaxNo(taxno)}
              />
            </View>


           
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('MenuStore')}>
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
        height: 40,
        backgroundColor: '#dfe4ea',
        borderRadius: 4,
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
      },
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#dfe4ea',
        borderRadius: 4,
        paddingHorizontal: 10,
        fontSize: 12
      },
    loginButton: {
        backgroundColor: '#5AA347',
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
        color: '#fff',
    },
})
