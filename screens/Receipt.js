import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , FlatList , ScrollView, ToastAndroid} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import {captureScreen} from 'react-native-view-shot';
import {
  AndroidImportance,
  AndroidNotificationVisibility,
  NotificationChannel,
  NotificationChannelInput,
  NotificationContentInput,
} from "expo-notifications";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { downloadToFolder } from "expo-file-dl";
import { ProgressDialog } from 'react-native-simple-dialogs';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function Receipt( {route,navigation} ) {

    const [loading, setLoading] = useState(false);
    const [idc,setIdc] = useState(route.params.id);
    const [user,setUser] = useState('');
    const [sum,setSum] = useState('');
    const [product,setProduct] = useState('');
    const [show,setShow] = useState('');
    const [savedImagePath, setSavedImagePath] = useState('');
    const channelId = "DownloadInfo";
    const RandomNumber = Math.floor(Math.random() * 9999999999) + 1 ;
    const filenames = RandomNumber+'.jpg';
    const img = "img_"+filenames;
        console.log(img);

    async function getMediaLibraryPermissions() {
        await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      }

      async function getNotificationPermissions() {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }

      const loadImage = async ()=> {
        await downloadToFolder(
                 'https://taxcalculator.ml/receipt/'+img,
                 img,
                 "Tax",
                 channelId,
                 {
                   notificationType: {notification: 'custom'},
                   notificationContent: {
                     downloading: {
                       title: 'กำลังบันทึก',
                     },
                     finished: {
                       title: 'บันทึกใบเสร็จสำเร็จ!',
                     },
                     error: {
                       title: 'Oops!'
                     },
                   },
                   downloadProgressCallback: (data) => {
                     const {totalBytesWritten, totalBytesExpectedToWrite} = data;
                     const pctg = 100 * (totalBytesWritten / totalBytesExpectedToWrite);
                     pctg == 100 ? ToastAndroid.show('บันทึกใบเสร็จเรียบร้อย',2000):null
                     setLoading(false)
                     setShow(true);
                   },
                 }
               );
       }

       console.log(savedImagePath)

    const load = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
console.log('uid: '+uid);
            if(uid!== null) {
                //setEmail(email)
                fetch('https://taxcalculator.ml/profile.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => setUser(json))
        .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };

    const summary = async () => {
        try {
                fetch('https://taxcalculator.ml/summary.php?idc='+idc)
        .then((response) => response.json())
        .then((json) => setSum(json))
        .catch((error) => console.error(error))
            
        } catch (err) {
            console.log(err);
        }
    };

    const products = async () => {
        try {
            await fetch('https://taxcalculator.ml/receipt.php?idc='+idc)
        .then((response) => response.json())
        .then((json) => setProduct(json))
        .catch((error) => console.error(error))
            
        } catch (err) {
            console.log(err);
        }
    };


    const takeScreenShot = async() => {
        // To capture Screenshot
        captureScreen({
          // Either png or jpg (or webm Android Only), Defaults: png
          format: 'jpg',
          // Quality 0.0 - 1.0 (only available for jpg)
          quality: 0.8, 
        }).then(
          //callback function to get the result URL of the screnshot
          (uri) => {
            setLoading(true)
              let filename = filenames;
              //let match = /\.(\w+)$/.exec(filename);
              let type = `image/jpg`;
              let formData = new FormData();
              formData.append('photo', { uri: uri, name: filename, type,  });
              formData.append('no_id',route.params.no_id);
              formData.append('volume',route.params.volume);
              fetch('https://taxcalculator.ml/imgslip.php', {
                method: 'POST',
                body: formData,
                headers: {
                  'Accept': 'application/json',
                  'content-type': 'multipart/form-data',
                },
              }).then((response) => response.json())
                        .then((responseJson) => {

                            if(responseJson.result==='บันทึกใบเสร็จสำเร็จ'){
                                ToastAndroid.show("กำลังบันทึกใบเสร็จ",2000)
                                console.log('filename: '+filename)
                                loadImage();
        
                            }else{
                                Alert.alert('แจ้งเตือน!',responseJson.result);
                            }
                        }).catch((error) => {
                          console.log(error);
                        });
                     
          },
          (error) => console.error('Oops, Something Went Wrong', error),
        );
      };

console.log(product)
//console.log(product.user.no_id)

useEffect(() => {
    setTimeout(() => { takeScreenShot()},2000)
    getMediaLibraryPermissions()
    getNotificationPermissions()
    products()
    load()
    summary()
}, [])

function abc(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
       <View style={{bottom: 10,paddingTop:70}}>
            <Text style={styles.headtext}>ใบเสร็จรับเงิน</Text>
            </View>

<View style={{ flexDirection: 'row' , justifyContent: 'center'}}>
            <View style={{borderWidth:1,borderColor:'#000', width:'20%' , alignItems: 'center' , paddingVertical: 8 , borderRadius: 10, right: 5}}>
                        <Text style={{}}>เล่มที่</Text>
                        <Text style={{color:'#000'}}>{product ? product.user.volume:''}</Text>
                    </View>
                    <View style={{backgroundColor: '#DED9D9' , width:'50%' , alignItems: 'center' , paddingVertical: 8, borderRadius: 10 ,justifyContent:'center'}}>

                        <Text style={{}}>{user.name}</Text>
                    </View>
                    <View style={{borderWidth:1,borderColor:'#000', width:'20%' , alignItems: 'center' , paddingVertical: 8, borderRadius: 10, left: 5 }}>
                    <Text style={{}}>เลขที่</Text>
                        <Text style={{}}>{product? product.user.no_id:''}</Text>
                    </View>
                    
                    </View>

            <View style={{display: 'flex',flexDirection: 'row', paddingTop: 10}}>
            <Text style={styles.bodylefttext}>นาม <Text style={{fontSize:16,textDecorationLine: 'underline'}}> {product? product.user.name:'' }</Text></Text>
            <Text style={{fontSize:16}}>  วันที่ <Text style={{fontSize:16,textDecorationLine: 'underline'}}> {product? product.user.date:''}</Text></Text>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 5}}>
            <Text style={styles.bodylefttext}>ที่อยู่ <Text style={{right: 10,textDecorationLine: 'underline'}}> {product? product.user.address:''}</Text></Text>
            </View>
            
            <View style={{flexDirection: 'row', paddingTop: 5}}>
            <Text style={styles.bodylefttext}>เลขที่ผู้เสียภาษี <Text style={{right: 10,textDecorationLine: 'underline'}}> {product? product.user.Id_taxpayer:''}</Text></Text>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 5}}>
            <Text style={styles.bodylefttext}>เลขบัตรประชาชน <Text style={{right: 10,textDecorationLine: 'underline'}}> {product? product.user.Id_card:''}</Text></Text>
            </View>
<View style={{paddingHorizontal:10}}>
        <View style={{paddingTop:20,display:'flex',flexDirection: 'row',}}>
            <View style={{borderWidth:1,borderColor:'#ccc', width:'20%'}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>จำนวน</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'35%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>รายการ</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'20%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>หน่วยละ</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'25%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>จำนวนเงิน</Text>
                </View>
            </View>
            
        </View>
        <FlatList 
              data={sum.product}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
        <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{borderColor:'#ccc', width:'20%',borderBottomWidth:1,borderRightWidth:1,borderLeftWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{item.item}</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'35%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{item.name}</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'20%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{abc(item.price)}฿</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'25%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{abc(item.price*item.item)}฿</Text>
                </View>
            </View>
            
        </View>
        } />
        <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{borderColor:'#ccc', width:'55%',borderBottomWidth:1,borderRightWidth:1,borderLeftWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}></Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc', width:'20%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>รวม</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc', width:'25%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{ sum ? abc(sum.total):null}฿</Text>
                </View>
            </View>
        </View>
        </View>
            <View style={{paddingTop: 40,paddingHorizontal:20}}>
                    {show ?
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Home')}> 
            <Text style={styles.loginButtonText}>กลับหน้าหลัก</Text>
            </TouchableOpacity>
            :null}
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
        backgroundColor:'#fff',
    },
    goBackcontainer: {
        left: 15,
        top: 15,
      },
      goBackimage: {
        width: 30,
        height: 30,
      },
    headtext: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#000'
        },
    bodylefttext: {
        fontSize: 16,
        alignSelf: 'center',
        paddingLeft: 15,
        
    },
    hrname: {
        width: '30%',
        height: 2,
        backgroundColor: '#444',
        left: 82,
    
    },
    hrdate: {
        width: '30%',
        height: 2,
        backgroundColor: '#444',
        left: 243,
        top: -2,
    },
    hraddress: {
        width: '68%',
        height: 2,
        backgroundColor: '#444',
        left: 85,
        top: -2,
    },
    hrtaxno: {
        width: '52%',
        height: 2,
        backgroundColor: '#444',
        left: 150,
        top: -2,
    },
    hridcard: {
        width: '33%',
        height: 2,
        backgroundColor: '#444',
        left: 228,
        top: -2,
    },
    loginButton: {
        width: '100%',
      backgroundColor: '#004FFF',
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
      color: '#ddd',
      textAlign: 'center',
      fontSize:14,
      fontWeight: 'bold',
  },
})
