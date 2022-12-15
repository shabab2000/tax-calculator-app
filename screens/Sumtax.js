import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Sumtax({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [lodyon,setLodyon] = useState('');
    const load =  async () => {
        //setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
                let idl = await AsyncStorage.getItem("idl");
        fetch('https://taxcalculator.ml/sumlodyons.php?uid='+uid+'&idl='+idl)
        .then((response) => response.json())
        .then((json) => {
            setLodyon(json)
            setLoading(false)
        })
        .catch((error) => console.error(error))
    }
     useEffect(() => {
         load()
     })

     function abc(x) {
        return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
                <View style={{width: '33%',backgroundColor:'#FFDA48',borderRightWidth:1,borderColor:'#aaa'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>ลดหย่อน</Text>
                </View>
                <View style={{width: '33%',backgroundColor:'#FFCC00'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>คำนวณภาษี</Text>
                </View>
            </View>
          <View style={{paddingTop:20}}/>
          <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'55%'}}>
                    <Text style={{fontSize:18}}>เงินได้สุทธิ</Text>
                </View>
                <View style={{width:'45%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                        <Text style={{fontSize:16,textAlign: 'center',}}>{lodyon.total ? abc(lodyon.total):0}</Text>
                    </View>
                </View>
            </View>

            <View style={{paddingHorizontal:15,paddingTop:10, paddingBottom: 10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'55%'}}>
                    <Text style={{fontSize:18}}>ภาษี</Text>
                    
                    

                </View>
                <View style={{width:'45%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <Text style={{fontSize:16,textAlign: 'center',}}>{lodyon.tax =='ยกเว้นภาษี'?'ยกเว้นภาษี':lodyon.tax ? abc(lodyon.tax):0}</Text>
                    </View>
                </View>
                
            </View>

            <View style={{paddingHorizontal:20}}>
            <Text style={{fontSize:10}}>
                    เงินได้ 0 - 150,000                 ยกเว้นภาษี
                    </Text>
                    <Text style={{fontSize:10}}>
                    เงินได้ 150,001 - 300,000       อัตราภาษี 5%
                    </Text>
                    <Text style={{fontSize:10}}>
                    เงินได้ 300,001 - 500,000       อัตราภาษี 10%
                    </Text>
                    <Text style={{fontSize:10}}>
                    เงินได้ 500,001 - 750,000       อัตราภาษี 15%
                    </Text>
                    <Text style={{fontSize:10}}>
                    เงินได้ 750,001 - 1,000,000     อัตราภาษี 20%
                    </Text>
                    <Text style={{fontSize:10}}>
                    เงินได้ 1,000,001 - 2,000,000  อัตราภาษี 25%
                    </Text>
                    <Text style={{fontSize:10}}>
                    เงินได้ 2,000,001 - 5,000,000  อัตราภาษี 30%
                    </Text>
                    <Text style={{fontSize:10}}>
                    เงินได้ 5,000,001  ขึ้นไป           อัตราภาษี 35%
                    </Text>
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
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5,}} onPress={() => navigation.replace('Report')}>
                    <Text style={{color:'#fff',textAlign: 'center',fontSize: 18}}>บันทึก</Text>
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
