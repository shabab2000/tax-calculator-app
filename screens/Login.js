import React, {useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, TextInput, StatusBar, Alert, SafeAreaView, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import BackButton from '../src/component/BackButton';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Login({navigation}) { //สร้าง function ชื่อ Home
    
    const [loading,setLoading] = useState(false);
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const[ passwordSecured, setPasswordSecured ] = useState(true);

    const[facebook, setFacebook] = useState('');

      AsyncStorage.getItem('uid').then(value =>{
        if (value !== null){
          navigation.replace('Home');
    }
    })
  

    const handlePress = async () => {
        try {
            if (!email) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมล!');
              }else if (!password) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่าน!');
              }else{
                setLoading(true)
            fetch('https://taxcalculator.ml/login.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          email: email,
          password: password
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
                setLoading(false)
              if(responseJson.result === "success")
              {
                    AsyncStorage.setItem('uid',responseJson.user.id);
                    navigation.replace('Home');
              }
              else{
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

    const FacebookLogin = async () => {
      try {
        await Facebook.initializeAsync({
          appId: '377483987151853',
        });
        const {
          type,
          token,
          expirationDate,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then((response) => response.json()) 
          .then((data) => {
            setLoading(true)
            fetch('https://taxcalculator.ml/login_facebook.php?id='+data.id)
            .then((response) => response.json()) 
              .then((responseJson) => {
        setLoading(false)
                if(responseJson.result === true)
                {
                  AsyncStorage.setItem("uid",responseJson.uid);
                  navigation.navigate('Home')
                }
                else{
                  
                  navigation.navigate('Facebook',{uid:data.id, name:data.name, img:data.picture.data.url});
                }
              }).catch((error) => {
                console.log(error);
              });
          })
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const GoogleLogin = async () => {
      try {
        const { type, user } = await Google.logInAsync({
          androidClientId: '10750705195-g7lrd3i740bt0k4n7qsrh1cqhdaetjdc.apps.googleusercontent.com',
          iosClientId: '10750705195-6bm0f4nhuhp2cpln6ihrnkshg7aoajlk.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        });
    
        if (type === 'success') {
          try {
            fetch('https://taxcalculator.ml/login_google.php?id='+user.id)
            .then((response) => response.json()) 
            .then((responseJson) => {
              console.log(user)
              if(responseJson.result === true)
              {
                AsyncStorage.setItem("uid",responseJson.uid);
                navigation.navigate('Home')
              }
              else{
                navigation.navigate('Google',{id:user.id, email:user.email, name:user.name, img:user.photoUrl});
              }
            }).catch((error) => {
              console.log(error);
            });
          } catch (err) {
          }
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
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
            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 5 , paddingBottom: 10}}>
            <Image source={require('./img/tax.png')} style={{width: 200, height: 150}}/>
            </View>
            
            <View style={{paddingTop: 10 , paddingHorizontal: 40,paddingBottom: 10}}>
            <Text style={styles.inputLabel}>อีเมล</Text>
            <View style={styles.inputView}>
                <TextInput
                    placeholder="กรุณากรอกอีเมล"
                    style={{flex:1, paddingHorizontal: 12 , fontSize: 12}}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType='emailAddress'
                    onChangeText={(email) => setEmail(email)}
                    />
            </View>

            <View style={{paddingTop: 10}}></View>
            <Text style={styles.inputLabel}>รหัสผ่าน</Text>
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

            <View style={{alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Forgotpassword')}>
            <Text style={styles.forgotPasswordText}>ลืมรหัสผ่าน ?</Text>
            </TouchableOpacity>
            </View>

            
            <TouchableOpacity style={styles.loginButton} onPress={() => handlePress()}>
            <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 15 , paddingBottom: 15}}>
            <View style={styles.hr}></View>
            </View>

            {/* <TouchableOpacity style={styles.facebookButton} onPress={FacebookLogin}>
                <Icon 
                name='facebook'
                type='font-awesome'
                size={20}
                color='#fff'
                paddingHorizontal={3}
                />
                <Text style={styles.facebookButtonText}>Signin with Facebook</Text>
            </TouchableOpacity> */}
    
            <View style={{paddingTop: 5, paddingBottom:5}}></View>

            {/* <TouchableOpacity style={styles.googleButton} onPress={GoogleLogin}>
                <Icon 
                name='google'
                type='font-awesome'
                size={20}
                color='#fff'
                paddingHorizontal={3}
                />
                <Text style={styles.googleButtonText}>Signin with Google</Text>
            </TouchableOpacity> */}

            <View style={styles.signUpTextView}>
        <Text style={styles.signUpText}>ยังไม่มีบัญชี?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={[styles.signUpText, { color: '#ffcc00' }]}>
            {' ลงทะเบียน'}
          </Text>
        </TouchableOpacity>
      </View>
            </View>
            {/* <Image source={require('./img/bottom.png')} style={{width: '100%', height: '20%'}}/> */}
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
    hr: {
        width: '80%',
        height: 2,
        backgroundColor: '#444',
        marginTop: 6,
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 6,
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
    forgotPasswordText: {
        textAlign: 'right',
        marginTop: 12,
        fontSize: 12,
        color: '#000',
    },

    loginButton: {
        backgroundColor: '#ffcc00',
        marginTop: 8,
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
        fontSize:18,
        color: '#000',
    },
    facebookButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3C66C4',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      facebookButtonText: {
        marginHorizontal: 12,
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
      },
    
      googleButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E2402B',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      googleButtonText: {
        marginHorizontal: 12,
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
      },
      signUpTextView: {
        marginTop: 10,
        paddingTop:20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      signUpText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '500',
      },
})
