import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,Alert,FlatList } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function List_tax({route,navigation}) {

    const [user, setUser] = useState('');
    const [taxs,setTaxs] = useState('');
    const [loading,setLoading] = useState(false)

    const list = async () => {
        try {
            setLoading(true)
            let uid = await AsyncStorage.getItem("uid");
             fetch('https://taxcalculator.ml/profile.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => {
            setUser(json)
            setLoading(false)
        })
        .catch((error) => Alert.alert(error))
        } catch (err) {
            Alert.alert(err);
        }
    };

    const monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
"ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

    const tax = async () => {
        try {
            setLoading(true)
            let uid = await AsyncStorage.getItem("uid");
             fetch('https://taxcalculator.ml/tax.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => {
            setTaxs(json)
            setLoading(false)
        })
        .catch((error) => Alert.alert(error))
        } catch (err) {
            Alert.alert(err);
        }
    };
    function abc(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

    useEffect(() => {
        list()
        tax()
        const unsubscribe = navigation.addListener('focus', () => {
          {list()}
          {tax()}
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
            <Text style={{textAlign: 'center', fontSize: 18,paddingTop:10, paddingBottom: 10}}>รายงานข้อมูลภาษี</Text>
{taxs.length > 0 ?
            <FlatList 
              data={taxs}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
         <ListItem  bottomDivider topDivider onPress={() => item.lodyon =='เขตพัฒนาเศรษฐกิจพิเศษ'? navigation.navigate('Detail_taxe',{id:item.id,income:item.income,lodyon:item.lodyon,tax:item.tax,deduct:item.deduct}) : navigation.navigate('Detail_tax',{id:item.id,income:item.income,lodyon:item.lodyon})}>
      <FontAwesome5 name="circle" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title> <Text style={{}}>{new Date(item.date).getDate()+" "+monthNamesThai[new Date(item.date).getMonth()]+" "+new Date(item.date).getFullYear()} </Text> <Text style={{}}>{item.lodyon=='ปี'? 'แบบเหมาจ่าย 60% (รายปี)':item.lodyon=='ครึ่งปี'? 'แบบเหมาจ่าย 60% (รายครึ่งปี)':'แบบเขตพัฒนาเศรษฐกิจพิเศษ'}</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
             }/>
             :<Text style={{textAlign:'center'}}>ไม่มีข้อมูลภาษี</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
