import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View, ScrollView,Image,TouchableOpacity, TextInput, ToastAndroid, Alert} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function SumLodyon({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [lodyon,setLodyon] = useState('');
    const load =  async () => {
        setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
                let idl = await AsyncStorage.getItem("idl");
        fetch('https://taxcalculator.ml/sumlodyon.php?uid='+uid+'&idl='+idl)
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
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{paddingTop: 25,textAlign: 'center',fontSize: 23,paddingBottom: 10}}>รายการลดหย่อน</Text>
            <View style={{padding:10}}>
            <View style={{display: 'flex',flexDirection: 'row',backgroundColor:'#ddd',padding:10,borderRadius: 5}}>
                <View style={{paddingHorizontal:20,width:'60%'}}>
                    <Text style={{fontSize:16}}>ลดหย่อนกลุ่มที่ 1</Text>
                </View>
                <View style={{width:'40%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10,backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16}}>{lodyon.lodyon1? abc(lodyon.lodyon1):0}</Text>
                    </View>
                </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={{display: 'flex',flexDirection: 'row',backgroundColor:'#ddd',padding:10,borderRadius: 5}}>
                <View style={{paddingHorizontal:20,width:'60%'}}>
                    <Text style={{fontSize:16}}>ลดหย่อนกลุ่มที่ 2</Text>
                </View>
                <View style={{width:'40%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10,backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16}}>{lodyon.lodyon2? abc(lodyon.lodyon2):0}</Text>
                    </View>
                </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={{display: 'flex',flexDirection: 'row',backgroundColor:'#ddd',padding:10,borderRadius: 5}}>
                <View style={{paddingHorizontal:20,width:'60%'}}>
                    <Text style={{fontSize:16}}>ลดหย่อนกลุ่มที่ 3</Text>
                </View>
                <View style={{width:'40%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10,backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16}}>{lodyon.lodyon3? abc(lodyon.lodyon3):0}</Text>
                    </View>
                </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={{display: 'flex',flexDirection: 'row',backgroundColor:'#ddd',padding:10,borderRadius: 5}}>
                <View style={{paddingHorizontal:20,width:'60%'}}>
                    <Text style={{fontSize:16}}>ลดหย่อนกลุ่มที่ 4</Text>
                </View>
                <View style={{width:'40%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10,backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16}}>{lodyon.lodyon4? abc(lodyon.lodyon4):0}</Text>
                    </View>
                </View>
            </View>
            </View>
            <View style={{padding:10}}>
            <View style={{display: 'flex',flexDirection: 'row',backgroundColor:'#ddd',padding:10,borderRadius: 5}}>
                <View style={{paddingHorizontal:20,width:'60%'}}>
                    <Text style={{fontSize:16}}>รวมค่าลดหย่อน</Text>
                </View>
                <View style={{width:'40%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10,backgroundColor:'#fff'}}>
                    <Text style={{fontSize:16}}>{lodyon.total? abc(lodyon.total):0}</Text>
                    </View>
                </View>
            </View>
            </View>

            <View style={{marginTop:'25%'}}>
            <View style={{flexDirection: 'row'}}>
            <View style={{width:'50%',borderRightWidth:1,borderColor:'#fff'}}>
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5,}} onPress={() => navigation.goBack()}>
                    <Text style={{color:'#fff',textAlign: 'center',fontSize: 18}}>กลับ</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'50%'}}>
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5,}} onPress={() => navigation.replace('Sumtax')}>
                    <Text style={{color:'#fff',textAlign: 'center',fontSize: 18}}>ถัดไป</Text>
                </TouchableOpacity>
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
