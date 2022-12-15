import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function SumPay({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [listPay, setListPay] = useState('');
    const [payDate, setPayDate] = useState('');
    const [total, setTotal] = useState('');

    const monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
"ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

const d = new Date(payDate.date);
const year = d.getFullYear()+543;

const date = d.getDate()+" "+monthNamesThai[d.getMonth()]+" "+year.toString().substr(-2);

    const list = async () => {
        try {
            setLoading(true)
            let pid = await AsyncStorage.getItem("pid");
             fetch('https://taxcalculator.ml/listpays.php?pid='+pid)
        .then((response) => response.json())
        .then((json) => {
            setListPay(json)
            setLoading(false)
        })
        .catch((error) => console.error(error))
        } catch (err) {
            console.log(err);
        }
    };
console.log(total)
    const ListDate = async () => {
        try {
            setLoading(true)
            let id = await AsyncStorage.getItem("pid");
             fetch('https://taxcalculator.ml/paydate.php?id='+id)
        .then((response) => response.json())
        .then((json) => {
            setPayDate(json)
            setLoading(false)
        })
        .catch((error) => console.error(error))
        } catch (err) {
            console.log(err);
        }
    };

    const totals = async () => {
        try {
            setLoading(true)
            let pid = await AsyncStorage.getItem("pid");
             fetch('https://taxcalculator.ml/sumprice.php?id='+pid)
        .then((response) => response.json())
        .then((json) => {
            setTotal(json)
            setLoading(false)
        })
        .catch((error) => console.error(error))
        } catch (err) {
            console.log(err);
        }
    };

    function abc(x) {
        return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):null;
      }
    
      useEffect(() => {
        list()
        ListDate()
        totals()
        const unsubscribe = navigation.addListener('focus', () => {
          {list()}{ListDate()}{totals()}
        });
        return unsubscribe;
        }, [navigation]);
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
            <Text style={{paddingTop:20,fontSize: 20,textAlign: 'center',}}>รายการรายจ่าย</Text>
            <View style={{paddingHorizontal:30}}>
                <View style={{borderWidth:1,}}>
                </View>
            </View>
            <View style={{paddingTop:20}}></View>
            <View style={{backgroundColor:'#FFCC00'}}>
                <Text style={{paddingLeft:20,paddingVertical:5}}>{date}</Text>
            </View>
        <View style={{padding:15}}>

        </View>
        <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{borderTopWidth:1,borderLeftWidth:1,borderColor:'#707070',backgroundColor:'#fff', width:'75%'}}>
                
            </View>
            <View style={{borderColor:'#707070',backgroundColor:'#fff',width:'25%',borderBottomWidth:1,borderRightWidth:1}}>
             
            </View>
            
        </View>
        <FlatList 
              data={listPay}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
            <View style={{display:'flex',flexDirection: 'row',}}>
            <View style={{borderBottomWidth:1,borderLeftWidth:1,borderColor:'#707070',backgroundColor:'#fff', width:'75%'}}>
                <View style={{padding:5,paddingLeft:20,}}>
                    <Text style={{fontSize:13,paddingTop: 5}}>{item.name}</Text>
                </View>
            </View>
            <View style={{borderColor:'#707070',backgroundColor:'#fff',width:'25%',borderBottomWidth:1,borderRightWidth:1}}>
                <View style={{padding:5,paddingHorizontal:18}}>
                    <Text style={{fontSize:11,textAlign: 'center',color:'#fb1111'}}>{ abc(item.price*item.item)+'\n'+'(บาท)'}</Text>
                </View>
            </View>
            
        </View>
              }/>
               <View style={{paddingTop: 60}}></View>
                    
                    <View style={{borderTopWidth:1,borderBottomWidth:1,borderColor:'#707070',paddingVertical:10}}>
                    <View style={{display: 'flex',flexDirection: 'row',}}>
                        <Text style={{paddingLeft:15,}}>รายการ({listPay.length})</Text>
                        <Text style={{paddingLeft:20,color:'#00BE34'}}>{ abc(total.totals) }</Text>
                    </View>
                    </View>
<View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.replace('Home')}>
                        <Text style={styles.loginButtonText}>กลับหน้าหลัก</Text>
                    </TouchableOpacity>
</View>           
        </ScrollView>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#D4D4D4',
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
