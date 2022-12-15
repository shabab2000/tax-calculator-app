import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView,ToastAndroid, Alert} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Lodyons2({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [life_ins, setLife_ins ] = useState('0');
    const [health_ins, setHealth_ins] = useState('0');
    const [pension_ins, setPension_ins] = useState('0');
    const [provident_fund, setProvident_fund] = useState('0');
    const [national_savings, setNational_savings] = useState('0');
    const [retirement_mutual, setRetirement_mutual] = useState('0');
    const [ssf, setSSF] = useState('0');
    const [ssf_special, setSsf_special] = useState('0');

    const handlePress = async () => {
        try {
            setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
                let idl = await AsyncStorage.getItem("idl");
            fetch('https://taxcalculator.ml/lodyons2.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
            life_ins: life_ins ? life_ins : 0,
            health_ins: health_ins ? health_ins : 0,
            pension_ins:pension_ins ? pension_ins : 0,
            provident_fund: provident_fund ? provident_fund : 0,
            national_savings:national_savings ? national_savings : 0,
            retirement_mutual:retirement_mutual ? retirement_mutual : 0,
            ssf:ssf ? ssf : 0,
            ssf_special:ssf_special ? ssf_special : 0,
            uid: uid,
            idl:idl,
    
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
                setLoading(false)
              if(responseJson === 'success')
              {
                ToastAndroid.show('บันทึกสำเร็จ',1000)
                navigation.replace('Lodyons3')
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
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เบี้ยประกันชีวิต</Text>
                    <Text style={{fontSize:10}}> ตามจำนวนจริง</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setLife_ins(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เบี้ยประกันสุขภาพ</Text>
                    <Text style={{fontSize:10}}>ตามจำนวนที่จ่ายจริง แต่ไม่เกิน 25,000 บาท </Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setHealth_ins(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เบี้ยประกันชีวิตแบบบำนาญ</Text>
                    <Text style={{fontSize:10}}>ไม่เกินร้อยละ 15 ของเงินได้ และไม่เกิน 200,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setPension_ins(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เงินสะสมกองทุนสำรองเลี้ยงชีพ</Text>
                    <Text style={{fontSize:10}}>ไม่เกินร้อยละ 15 ของเงินได้ และไม่เกิน 500,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setProvident_fund(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>เงินสะสมกองทุนการออมแห่งชาติ (กอช.)</Text>
                    <Text style={{fontSize:10}}>ตามจำนวนที่จ่ายจริง แต่ไม่เกิน 13,200 บาท  </Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setNational_savings(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อการเลี้ยงชีพ RMF</Text>
                    <Text style={{fontSize:10}}>ไม่เกินร้อยละ 30 ของเงินได้ และไม่เกิน 500,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setRetirement_mutual(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อการออม SSF</Text>
                    <Text style={{fontSize:10}}>ไม่เกินร้อยละ 30 ของเงินได้ และไม่เกิน 200,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setSSF(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อการออม SSF (พิเศษ)</Text>
                    <Text style={{fontSize:10}}>ไม่เกินร้อยละ 30 ของเงินได้ และไม่เกิน 200,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setSsf_special(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>
            </ScrollView>
            <View style={{marginTop:'5%'}}>
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
