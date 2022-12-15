import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ToastAndroid, Alert} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Lodyon4({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [education_funding, setEducation_funding] = useState('0');
    const [general_donation, setGeneral_donation] = useState('0');

    const handlePress = async () => {
        try {
            setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
                let idl = await AsyncStorage.getItem("idl");
            fetch('https://taxcalculator.ml/lodyon4.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
            education_funding: education_funding ? education_funding : 0,
            general_donation: general_donation ? general_donation : 0,
            uid: uid,
            idl:idl,
    
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
                setLoading(false)
              if(responseJson === 'success')
              {
                ToastAndroid.show('บันทึกสำเร็จ',1000)
                navigation.replace('SumLodyon')
              } else{
                Alert.alert('แจ้งเตือน!',responseJson);
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
                <View style={{width: '34%',backgroundColor:'#FFDA48',borderRightWidth:1,borderColor:'#aaa'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>เงินได้</Text>
                </View>
                <View style={{width: '33%',backgroundColor:'#FFCC00',borderRightWidth:1,borderColor:'#aaa'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>ลดหย่อน</Text>
                </View>
                <View style={{width: '33%',backgroundColor:'#FFDA48'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>คำนวณภาษี</Text>
                </View>
            </View>
          <View style={{paddingTop:20}}/>
          <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เงินสนับสนุนการศึกษา /การกีฬา / อื่นๆ</Text>
                    <Text style={{fontSize:10}}>2 เท่าของจำนวนที่จ่ายจริงแต่ไม่เกิน ร้อยละ 10 ของเงินได้หลัง
หักค่าลดหย่อน</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setEducation_funding(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เงินบริจาคทั่วไป</Text>
                    <Text style={{fontSize:10}}>ตามที่จ่ายจริงแต่ไม่เกิน ร้อยละ 10 ของเงินได้หลังหักค่าลดหย่อน</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setGeneral_donation(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            
            <View style={{marginTop:'70%'}}>
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
