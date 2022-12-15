import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ToastAndroid, Alert} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Lodyon3({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [real_estate, setReal_estate] = useState('0');
    const [interest_loans, setInterest_loans] = useState('0');
    const [fees_debit, setFees_debit] = useState('0');
    const [political_donation, setPolice_donation] = useState('0');

    const handlePress = async () => {
        try {
            setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
                let idl = await AsyncStorage.getItem("idl");
            fetch('https://taxcalculator.ml/lodyon3.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
            real_estate: real_estate ? real_estate : 0,
            interest_loans: interest_loans ? interest_loans : 0,
            fees_debit:fees_debit ? fees_debit : 0,
            political_donation: political_donation ? political_donation : 0,
            uid: uid,
            idl:idl,
    
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
                setLoading(false)
              if(responseJson === 'success')
              {
                ToastAndroid.show('บันทึกสำเร็จ',1000)
                navigation.replace('Lodyon4')
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
                    <Text style={{fontSize:16}}>ค่าซื้ออสังหาริมทรัพย์</Text>
                    <Text style={{fontSize:10}}>มูลค่าไม่เกิน 1,500,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setReal_estate(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ดอกเบี้ยเงินกู้ยืมเพื่อซื้อหรือสร้างอาคารที่อยู่อาศัย</Text>
                    <Text style={{fontSize:10}}>ตามจำนวนที่จ่ายจริง แต่ไม่เกิน 50,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setInterest_loans(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ค่าธรรมเนียมจากการรับชำระเงินด้วยบัตรเดบิต</Text>
                    <Text style={{fontSize:10}}>2 เท่าของค่าธรรมเนียมที่เกิดขึ้น ระหว่างวันที่ 1 พ.ย. 2559-31 ธ.ค. 2564</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setFees_debit(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>บริจาคพรรคการเมือง</Text>
                    <Text style={{fontSize:10}}>ตามจำนวนที่จ่ายจริง แต่ไม่เกิน 5,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setPolice_donation(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{marginTop:'25%'}}>
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
