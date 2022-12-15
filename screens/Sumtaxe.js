import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Sumtaxe({route,navigation}) {

    const [loading, setLoading] = useState(false);
    const [lodyon,setLodyon] = useState('');
    
    const load =  async () => {
        //setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
                let idl = await AsyncStorage.getItem("idl");
        fetch('https://taxcalculator.ml/sumlodyone.php?uid='+uid+'&idl='+idl)
        .then((response) => response.json())
        .then((json) => {
            setLodyon(json)
            setLoading(false)
        })
        .catch((error) => console.error(error))
    }

    const handlePress = async () => {
        try {
            let idl = await AsyncStorage.getItem("idl");
            setLoading(true)
                let uid = await AsyncStorage.getItem("uid");
            fetch('https://taxcalculator.ml/incomees.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
        deduct:lodyon.deduct,
        taxs: lodyon.taxs,
        id: idl,

        })
      }).then((response) => response.json()) 
            .then((responseJson) => {
                setLoading(false)
              if(responseJson.result === 'success')
              {
                navigation.replace('Report')
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
                <View style={{width: '50%',backgroundColor:'#FFDA48',borderRightWidth:1,borderColor:'#aaa'}}>
                    <Text style={{fontSize:16,textAlign: 'center',paddingVertical:10}}>เงินได้</Text>
                </View>
                <View style={{width: '50%',backgroundColor:'#FFCC00'}}>
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
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>หักค่าใช้จ่าย</Text>
                    <Text style={{fontSize:10}}>ร้อยละ 0.1 ของเงินได้</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <Text style={{fontSize:16,textAlign: 'center',}}>0.1%</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingHorizontal:15,paddingTop:10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>
          <View style={{paddingTop:10}}/>
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{paddingHorizontal:20,width:'65%'}}>
                    <Text style={{fontSize:16}}>ภาษี</Text>
                </View>
                <View style={{width:'35%',paddingHorizontal:15}}>
                    <View style={{borderWidth:1,borderRadius: 10}}>
                    <Text style={{fontSize:16,textAlign: 'center',}}>{ lodyon.taxs ? abc(lodyon.taxs) : lodyon.taxs == 0 ? <ActivityIndicator size='large' color='#0000ff'  />:0 }</Text>
                    </View>
                </View>
            </View>
            <View style={{paddingHorizontal:15,paddingTop:10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View>
            
            
            <View style={{marginTop:'90%'}}>
            <View style={{flexDirection: 'row'}}>
            <View style={{width:'50%',borderRightWidth:1,borderColor:'#fff'}}>
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5,}} onPress={() =>navigation.goBack()}>
                    <Text style={{color:'#fff',textAlign: 'center',fontSize: 18}}>กลับ</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'50%'}}>
                <TouchableOpacity style={{backgroundColor:'blue',paddingVertical:5,}} onPress={() => handlePress()}>
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
