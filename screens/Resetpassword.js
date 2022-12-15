import React, { useState, useEffect } from 'react'
import {   
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Alert 
} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Icon } from 'react-native-elements';

export default function Resetpassword({route , navigation}) {

    const [ password, setPassword ] = useState('');
    const [ passwordSecured, setPasswordSecured] = useState(true);


    const [ repassword, setRepassword ] = useState('');
    const [ repasswordSecured, setRepasswordSecured] = useState(true);

    const handlePress = async () => {
        try {
            if (!password) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่!');
              }else if (!repassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกยืนยันรหัสผ่านใหม่!');
              }else if (password !== repassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกยืนยันรหัสผ่านใหม่ให้ตรงกัน!');
              }else{
            
            fetch('https://taxcalculator.ml/resetpassword.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          email: route.params.email,
       
          password: password
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
              if(responseJson === 'เปลี่ยนรหัสผ่านสำเร็จ')
              {
                Alert.alert('แจ้งเตือน!',responseJson)
                navigation.replace('Login');
              }
              else{
                setTimeout
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
<ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.resetpasswordTitleText}>OTP</Text>

            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <Text style={{fontSize:25,textAlign: 'center',}}>รีเซ็ตรหัสผ่าน</Text>
            </View>


            <View style={{ paddingTop: 15 , paddingHorizontal: 30 }}>
              <Text style={styles.inputLabel}>อีเมล :  
                <Text style={{ fontSize: 16 , color: '#000'}}> {route.params.email} </Text>
              </Text>
              
            </View>

            <View style={{paddingHorizontal: 50}}>
            <View style={{paddingTop:5}}></View>
            <Text style={styles.inputLabel}>รหัสผ่าน</Text>
            <View style={styles.inputView}>
            <Icon 
            name='lock' 
            type='material-community' 
            size={20} 
            />
              <TextInput
                placeholder={'กรุณากรอกรหัสผ่านใหม่'}
                style={{flex:1 , paddingHorizontal: 12 ,fontSize: 12}}
                secureTextEntry={passwordSecured}
                textContentType='password'
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity 
                style={{ padding: 4}}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}
                >
                  <Icon 
                  name={passwordSecured ? 'eye':'eye-off'} 
                  type='material-community' 
                  size={20} 
                  />
                </TouchableOpacity>
            </View>

            <View style={{paddingTop:10}}></View>
            <Text style={styles.inputLabel}>ยืนยันรหัสผ่านใหม่</Text>
            <View style={styles.inputView}>
            <Icon 
            name='lock' 
            type='material-community' 
            size={20} 
            />
              <TextInput
                placeholder={'กรุณากรอกยืนยันรหัสผ่านใหม่'}
                style={{flex:1 , paddingHorizontal: 12 ,fontSize: 12}}
                secureTextEntry={repasswordSecured}
                textContentType='password'
                onChangeText={(password) => setRepassword(password)}
              />
              <TouchableOpacity 
                style={{ padding: 4}}
                onPress={() => {
                  setRepasswordSecured(!repasswordSecured);
                }}
                >
                  <Icon 
                  name={repasswordSecured ? 'eye':'eye-off'}  
                  type='material-community' 
                  size={20} 
                  />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
              <Text style={styles.resetpasswordButtonText}>รีเซ็ตรหัสผ่าน</Text>
            </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems:'center', paddingBottom: 10 , paddingTop: 10}}>
            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerstatusbar:{
        flex:1,
    },
    container:{
        flex:1,
        backgroundColor: '#ffffff'
      },
      centerizedView: {
        width: '100%',
        top: '30%',
      },

  resetpasswordTitleText: {
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  hrTop: {
    width: '80%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  hrLow: {
    width: '60%',
    height: 0.5,
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
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18  ,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  resetpasswordButton: {
    backgroundColor: '#5AA347',
    marginTop: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  resetpasswordButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
  resetpasswordlinkText: {
    textAlign: 'center',
    fontSize: 10,
    justifyContent: 'center',
    alignItems:'center', 
    paddingTop: 10,
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
});
