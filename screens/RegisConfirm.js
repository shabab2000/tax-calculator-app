import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , ScrollView} from 'react-native'
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function RegisConfirm({route,navigation}) {
    
    const [loading, setLoading] = useState(false);
    const[name, setName] = useState('');
    const[ idcard,setIdCard ] = useState('');
    const[ local ,setLocal ] = useState('');
    const[idtax ,setIdTax] = useState('');
    const[tel, setTel] = useState('');

    const handlePress = async () => {
        try {
            if (!name) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อร้านผู้ประกอบการ!');
              }else if (!tel) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์!');
              }else if (!idcard) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชน!');
              }else if (idcard.length!==13) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชนให้ครบ 13หลัก!');
              }else if (!local) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกที่อยู่ผู้ประกอบการ!');
              }else if (idtax.length!==13) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขผู้เสียภาษีให้ครบ 13 หลัก!');
              }else if (!tel) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์!');
              }else if (tel.length!==10) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10หลัก!');
              }else{
                setLoading(true)
            fetch('https://taxcalculator.ml/register.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
        email: route.params.email,
        username: route.params.username,
        password: route.params.password,
        name: name,
        idcard: idcard,
        local: local,
        taxid:idtax,
        tel: tel

        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
              setLoading(false)
              if(responseJson === 'สมัครสมาชิกสำเร็จ')
              {
                Alert.alert('แจ้งเตือน!',responseJson);
                    navigation.replace('Login');
            
                //AsyncStorage.setItem("Email", email);
                }
              
              else{
                Alert.alert('แจ้งเตือน!',responseJson);
              }
      // Showing response message coming from server after inserting records.
       //       Alert.alert(responseJson);
             // navigation.navigate('Profile');
            }).catch((error) => {
              console.log(error);
            });

        }} catch (err) {
            console.log(err);
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
             <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <Text style={{fontSize: 20,paddingTop:20}}>ข้อมูลผู้ประกอบการ</Text>
            <View style={styles.hr}></View>
            </View>

            <View style={{paddingHorizontal: 40,paddingBottom: 10}}>

              <Text style={styles.inputLabel}>ชื่อร้านผู้ประกอบการ</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกชื่อร้านผู้ประกอบการ'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                autoCapitalize="none"
                onChangeText={(fullname) => setName(fullname)}
              />
            </View>

            <Text style={styles.inputLabel}>เลขบัตรประจำตัวประชาชน</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกเลขบัตรประชาชน'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                onChangeText={(txt) => setIdCard(txt)}
                maxLength={13}
                minLength={13}
                keyboardType= 'number-pad'
              />
            </View>
            
            <Text style={styles.inputLabel}>ที่อยู่ประกอบการ</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกที่อยู่ผู้ประกอบการ'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                onChangeText={(txt) => setLocal(txt)}
              />
            </View>

            <Text style={styles.inputLabel}>เลขผู้เสียภาษี</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกเลขผู้เสียภาษี'
                maxLength={13}
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                onChangeText={(txt) => setIdTax(txt)}
                keyboardType='number-pad'
              />
            </View>

              <Text style={styles.inputLabel}>เบอร์โทรศัพท์</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกเบอร์โทรศัพท์'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                onChangeText={(tel) => setTel(tel)}
                maxLength={10}
                minLength={10}
                keyboardType= 'number-pad'
              />
            </View>
           
            <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
            <Text style={styles.loginButtonText}>ลงทะเบียน</Text>
            </TouchableOpacity>

            {/* <Image source={require('./img/bottom.png')} style={{width: '100%', height: '20%'}}/> */}
            </View>
             </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'#f8f7fd',
        justifyContent: 'center'
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
        paddingTop: 3,
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
        fontSize:16,
    },
    hr: {
        width: '80%',
        height: 2,
        backgroundColor: '#444',
        marginTop: 6,
    },
})
