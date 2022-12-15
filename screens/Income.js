import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert, ToastAndroid,ActivityIndicator} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Income({route,navigation}) {

    const [total, setTotal] = useState('');
    const [types, setTypes] = useState(route.params.types);
    const [loading, setLoading] = useState(false);

    

    const inca =  async () => {
        try {
           // setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
        fetch('https://taxcalculator.ml/inc_a.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => { setTotal(json.totals)
                           // setLoading(false)
                        })
        .catch((error) => console.log(error))
        } catch (err) {
            console.log(err);
        }};

      const incz =  async () => {
            try {
               // setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
            fetch('https://taxcalculator.ml/inc_z.php?uid='+uid)
            .then((response) => response.json())
            .then((json) => { setTotal(json.totals)
                           //  setLoading(false)
            })
            .catch((error) => console.log(error))
            } catch (err) {
                console.log(err);
            }
        }

        types == 'inca' ? inca() : incz()
//     if(types == 'inca'){
//        inca()
//     } else if (types == 'incz'){
//     incz()
// }

console.log(total)

    function abc(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      const handlePress = async () => {
        try {
            setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
            fetch('https://taxcalculator.ml/income.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
        income: total ? total : 0,
        lodyon:'ครึ่งปี',
        types: types =='inca'? "มกราคม - มิถุนายน":"กรกฎาคม - ธันวาคม",
        uid: uid,

        })
      }).then((response) => response.json()) 
            .then((responseJson) => {
                setLoading(false)
              if(responseJson.result === 'success')
              {
                AsyncStorage.setItem('idl',responseJson.idl);
                navigation.replace('Lodyon');
              } else{
                Alert.alert('แจ้งเตือน!',responseJson.result);
              }
            }).catch((error) => {
              console.log(error);
            });
        } catch (err) {
            console.log(err);
        }
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
          <View style={{paddingTop:15}}/>
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '34%',backgroundColor:'#FFCC00',borderRightWidth:1,borderColor:'#aaa'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>เงินได้</Text>
                </View>
                <View style={{width: '33%',backgroundColor:'#FFDA48',borderRightWidth:1,borderColor:'#aaa'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>ลดหย่อน</Text>
                </View>
                <View style={{width: '33%',backgroundColor:'#FFDA48'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>คำนวณภาษี</Text>
                </View>
            </View>
          <View style={{paddingTop:20}}/>
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เงินได้/รายได้</Text>
                    <Text style={{fontSize:10}}>เงินได้ หรือรายได้ที่ได้ตลอดทั้ง6เดือนรวมกัน</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <Text style={{fontSize:16,textAlign: 'center',}}>{ total ? abc(total) : total == 0 ? <ActivityIndicator size='large' color='#0000ff'  />:0}</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingHorizontal:15,paddingTop:10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>
            <View style={{marginTop:'120%'}}>
            <View style={{flexDirection: 'row'}}>
            <View style={{width:'50%',borderRightWidth:1,borderColor:'#fff'}}>
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5,}} onPress={() =>navigation.goBack()}>
                    <Text style={{color:'#fff',textAlign: 'center',fontSize: 18}}>กลับ</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'50%'}}>
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5,}} onPress={() => handlePress()}>
                    <Text style={{color:'#fff',textAlign: 'center',fontSize: 18}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
     container: {
         flex: 1,
     }
})
