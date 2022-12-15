import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { WebView } from 'react-native-webview';
export default function Monthly({route,navigation}) {

    const [user, setUser] = useState('');
    const [payDate, setPayDate] = useState('');

    const monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
"ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

const d = new Date(payDate.date);
const year = d.getFullYear()+543;

const date = d.getDate()+" "+monthNamesThai[d.getMonth()]+" "+year.toString().substr(-2);

    const list = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
             fetch('https://taxcalculator.ml/profile.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => setUser(json))
        .catch((error) => console.error(error))
        } catch (err) {
            console.log(err);
        }
    };
console.log(user)
    const ListDate = async () => {
        try {
            let id = await AsyncStorage.getItem("pid");
             fetch('https://taxcalculator.ml/paydate.php?id='+id)
        .then((response) => response.json())
        .then((json) => setPayDate(json))
        .catch((error) => console.error(error))
        } catch (err) {
            console.log(err);
        }
    };

    function abc(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    
      useEffect(() => {
        list()
        ListDate()
        const unsubscribe = navigation.addListener('focus', () => {
          {list()}{ListDate()}
        });
        return unsubscribe;
        }, [navigation]);
    return (
        <View style={styles.container}>
       
        <WebView 
      style={styles.container}
      source={{ uri: 'https://taxcalculator.ml/monthly.php?uid='+user.id+'&m='+route.params.m }}
    />
        
        {/* <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{paddingTop:20,fontSize: 20,textAlign: 'center',}}>รายการรายจ่าย</Text>
            <View style={{paddingHorizontal:30}}>
                <View style={{borderWidth:1,}}>
                </View>
            </View>
            <View style={{paddingTop:20}}></View>
            <View style={{backgroundColor:'#FFCC00'}}>
                <Text style={{paddingLeft:20,paddingVertical:5}}>{date}</Text>
            </View>
            <Text style={{textAlign: 'center',color: '#fb1111',fontSize: 20,paddingTop:20,paddingLeft:50}}>รายจ่าย</Text>
            <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{paddingTop:10,display:'flex',flexDirection: 'row',}}>
            <View style={{borderWidth:1,borderColor:'#ccc',backgroundColor:'#fff', width:'34%'}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>รายการ</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',backgroundColor:'#fff',width:'23%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:11,textAlign: 'center',}}>ซื้อสินค้า</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',backgroundColor:'#fff',width:'30%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:11,textAlign: 'center',}}>ค่าใช้จ่ายอื่นๆ</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',backgroundColor:'#fff',width:'13%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:11,backgroundColor:'#fff',textAlign: 'center',}}>แก้ไข</Text>
                </View>
            </View>
        </View>
        </View>

        <FlatList 
              data={listPay}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
            <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{borderBottomWidth:1,borderRightWidth:1,borderColor:'#ccc',backgroundColor:'#fff', width:'34%'}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',paddingTop: 5}}>{item.name}</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',backgroundColor:'#fff',width:'23%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:11,textAlign: 'center',color:'#fb1111'}}>{item.category=='ซื้อสินค้า'? '-'+ abc(item.price*item.item)+'\n'+'(บาท)':null}</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',backgroundColor:'#fff',width:'30%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:11,textAlign: 'center',color:'#fb1111'}}>{item.category=='ค่าใช้จ่ายอื่นๆ'? '-'+ abc(item.price*item.item)+'\n'+'(บาท)':null}</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',backgroundColor:'#fff',width:'13%',borderBottomWidth:1,borderRightWidth:1}}>
            <View style={{padding:5,alignItems: 'center',paddingTop:10}}>
                    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => navigation.navigate('EditPay',{id: item.id,category:item.category,name:item.name,price:item.price,item:item.item})}>
                    <FontAwesome name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
              }/>
               <View style={{paddingTop: 60}}></View>
                    
                    <View style={{flexDirection: 'row' , paddingHorizontal: 25}}>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}> 
            <Text style={styles.loginButtonText}>กลับ</Text>
            </TouchableOpacity>
            <View style={{paddingRight: 43}}></View>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SumPay')}> 
            <Text style={styles.loginButtonText}>รายงาน</Text>
            </TouchableOpacity>
            </View>
        </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       // backgroundColor:'#D4D4D4',
    },
    loginButton: {
        width: '45%',
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
      color: '#000',
      textAlign: 'center',
      fontSize:14,
      fontWeight: 'bold',
      color: '#000000',
  },
})
