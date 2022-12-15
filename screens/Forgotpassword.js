import React, {useState} from 'react'
import { StyleSheet, Text, View , SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity , Alert, ScrollView} from 'react-native'
import BackButton from '../src/component/BackButton';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Forgotpassword({navigation}) {

  const [email, setEmail] = useState("");

  const forgotPress = async () => {
    try {
      if (!email) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอกอีเมล!");
      } else {

        fetch("https://taxcalculator.ml/forgotpassword.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson === "ส่งรหัสยืนยันในอีเมลสำเร็จ") {
              Alert.alert("แจ้งเตือน!", responseJson);
              navigation.replace("Otp", { email: email });
            } else {
              setTimeout;
              Alert.alert("แจ้งเตือน!", responseJson);
            }
            // Showing response message coming from server after inserting records.
            //       Alert.alert(responseJson);
            // navigation.navigate('Profile');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };


    return (
      <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center', paddingBottom: 10,paddingTop:40}}>
            <Image source={require('./img/reset.png')} style={{width: 100, height: 130}}/>
            <Text style={{textAlign: 'center', fontSize: 30,padding:15}}>ลืมรหัสผ่าน</Text>
            </View>
            
            <View style={{paddingTop: 10 , paddingHorizontal: 40}}>
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
            
            <TouchableOpacity style={styles.loginButton} onPress={forgotPress}>
            <Text style={styles.loginButtonText}>ลืมรหัสผ่าน</Text>
            </TouchableOpacity>


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
        //justifyContent: 'center'
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
        color: '#fff',
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
        fontSize:16,
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
})
