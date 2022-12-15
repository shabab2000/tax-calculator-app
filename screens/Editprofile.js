import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,FlatList,Alert,TextInput,ActivityIndicator, } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Editprofile({route,navigation}) {

    const [house,setHouse] = useState('');
    const [user, setUser] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          //aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const load = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");

            if(uid!== null) {
                fetch('https://taxcalculator.ml/profile.php?uid='+uid)
                .then((response) => response.json())
                .then((json) => setUser(json))
                .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handlePress = async () => {
        try{
            let uid = await AsyncStorage.getItem("uid");
            if(image) {
            if(!user.name){
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อร้านผู้ประกอบการ')
            }else if(!user.local){
                Alert.alert('แจ้งเตือน!','กรุณากรอกที่อยู่ผู้ประกอบการ')
            }else if(!user.tel){
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์')
            } else {
         
              setLoading(true);
          let filename = image.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          let formData = new FormData();
          formData.append('photo', { uri: image, name: filename, type,  });
          formData.append('email',user.email)
          formData.append('tel',user.tel)
          formData.append('local',user.local)
          formData.append('name',user.name)
          formData.append('img','img')
          formData.append('id',uid)
  
          fetch('https://taxcalculator.ml/updateprofile.php', {
            method: 'POST',
            body: formData,  
            headers: {
              'Accept': 'application/json',
              'content-type': 'multipart/form-data',
            },
          }).then((response) => response.json())
                    .then((responseJson) => {
                      setLoading(false);
                        Alert.alert('แจ้งเตือน!',responseJson);
                        navigation.goBack();
                    }).catch((error) => {
                      console.log(error);
                    });
                }} else {
                    if (!user.name) {
                      Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อร้านผู้ประกอบการ!');
                    }else if (!user.local) {
                      Alert.alert('แจ้งเตือน!','กรุณากรอกที่อยู่ผู้ประกอบการ!');
                    }else if (!user.tel) {
                        Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์!');
                      }else{
                      setLoading(!loading);
                      console.log(uid)
                  fetch('https://taxcalculator.ml/updateprofile.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
             
                tel: user.tel,
                name: user.name,
                local: user.local,
                id: uid
             
              })
             
            }).then((response) => response.json()) 
                  .then((responseJson) => {
            
                    if(responseJson === 'อัพเดทโปรไฟล์สำเร็จ')
                    {
                      setLoading(false);
                      Alert.alert('แจ้งเตือน!',responseJson);
                      navigation.goBack();
                    }
                    else{
                      setLoading(false);
                      Alert.alert('แจ้งเตือน!',responseJson);
                    }
                  }).catch((error) => {
                    console.log(error);
                  });
              }
                  }
        } catch(e){
            console.log(e);
        }
    }

        useEffect(() => {
          load()
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
            {user?
            <View style={{paddingHorizontal:30,paddingTop:30}}>
            <View style={{alignItems: 'center',paddingBottom:10}}>
            <Image source={{uri:image?image:user.img}} style={{width:150, height:150, borderRadius:100}}/>
            </View>
            <View style={{paddingTop:10,paddingHorizontal:60}}>
    
                <TouchableOpacity style={{ backgroundColor: '#749d63',borderRadius:10}} onPress={() =>pickImage()}>
                    <Text style={{color:'#fff',fontSize:18,padding:7,textAlign: 'center'}}>อัปโหลดรูปโปรไฟล์</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize:16}}>อีเมล : {user.email}</Text>
            <Text style={{fontSize:16}}>เลขบัตรประชาชน : {user.idcard}</Text>
            <Text style={{fontSize:16}}>เลขผู้เสียภาษี : {user.taxid}</Text>
            <View style={{paddingTop:10}}></View>
            <View style={styles.inputView}>
                <FontAwesome5 name="user-alt" size={24} color="#000" /><Text style={{fontSize:20}}> |</Text>
                    <TextInput
                placeholder='ชื่อร้านผู้ประกอบการ'
                placeholderTextColor='#aaa'
                style={{flex:1,paddingHorizontal:12,color:'#000',fontSize:16}}
                //autoCorrect={true}
                //autoCapitalize={false}
                textContentType='name'
                value={user.name}
                onChangeText={(txt) => setUser({...user, name: txt})}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.textAreaContainer}>
                <FontAwesome5 name="map" size={24} color="#000" /><Text style={{fontSize:20}}> |</Text>
                    <TextInput
                    style={styles.textArea}
                multiline={true}
                numberOfLines={10}
                placeholder='ที่อยู่ผู้ประกอบการ'
                placeholderTextColor='#aaa'
                underlineColorAndroid="transparent"
                //autoCorrect={true}
                //autoCapitalize={false}
                textContentType='name'
                value={user.local}
                onChangeText={(txt) => setUser({...user, local: txt})}
                />
            </View>
            
            <View style={{paddingTop:10}}></View>
            <View style={styles.inputView}>
                <FontAwesome name="phone" size={24} color="#000" /><Text style={{fontSize:20}}> |</Text>
                    <TextInput
                placeholder='เบอร์โทรศัพท์'
                placeholderTextColor='#aaa'
                style={{flex:1,paddingHorizontal:12,color:'#000',fontSize:16,}}
                //autoCorrect={true}
                //autoCapitalize={false}
                autoCompleteType='tel'
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
                maxLength={10}
                value={user.tel}
                onChangeText={(txt) => setUser({...user, tel: txt})}
                />
            </View>
            
            <View style={{paddingTop:10,paddingBottom:30}}>
    
                <TouchableOpacity style={styles.loginButton} onPress={() => handlePress()}>
                    <Text style={styles.textRegis}>แก้ไขโปรไฟล์</Text>
                </TouchableOpacity>
            </View>
            </View>
            :<ActivityIndicator size='large' color='primary' />}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f8f7fd'
    },
    textRegis: {
        textAlign: 'center',
        color:'#000',
        fontSize:20,
    },
    textLogin: {
        textAlign: 'center',
        color:'#FFFFFF',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
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
