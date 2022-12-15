import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-datepicker'
import { WebView } from 'react-native-webview';

export default function Daily({route,navigation}) {

    const [user, setUser] = useState('');
    const [data, setData] =useState('');
    const [date,setDate] = useState('');

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

    useEffect(() => {
        list()
        const unsubscribe = navigation.addListener('focus', () => {
          {list()}
        });
        return unsubscribe;
        }, [navigation]);

//     const monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
// "ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

// const d = new Date(payDate.date);
// const year = d.getFullYear()+543;

// const date = d.getDate()+" "+monthNamesThai[d.getMonth()]+" "+year.toString().substr(-2);

    // const list = async () => {
    //     try {
    //         let pid = await AsyncStorage.getItem("pid");
    //          fetch('https://taxcalculator.tk/listpays.php?pid='+pid)
    //     .then((response) => response.json())
    //     .then((json) => setListPay(json))
    //     .catch((error) => console.error(error))
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // const ListDate = async () => {
    //     try {
    //         let id = await AsyncStorage.getItem("pid");
    //          fetch('https://taxcalculator.tk/paydate.php?id='+id)
    //     .then((response) => response.json())
    //     .then((json) => setPayDate(json))
    //     .catch((error) => console.error(error))
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // function abc(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //   }
    
    //   useEffect(() => {
    //     list()
    //     ListDate()
    //     const unsubscribe = navigation.addListener('focus', () => {
    //       {list()}{ListDate()}
    //     });
    //     return unsubscribe;
    //     }, [navigation]);
    return (
        <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <View style={styles.hr}></View>
            </View>
            <View style={{ left: 30 ,backgroundColor: '#FFCC00' , width:'81%' , alignItems: 'center' }}>
                    <DatePicker
        style={{width: '100%'}}
        date={date}
        mode="date"
        placeholder="เลือกวันที่"
        //format="DD-MM-YYYY"
        //minDate="2016-05-01"
        maxDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            width:0,
            height:0,
            },
          placeholderText: {
            fontSize: 15,
            color: "#000"
            },
          dateInput: {
            paddingHorizontal:10,
            borderWidth: 0,
            alignItems: "flex-start",
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
            setDate(date)
        }}
      />
                    </View>
                    <View style={{padding: 10}}/>
                    {date ? 
                    <WebView 
      style={styles.container}
      source={{ uri: 'https://taxcalculator.ml/daily.php?uid='+user.id+'&d='+date }}
    />:null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#eee',
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
