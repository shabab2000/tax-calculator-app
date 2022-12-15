import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator,TextInput,Alert } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo,AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Icon } from 'react-native-elements';

export default function ChangePassword({route,navigation}) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordSecured, setPasswordSecured ] = useState(true);
    const [repasswordSecured,setRePasswordSecured] = useState(true);

    const handlePress = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
            if (!password) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่!');
              } else if (password.length<6) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่ 6ตัวขึ้นไป!');
              } else if (!confirmPassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกยืนยันรหัสผ่านใหม่!');
              } else if (password !== confirmPassword) {
                Alert.alert('แจ้งเตือน!','กรุณายืนยันรหัสผ่านให้ตรงกัน!');
              } else{
                setLoading(!loading);
                fetch('https://taxcalculator.ml/change_password.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              id: uid,
              password: password
           
            })
           
          }).then((response) => response.json()) 
                .then((responseJson) => {
          
                  if(responseJson === 'เปลี่ยนรหัสผ่านสำเร็จ')
                  {
                      //AsyncStorage.setItem("Email",email);
                      Alert.alert('แจ้งเตือน!',responseJson);
                      navigation.goBack();
           
                  }
                  else{
                    setLoading(!loading);
                    Alert.alert('แจ้งเตือน!',responseJson);
                  }
          // Showing response message coming from server after inserting records.
           //       Alert.alert(responseJson);
                 // navigation.navigate('Profile');
                }).catch((error) => {
                  console.log(error);
                });
              }
            } catch (err) {
              console.log(err);
          }
        }
    return (
        <View style={styles.container}>
<ScrollView showsVerticalScrollIndicator={false}>
<ProgressDialog
    title="รอซักครู่"
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    message="กำลังโหลด..."
    visible={loading}
/>
<View style={{paddingTop:50,paddingBottom:20,paddingHorizontal:20}}>
    <Text style={{fontSize:25,textAlign: 'center'}}>เปลี่ยนรหัสผ่านใหม่</Text>

    
            <View style={{paddingTop:20}}></View>
            <View style={styles.inputView}>
            <FontAwesome5 name="lock" size={24} color="#000" />
                <Text style={{fontSize:20,color:'#000'}}> |</Text>
                <TextInput
                    placeholder="กรุณากรอกรหัสผ่านใหม่"
                    style={{flex:1, paddingHorizontal: 12 , fontSize: 16}}
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
            <View style={{paddingTop:10}}></View>
            <View style={styles.inputView}>
            <FontAwesome5 name="lock" size={24} color="#000" />
                <Text style={{fontSize:20,color:'#000'}}> |</Text>
                <TextInput
                    placeholder="กรุณากรอกรหัสผ่านใหม่"
                    style={{flex:1, paddingHorizontal: 12 , fontSize: 16}}
                    secureTextEntry={repasswordSecured}
                    textContentType='password'
                    onChangeText={(password) => setConfirmPassword(password)}
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
            <View style={{paddingTop:10}}></View>
            <View style={{paddingTop:20}}>
    
    <TouchableOpacity style={styles.loginButton} onPress={() => handlePress()}>
        <Text style={styles.textRegis}>เปลี่ยนรหัสผ่าน</Text>
    </TouchableOpacity>
</View>
</View>


</ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textRegis: {
        textAlign: 'center',
        color:'#000',
        fontSize:20,
    },
    TextInput: {
        width: '100%',
        height:45,
        //borderRadius:8,
        backgroundColor: '#749d63', 
        paddingHorizontal:10,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
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
    inputViews: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#4B4B4B',
        borderRadius: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
      textArea: {
        height: 100,
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        color:'#000',
        fontSize:16,
        paddingHorizontal:12
      },
      textAreaContainer: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#4B4B4B',
        display: 'flex',
        flexDirection:'row',
        padding: 5,
        paddingHorizontal:10,
        borderRadius: 10,
      },
})
