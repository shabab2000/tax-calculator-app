import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,Alert, ScrollView } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Detail_tax({route,navigation}) {

    const [id,setId] = useState(route.params.id);
    const [a, setA] = useState('');
    const [a2, setA2] = useState('');
    const [a3, setA3] = useState('');
    const [a4, setA4] = useState('');
    const [tax, setTax] = useState('');
    const [sumlodyon,setSumlodyon] = useState('');
    
    const se = route.params.income *  30/100 ;
    const see = route.params.income *  60/100 ;
    const dd = route.params.lodyon == 'ครึ่งปี'? se : see;
    const sum = route.params.income- dd;
    const tax1 = 150000*5/100;
    const tax2 = tax1*5/100;
    const tax3 = tax1*10/100;
    const tax4 = tax1*15/100;
    const tax5 = tax1*20/100;
    const tax6 = tax1*25/100;
    const tax7 = tax1*30/100;
    const tax8 = tax1*35/100;

    const total = tax2;

    console.log( a ? a.a1.inc:'')
    function abc(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

    const lodyon =  () => {
        try {
             fetch('https://taxcalculator.ml/detail_tax.php?id='+id)
        .then((response) => response.json())
        .then((json) => setA(json))
        .catch((error) => Alert.alert(error))
        } catch (err) {
            Alert.alert(err);
        }
    };
    

    const taxs =  async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
             fetch('https://taxcalculator.ml/sumlodyons.php?uid='+uid+'&idl='+id)
        .then((response) => response.json())
        .then((json) => setTax(json))
        .catch((error) => Alert.alert(error))
        } catch (err) {
            Alert.alert(err);
        }
    };

    const lodyons =  async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
             fetch('https://taxcalculator.ml/sumlodyon.php?uid='+uid+'&idl='+id)
        .then((response) => response.json())
        .then((json) => setSumlodyon(json))
        .catch((error) => Alert.alert(error))
        } catch (err) {
            Alert.alert(err);
        }
    };

    const lodyon3 =  () => {
        try {
             fetch('https://taxcalculator.ml/profile.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => setA3(json))
        .catch((error) => Alert.alert(error))
        } catch (err) {
            Alert.alert(err);
        }
    };

    const lodyon4 =  () => {
        try {
             fetch('https://taxcalculator.ml/profile.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => setA4(json))
        .catch((error) => Alert.alert(error))
        } catch (err) {
            Alert.alert(err);
        }
    };

    useEffect(() => {
     lodyon()
     lodyons()
     taxs()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={{textAlign: 'center', fontSize: 20,paddingTop:10, paddingBottom: 10}}>รายงานข้อมูลภาษี</Text>
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
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าใช้จ่ายเป็นการเหมาจ่าย ({route.params.lodyon == 'ครึ่งปี'?'30%':'60%'})</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{route.params.lodyon == 'ครึ่งปี'? a? abc(a.a1.inc):null: a ? abc(a.a1.inc):null}</Text>
                
                </View>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10,fontWeight: 'bold'}}>เงินได้หลังหักค่าใช้จ่าย</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ sum ? abc(sum) :0}</Text>
                </View>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าลดหย่อนส่วนตัว</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a1.personal):0 }</Text>
                </View>
            </View>
            {a ? a.a1.child !== '0' ? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าลดหย่อนบุตร</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a1.child):0 }</Text>
                </View>
            </View>
            :null:null}
        {a ? a.a1.parents !== '0' ? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าลดหย่อนอุปการะเลี้ยงดูบิดามารดา</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{a? abc(a.a1.parents):0}</Text>
                </View>
            </View>
:null:null}
{a ? a.a1.health !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ประกันสุขภาพบิดามารดา</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a1.health):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a1.antenatal !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าฝากครรภ์และคลอดบุตร</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a1.antenatal):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a1.disability !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> อุปการะเลี้ยงดูคนพิการหรือคนทุพพลภาพ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a1.disability):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.life_insurance !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> เบี้ยประกันชีวิต</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.life_insurance):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.health_insurance !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> เบี้ยประกันสุขภาพ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.health_insurance):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.pension_insurance !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> เบี้ยประกันชีวิตแบบบำนาญ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.pension_insurance):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.provident_fund !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> เงินสะสมกองทุนสำรองเลี้ยงชีพ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.provident_fund):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.national_savings_fund !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> เงินสะสมกองทุนการออมแห่งชาติ (กอช.)</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.national_savings_fund):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.retirement_mutual_fund !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อเลี้ยงชีพ RMF</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.retirement_mutual_fund):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.ssf !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อการออม SSF</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.ssf):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a2.ssf_special !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อการออม SSF (พิเศษ)</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a2.ssf_special):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a3.real_estate !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าซื้ออสังหาริมทรัพย์</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a3.real_estate):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a3.interest_loans !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ดอกเบี้ยเงินกู้ยืมเพื่อซื้อหรือสร้างอาคารที่อยู่อาศัย</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a3.interest_loans):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a3.fees_debit !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> ค่าธรรมเนียมจากการรับชำระเงินด้วยบัตรเดบิต</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a3.fees_debit):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a3.political_donation !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> บริจาคพรรคการเมือง</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a3.political_donation):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a4.education_funding !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> เงินสนับสนุนการศึกษา / การกีฬา / อื่นๆ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a4.education_funding):0 }</Text>
                </View>
            </View>
:null:null}
{a ? a.a4.general_donation !== '0'? 
            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:12,paddingVertical:10}}><Text style={{fontSize:12,fontWeight: 'bold'}}>หัก</Text> เงินบริจาคทั่วไป</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:12,textAlign: 'center',paddingVertical:10}}>{ a? abc(a.a4.general_donation):0 }</Text>
                </View>
            </View>
:null:null}

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:14,paddingVertical:10,fontWeight: 'bold'}}>รวมค่าลดหย่อน</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:14,textAlign: 'center',paddingVertical:10}}>{sumlodyon ? abc(sumlodyon.total):0}</Text>
                </View>
            </View>

            <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:14,paddingVertical:10,fontWeight: 'bold'}}>เงินได้สุทธิ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:14,textAlign: 'center',paddingVertical:10}}>{tax ? abc(tax.total):0}</Text>
                </View>
            </View>
                <View style={{paddingTop:20,paddingHorizontal:10}}>
                    <Text style={{fontSize:14,fontWeight: 'bold',paddingLeft:5}}>ภาษี:</Text>
                    <View style={{paddingLeft:10}}>
                    <Text style={{fontSize:11,}}>1 - 150,000   =   ได้รับการยกเว้น</Text>
                    {tax.total>=150001?<Text style={{fontSize:11,}}>150,001 - 300,000  =   5%   =  {tax ? abc(tax.t2):0} </Text>: null}
                    {tax.total>=300001?<Text style={{fontSize:11,}}>300,001 - 500,000  =   10%   =  {tax ? abc(tax.t3):0} </Text>: null}
                    {tax.total>=500001?<Text style={{fontSize:11,}}>500,001 - 750,000  =   15%   =  {tax ? abc(tax.t4):0} </Text>: null}
                    {tax.total>=750001?<Text style={{fontSize:11,}}>750,001 - 1,000,000  =   20%   =  {tax ? abc(tax.t5):0} </Text>: null}
                    {tax.total>=1000001?<Text style={{fontSize:11,}}>1,000,001 - 2,000,000  =   25%   =  {tax ? abc(tax.t6):0} </Text>: null}
                    {tax.total>=2000001?<Text style={{fontSize:11,}}>2,000,001 - 5,000,000  =   30%   =  {tax ? abc(tax.t7):0} </Text>: null}
                    {tax.total>=5000001?<Text style={{fontSize:11,}}>5,000,000 ขึ้นไป  =   35%   =  {tax ? abc(tax.t8):0} </Text>: null}
                    </View>
                <View style={{paddingVertical:10,}}>
                    <View style={{backgroundColor:'#FFCC00'}}>
                    <View style={{display: 'flex',flexDirection: 'row',}}>
                <View style={{width: '65%'}}>
                    <Text style={{fontSize:14,paddingVertical:10,fontWeight: 'bold',paddingLeft:10}}>รวมภาษีที่ต้องชำระ</Text>
                </View>
                <View style={{width: '35%'}}>
                    <Text style={{fontSize:14,textAlign: 'center',paddingVertical:10}}>
                    {tax ? abc(tax.tax):0}
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
