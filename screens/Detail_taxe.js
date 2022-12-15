import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,Alert, ScrollView } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail_taxe({route,navigation}) {

    const [id,setId] = useState(route.params.id);
    const [a, setA] = useState('');
    const [a2, setA2] = useState('');
    const [a3, setA3] = useState('');
    const [a4, setA4] = useState('');
    const [tax, setTax] = useState('');
    const [sumlodyon,setSumlodyon] = useState('');
    const sum =1;
    function abc(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={{textAlign: 'center', fontSize: 16,paddingTop:10, paddingBottom: 10}}>รายงานข้อมูลภาษีเขตพัฒนาเศรษฐกิจพิเศษ</Text>
            <View style={{backgroundColor: 'white',paddingHorizontal:6,borderRadius: 10}}>
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}>รายได้จากการขายสินค้า</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{abc(route.params.income ? route.params.income :0)}</Text>
                </View>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าใช้จ่ายร้อยละ 0.1</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}> 0.1%</Text>
                
                </View>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:18,paddingVertical:10}}> ภาษีที่ต้องชำระ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{abc(route.params.tax ? route.params.tax : 0)}</Text>
                
                </View>
            </View>
            
                <View style={{paddingHorizontal:10}}>
                   
                <View style={{paddingVertical:10,}}>
                    <View style={{backgroundColor:'#FFCC00'}}>
                    <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:14,paddingVertical:10,fontWeight: 'bold',paddingLeft:10}}>รวมภาษีที่ต้องชำระ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:14,textAlign: 'center',paddingVertical:10}}>
                    {abc(route.params.tax ? route.params.tax : 0)}
                    </Text>
                </View>
            </View>
                    </View>
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
