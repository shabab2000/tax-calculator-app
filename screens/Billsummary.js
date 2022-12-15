import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , FlatList , ScrollView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Billsummary( {route,navigation} ) {

    const [idc,setIdc] = useState(route.params.id);
    const [user,setUser] = useState('');
    const [sum,setSum] = useState('');
    const [product,setProduct] = useState('');

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
console.log(product)
useEffect(() => {
    products()
    load()
    summary()
}, [])

function abc(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
    return (
        
              <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
       <View style={{bottom: 10,paddingTop:30}}>
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

        <View style={{paddingTop:20,display:'flex',flexDirection: 'row',}}>
            <View style={{borderWidth:1,borderColor:'#ccc', width:'16%'}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>จำนวน</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'30%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>รายการ</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'19%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>หน่วยละ</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'23%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>จำนวนเงิน</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'13%',borderTopWidth:1,borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>แก้ไข</Text>
                </View>
            </View>
        </View>
        <FlatList 
              data={sum.product}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
        <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{borderColor:'#ccc', width:'16%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{item.item}</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'30%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{item.name}</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'19%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{item? abc(item.price):0}฿</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'23%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{item? abc(item.price*item.item):0}฿</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc',width:'13%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('EditSummary',{id: item.id, name: item.name, item: item.item, price: item.price})}>
                    <FontAwesome name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
        } />
        <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{borderColor:'#ccc', width:'46%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}></Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc', width:'19%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>รวม</Text>
                </View>
            </View>
            <View style={{borderColor:'#ccc', width:'35%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5}}>
                    <Text style={{fontSize:13,textAlign: 'center',}}>{ sum ? abc(sum.total):null}฿</Text>
                </View>
            </View>
        </View>

            <View style={{paddingTop: 40}}></View>
                    
                    <View style={{flexDirection: 'row' , paddingHorizontal: 25}}>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Wishlist',{id:product.idc})}> 
            <Text style={styles.loginButtonText}>เพิ่มรายการใหม่</Text>
            </TouchableOpacity>
            <View style={{paddingRight: 43}}></View>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Receipt',{id: idc, no_id:product.user.no_id, volume:product.user.volume})}> 
            <Text style={styles.loginButtonText}>พิมพ์</Text>
            </TouchableOpacity>
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
