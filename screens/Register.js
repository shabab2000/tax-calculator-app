import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , ScrollView} from 'react-native'
import BackButton from '../src/component/BackButton';
import { Icon } from 'react-native-elements';

export default function Register({navigation}) {
    
    const[ email,setEmail ] = useState('');
    const[ username,setUsername ] = useState('');
    const[ password,setPassword ] = useState('');
    const[ confirmpassword,setConfirmpassword ] = useState('');
    const[ fullname,setFullname ] = useState('');
    const[ tel,setTel ] = useState('');
    const[ passwordSecured, setPasswordSecured ] = useState(true);
    const[ repasswordSecured, setRePasswordSecured ] = useState(true);


    const handlePress = async () => {
        try {
            if (!email) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมล!');
              }else if (!username) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อผู้ใช้!');
              }else if (password.length<6) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่าน 6ตัวขึ้นไป!');
              }else if (!confirmpassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกยืนยันรหัสผ่าน!');
              }else if (password !== confirmpassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านให้ตรงกัน!');
              }else{
                
            navigation.navigate('RegisConfirm',{email:email, password: password,username:username})

        }} catch (err) {
            console.log(err);
        }
    }
      
    return (
        <View style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false}>

             <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 5 , paddingBottom: 10}}>
            <Image source={require('./img/tax.png')} style={{width: 200, height: 150}}/>
            </View>

            <View style={{paddingHorizontal: 40,paddingTop: 20,paddingBottom: 10}}>
              <Text style={styles.inputLabel}>อีเมล</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกอีเมล'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                autoCapitalize="none"
                keyboardType='email-address'
                textContentType='emailAddress'
                onChangeText={(email) => setEmail(email)}
              />
            </View>

              <Text style={styles.inputLabel}>ชื่อผู้ใช้</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='กรุณากรอกชื่อผู้ใช้'
                style={{flex:1, paddingHorizontal: 12 , fontSize: 14}}
                autoCapitalize="none"
                keyboardType='email-address'
                textContentType='username'
                onChangeText={(username) => setUsername(username)}
              />
            </View>

            
              <Text style={styles.inputLabel}>รหัสผ่าน (ตัวอักษรหรือตัวเลข 6ตัวขึ้นไป)</Text>
              <View style={styles.inputView}>

                <TextInput
                    placeholder="กรุณากรอกรหัสผ่าน"
                    style={{flex:1, paddingHorizontal: 12 , fontSize: 12}}
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
                        name={passwordSecured?'eye-off':'eye'}
                        type='material-community'
                        size={20}
                        />
                </TouchableOpacity>
            </View>

              <Text style={styles.inputLabel}>ยืนยันรหัสผ่าน</Text>
              <View style={styles.inputView}>

<TextInput
    placeholder="กรุณากรอกรหัสผ่าน"
    style={{flex:1, paddingHorizontal: 12 , fontSize: 12}}
    secureTextEntry={repasswordSecured}
    textContentType='password'
    onChangeText={(password) => setConfirmpassword(password)}
    />
<TouchableOpacity
    style={{ padding: 4}}
    onPress={() => {
        setRePasswordSecured(!repasswordSecured);
    }}
    >
        <Icon 
        name={repasswordSecured?'eye-off':'eye'}
        type='material-community'
        size={20}
        />
</TouchableOpacity>
</View>

            <TouchableOpacity style={styles.loginButton} onPress={handlePress}>
            <Text style={styles.loginButtonText}>ถัดไป</Text>
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
        justifyContent: 'center',
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
})
