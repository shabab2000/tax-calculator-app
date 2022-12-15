import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView, ToastAndroid, Alert} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-community/picker';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Lodyons1({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [inc, setInc] = useState('');
    const [spouse, setSpouse] = useState('0');
    const [child, setChild] = useState('0');
    const [child2, setChild2] = useState('0');
    const [health, setHealth] = useState('0');
    const [antenatal, setAntenatal] = useState('0');
    const [disability, setDisability] = useState('0');
    const [status, setStatus] = useState('โสด');
    const [awn, setAwn] = useState(0);
    const [awns, setAwns] = useState(0);
    
    const status1 = itemValue => {
        
            setStatus(itemValue);
            setChild(0);
            setAwns(0);
    
    }

    const child1 = child-1;
    const childs = child <=0 ? 0 : child ==1 ? 30000 :  child1*60000+30000;
    
    const sumAwn = awn*30000;
    const sumAwns = awns*30000;

    const disability1 = disability<=0 ? 0 : disability*60000;

    const parents = sumAwn+sumAwns;
    
    const incy =  async () => {
        try {
                let uid = await AsyncStorage.getItem("uid");
        fetch('https://taxcalculator.ml/inc_y.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => {
            setInc(json.totals)
        })
        .catch((error) => console.log(error))
        } catch (err) {
            console.log(err);
        }};

    const incs = inc*60/100;
    console.log(incs)
    const handlePress = async () => {
        try {
                setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
                let idl = await AsyncStorage.getItem("idl");
            fetch('https://taxcalculator.ml/lodyons1.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
        spouse: spouse ? spouse : 0,
        inc: incs ? incs :0 ,
        child:childs ? childs : 0,
        child2: child2 ? child2 : 0,
        parents:parents ? parents : 0,
        health:health ? health : 0,
        antenatal:antenatal ? antenatal : 0,
        disability:disability1 ? disability1 : 0,
        uid: uid,
        idl:idl,
    
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
                setLoading(false)
              if(responseJson === 'success')
              {
                ToastAndroid.show('บันทึกสำเร็จ',1000)
                navigation.replace('Lodyons2')
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

    useEffect(() => {
        incy()
    })

    function abc(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
                    <Text style={{fontSize:16}}>หักค่าใช้จ่าย</Text>
                    <Text style={{fontSize:10}}>ร้อยละ 60 ของเงินได้</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <Text style={{fontSize:16,textAlign: 'center',color:'blue'}}>{abc(inc*60/100)}</Text>
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ลดหย่อนส่วนตัว</Text>
                    <Text style={{fontSize:10}}>60,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <Text style={{fontSize:16,textAlign: 'center',}}>{abc(60000)}</Text>
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',paddingRight:13}}>
                <View style={{paddingHorizontal:20,width:'50%'}}>
                    <Text style={{fontSize:16,paddingTop:10}}>สถานะสมรส</Text>
                    
                </View>
                <View style={{width:'50%',borderWidth:1,borderRadius: 10}}>
                    <Picker
        selectedValue={status}
        mode= "dropdown"
        //style={{  width: '100%' }}
        onValueChange={(itemValue, itemIndex) => status1(itemValue)}
      >
        <Picker.Item label="โสด" value="โสด" />
        <Picker.Item label="หย่า" value="หย่า" />
        <Picker.Item label="คู่สมรสมีเงินได้(แยกยื่น)" value="คู่สมรสมีเงินได้(แยกยื่น)" />
        <Picker.Item label="คู่สมรสไม่มีเงินได้" value="คู่สมรสไม่มีเงินได้" />
      </Picker>
                    </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>
            {status !== "โสด"?
            <View style={{display: 'flex',flexDirection: 'row',paddingTop:10}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:15}}>จำนวนบุตร</Text>
                    <Text style={{fontSize:10}}>คนแรก 30,000 บาท </Text>
                    <Text style={{fontSize:10}}>คนที่ 2 เป็นต้นไป เกิดปี 2561 เป็นต้นไป คนละ 60,000 บาท</Text>
                </View>
                <View style={{width:'25%',paddingLeft:10,paddingRight:5}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        Value={child}
                        onChangeText={(password) => setChild(password)}
                    />
                    </View>
                </View>
                <View style={{width:'15%'}}>
                    <Text style={{fontSize:16}}>คน</Text>
                </View>
            </View>
:null}
            <View style={{display: 'flex',flexDirection: 'row',paddingRight:13}}>
                <View style={{paddingHorizontal:20,width:'69%'}}>
                    <Text style={{fontSize:14,paddingTop:10}}>ลดหย่อนบิดา-มารดาตัวเอง</Text>
                    <Text style={{fontSize:10}}>คนละ 30,000 บาท (อายุ 60 ปีขึ้นไป และมีเงินได้ไม่เกิน 30,000 บาทต่อปี)</Text>
                    
                </View>
                <View style={{width:'31%',borderWidth:1,borderRadius: 10}}>
                    <Picker
        selectedValue={awn}
        mode= "dropdown"
        //style={{  width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setAwn(itemValue)}
      >
        <Picker.Item label="ไม่มี" value="0" />
        <Picker.Item label="1 คน" value="1" />
        <Picker.Item label="2 คน" value="2" />
      </Picker>
                    </View>
            </View>
{ status =="คู่สมรสไม่มีเงินได้" ?
<View>
            <View style={{display: 'flex',flexDirection: 'row',paddingRight:13,paddingTop:7}}>
                <View style={{paddingHorizontal:20,width:'69%'}}>
                    <Text style={{fontSize:14,paddingTop:10}}>ลดหย่อนบิดา-มารดาคู่สมรส</Text>
                    <Text style={{fontSize:10}}>คนละ 30,000 บาท (อายุ 60 ปีขึ้นไป และมีเงินได้ไม่เกิน 30,000 บาทต่อปี)</Text>
                    
                </View>
                <View style={{width:'31%',borderWidth:1,borderRadius: 10}}>
                    <Picker
        selectedValue={awns}
        mode= "dropdown"
        //style={{  width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setAwns(itemValue)}
      >
        <Picker.Item label="ไม่มี" value="0" />
        <Picker.Item label="1 คน" value="1" />
        <Picker.Item label="2 คน" value="2" />
      </Picker>
                    </View>
            </View>
            </View>
            :null}

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ประกันสุขภาพบิดามารดา</Text>
                    <Text style={{fontSize:10}}>ตามจำนวนจริงที่จ่ายจริง แต่ไม่เกิน 15,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setHealth(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ค่าฝากครรภ์และคลอดบุตร</Text>
                    <Text style={{fontSize:10}}>60,000 บาท</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setAntenatal(password)}
                    />
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>อุปการะเลี้ยงดูคนพิการหรือคนทุพพลภาพ</Text>
                    <Text style={{fontSize:10}}>คนละ 60,000 บาท (มีเงินได้ไม่เกิน 30,000 บาทต่อปี)</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <TextInput
                        placeholder=""
                        style={{ fontSize: 16,textAlign: 'center',}}
                        keyboardType= 'number-pad'
                        onChangeText={(password) => setDisability(password)}
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
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5}} onPress={() => handlePress()}>
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
