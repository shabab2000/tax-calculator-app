import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , ScrollView} from 'react-native'

export default function RegisConfirm({route,navigation}) {
    
    const[name, setName] = useState(route.params.name);
    const[ idcard,setIdCard ] = useState('');
    const[ local ,setLocal ] = useState('');
    const[idtax ,setIdTax] = useState('');
    const[tel, setTel] = useState('');

    const handlePress = async () => {
        try {
            if (!name) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อ-นามสกุล!');
              }else if (!tel) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์!');
              }else if (!idcard) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชน!');
              }else if (idcard.length!==13) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชนให้ครบ 13หลัก!');
              }else if (!local) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกสถานที่ประกอบการ!');
              }else if (!idtax) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขผู้เสียภาษี!');
              }else if (!tel) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์!');
              }else if (tel.length!==10) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10หลัก!');
              }else{
                
            fetch('https://taxcalculator.tk/google.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
        uid: route.params.uid,
        email: route.params.email,
        img: route.params.img,
        name: name,
        idcard: idcard,
        local: local,
        taxid:idtax,
        tel: tel

        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
              if(responseJson.result === 'สมัครสมาชิกสำเร็จ')
              {
                Alert.alert('แจ้งเตือน!',responseJson.result);
                AsyncStorage.setItem("uid",responseJson.user.id);
                    navigation.replace('Home');
              }
              else{
                setLoading(false);
                Alert.alert('แจ้งเตือน!',responseJson.result);
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
             <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <Text style={{fontSize: 20,paddingTop:20}}>ข้อมูลผู้ประกอบการ</Text>
            <View style={styles.hr}></View>
            </View>

            <View style={{paddingHorizontal: 40,paddingBottom: 10}}>

              <Text style={styles.inputLabel}>ชื่อ-สกุล</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกชื่อ-สกุล'
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
            
            <Text style={styles.inputLabel}>สถานที่ประกอบการ</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกสถานที่ประกอบการ'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                onChangeText={(txt) => setLocal(txt)}
              />
            </View>

            <Text style={styles.inputLabel}>เลขผู้เสียภาษี</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกเลขผู้เสียภาษี'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                onChangeText={(txt) => setIdTax(txt)}
                keyboardType= 'numbers-and-punctuation'
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
