import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator,Image } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Detail_notification({route,navigation}) {

    const [report, setReport] = useState('');

    const monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
    "ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

    

    useEffect(() => {
       
    }, [])
    return (
        <View style={styles.container}>
            
<ScrollView showsVerticalScrollIndicator={false}>
<View style={{paddingHorizontal:20,paddingTop:15}}>
    <View style={{backgroundColor:'#fff',borderRadius:10}}>
        <View style={{paddingHorizontal:10}}>
        <Text style={{fontSize:13,color:'#aaa',paddingTop:5}}>{new Date(route.params.date).getDate()+" "+monthNamesThai[new Date(route.params.date).getMonth()]+" "+new Date(route.params.date).getFullYear()+" "+new Date(route.params.date).getHours()+":"+new Date(route.params.date).getMinutes()+" น."}</Text>
        <Text style={{fontSize:16,paddingTop:7,paddingBottom:7}}>{route.params.title}</Text>
        <View style={{borderWidth:1,borderColor:'#ddd'}}/>
        <Text style={{fontSize:16,paddingTop:10,paddingBottom: 10}}>{route.params.detail}</Text>
        
        </View>
        </View>
</View>
</ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
