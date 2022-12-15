import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect}from 'react'
import { SafeAreaView, StyleSheet, Text, View , StatusBar, TouchableOpacity,Image, Alert} from 'react-native'
import { Icon } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionSheet from '@grovertb/react-native-actionsheet'

export default function HomeScreen({navigation}) {

  const [select,setSelected] = useState('');
  const [select0,setSelected0] = useState('');
  const [select1,setSelected1] = useState('');
  const [selects,setSelecteds] = useState('');

  const actionSheetRef = React.useRef();
  const actionSheetRef0 = React.useRef();
  const actionSheetRef1 = React.useRef();
  const actionSheetRefs = React.useRef();

  const _handleShowActionSheet = () => {
    actionSheetRef.current.show()
  }

  const _handleShowActionSheet1 = () => {
    actionSheetRef1.current.show()
  }

  const _handleShowActionSheets = () => {
    actionSheetRefs.current.show()
  }

  const _handleShowActionSheet0 = () => {
    actionSheetRef0.current.show()
  }

  const handlePress = index => {
    setSelected(index);
    if(index==0){
      navigation.navigate('Customer')
    }else if(index==1) {
      listPay()
    }else{
      null
    }
  }

  const handlePress5 = index => {
    setSelected1(index);
    if(index==0){
      actionSheetRef1.current.show()
    }else if(index==1) {
      navigation.navigate('Economy')
    }else{
      null
    }
  }

  const handlePress1 = index => {
    setSelected1(index);
    if(index==0){
      actionSheetRefs.current.show()
    }else if(index==1) {
      navigation.navigate('Incomes')
    }else{
      null
    }
  }

  const handlePress0 = index => {
    setSelecteds(index);
    if(index==0){
      AsyncStorage.setItem('types','inca');
      navigation.navigate('Income',{ types:'inca' })
    }else if(index==1) {
      AsyncStorage.setItem('types','incz');
      navigation.navigate('Income',{ types:'incz' })
    }else{
      null
    }
  }

  const listPay = async () => {

    let uid = await AsyncStorage.getItem("uid");
      fetch('https://taxcalculator.ml/listpay.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

    uid: uid,

    })
   
  }).then((response) => response.json()) 
        .then((responseJson) => {
  
          if(responseJson.result === 'success')
          {
            AsyncStorage.setItem('pid',responseJson.uid);
            //ToastAndroid.show(responseJson,2000);
            navigation.navigate('Expenses')
            }
          else{
            Alert.alert('แจ้งเตือน!',responseJson);
          }
        }).catch((error) => {
          Alert.alert('แจ้งเตือน!',error);
        });
  }
  console.log(select)

    return (

        <View style={styles.container}>
            
            <View style={{paddingTop: 30 }}>
            <Text style={{fontSize:19,padding:25,textAlign:'center'}}>ทำการเลือกบริการ</Text>

            <View style={{paddingHorizontal:15}}>
              <TouchableOpacity style={{}} onPress={() => _handleShowActionSheet()}>
              <View style={{backgroundColor:'#FFCC00',paddingLeft:10,borderRadius:10,paddingVertical:20}}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('./img/l.png')} style={{width:50,height:50}}/>
                <Text style={{color:'#fff',fontSize:20,paddingTop:10,paddingLeft:10}}>รายรับ-รายจ่าย</Text>
              </View>
              </View>
              </TouchableOpacity>
              <ActionSheet
        ref={actionSheetRef}
        options={['รายรับ', 'รายจ่าย' , 'ยกเลิก']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePress(index) }
      />
            </View>
            <View style={{padding:7}}/>
            <View style={{paddingHorizontal:15}}>
              <TouchableOpacity style={{}} onPress={() => _handleShowActionSheet0()}>
              <View style={{backgroundColor:'#FFCC00',paddingLeft:1,borderRadius:10,paddingVertical:20}}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('./img/tax1.png')} style={{width:65,height:50}}/>
                <Text style={{color:'#fff',fontSize:20,paddingTop:10,paddingLeft:10}}>คำนวณภาษี</Text>
              </View>
              </View>
              </TouchableOpacity>
              <ActionSheet
        ref={actionSheetRef0}
        options={['แบบเหมาจ่าย 60%', 'แบบเขตพัฒนาเศรษฐกิจพิเศษ' , 'ยกเลิก']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePress5(index) }
      />

<ActionSheet
        ref={actionSheetRef1}
        options={['ครึ่งปี', 'รายปี' , 'ยกเลิก']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePress1(index) }
      />

              <ActionSheet
        ref={actionSheetRefs}
        options={['มกราคม - มิถุนายน', 'กรกฎาคม - ธันวาคม' , 'ยกเลิก']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePress0(index) }
      />
            </View>
            <View style={{padding:7}}/>
            <View style={{paddingHorizontal:15}}>
              <TouchableOpacity style={{}} onPress={() => navigation.navigate('Notification')}>
              <View style={{backgroundColor:'#FFCC00',paddingLeft:10,borderRadius:10,paddingVertical:20}}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('./img/notification.png')} style={{width:45,height:50}}/>
                <Text style={{color:'#fff',fontSize:20,paddingTop:10,paddingLeft:10}}>แจ้งเตือน</Text>
              </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{padding:7}}/>
            <View style={{paddingHorizontal:15}}>
              <TouchableOpacity style={{}} onPress={() => navigation.navigate('Report')}>
              <View style={{backgroundColor:'#FFCC00',paddingLeft:10,borderRadius:10,paddingVertical:20}}>
              <View style={{flexDirection:'row'}}>
              <Image source={require('./img/export.png')} style={{width:50,height:50}}/>
                <Text style={{color:'#fff',fontSize:20,paddingTop:10,paddingLeft:10}}>รายงานผล</Text>
              </View>
              </View>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.promotionViewBox}>
            <View style={styles.promotionContainer}>
            
              <TouchableOpacity style={styles.promotionBtn} onPress={() => _handleShowActionSheet()}>
              <View style={{padding:5}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,padding:5}}>
                <View style={{paddingLeft:20, alignItems: 'center'}}>
                  <Image source={require('./img/note.png')} style={{width: 100, height: 100}}/>
                <Text style={{fontSize: 16 , color: '#000',textAlign: 'center',padding:3}}>
                  รายรับ-รายจ่าย
                </Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>
              
             

              <TouchableOpacity style={styles.promotionBtn} onPress={() => _handleShowActionSheet1()}>
              <View style={{padding:5}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,padding:5}}>
              <View style={{paddingLeft:20, alignItems: 'center'}}>
                  <Image source={require('./img/budget.png')} style={{width: 100, height: 100}}/>
                <Text style={{fontSize: 16 , color: '#000',textAlign: 'center',padding:3}}>
                  คำนวณภาษี
                </Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>

              
            </View>
          </View>

          <View style={styles.promotionViewBox}>
            <View style={styles.promotionContainer}>
              
              <TouchableOpacity style={styles.promotionBtn} onPress={() => navigation.navigate('Notification')}>
              <View style={{padding:5}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,padding:5}}>
              <View style={{paddingLeft:20, alignItems: 'center'}}>
                  <Image source={require('./img/notification.png')} style={{width: 100, height: 100}}/>
                <Text style={{fontSize: 18 , color: '#000',textAlign: 'center',padding:3}}>
                  การแจ้งเตือน
                </Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.promotionBtn} onPress={() => navigation.navigate('Report')}>
              <View style={{padding:5}}>
              <View style={{backgroundColor:'#fff',borderRadius:20,padding:5}}>
              <View style={{paddingLeft:20,alignItems: 'center'}}>
                  <Image source={require('./img/standard.png')} style={{width: 100, height: 100}}/>
                <Text style={{fontSize: 18 , color: '#000',textAlign: 'center',padding:3}}>
                  รายงานผล
                </Text>
                </View>
                </View>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerstatusbar:{
        flex:1,
    },
    container:{
        flex:1,
        backgroundColor: '#eee'
      },

      promotionViewBox: {
        height: 150,
      },
      promotionContainer: {
        flexDirection: "row",
        width: "95%",
        alignSelf: "center",
      },
      promotionBtn: {
        flex: 1,
        width: "30%",
        marginHorizontal: 0,
        alignSelf: "center",
      },
      promotionIcon: {
        borderWidth: 0,
        alignItems: "center",
        alignSelf: "center",
        width: "95%",
        height: "95%",
        borderRadius: 8,
        shadowColor: "#000000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      promotionLogo: {
        width: "55%",
        height: "55%",
      },
      promotionBtnTxt: {
        alignSelf: "center",
        fontSize: 24,
        color: "#000000",
        paddingHorizontal: 5,
      },
});
