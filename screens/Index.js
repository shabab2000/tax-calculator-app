import React,{useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView,CheckBox,Alert } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNModal from 'react-native-modal';

export default function Index({navigation}) {

    const [show,setShow] = useState(false);
    const [isAccept, setAccept] = useState(false);
    const [accepts, setAccepts] = useState(0);

    AsyncStorage.getItem('uid').then(value =>{
        if (value !== null){
          navigation.replace('Home');
    }
    })

    const not_accept = () => {
        setShow(false);
        setAccept(false);
        setAccepts(0);
    };
    const accept = () => {
      setShow(false);
      setAccept(true);
      setAccepts(1);

    }

    return (
        <View style={styles.container}>
        <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 150 , paddingBottom: 10}}>
            <Image source={require('./img/tax.png')} style={{width: 200, height: 150}}/>
        </View>
            <RNModal
                isVisible={show}
                animationIn='zoomIn'
                animationOut='zoomOut'
            >
                <View style={styles.modal}>
                    <Text style={{textAlign: 'center', fontSize:18}}>เงื่อนไขและข้อตกลง Taxcalculator</Text>
                <ScrollView>
                    
                        <Text style={{}}>               	เนื่องจากการบันทึกรายรับ-รายจ่ายและการคำนวณภาษีผ่านแอปพลิเคชัน ออกแบบมาให้เราใช้เองได้ง่าย ๆ ลดขั้นตอนความยุ่งยากไปพอสมควร ดังนั้น ในคนที่มีรายได้จากหลายแหล่ง หรือมีรายละเอียดการหักลดหย่อนภาษีบางประการ จะมีข้อจำกัดที่ไม่สามารถคำนวณภาษีผ่านแอปพลิเคชันบริหารจัดการบัญชีร้านค้าได้ ก็คือ

                        {'\n'}    -	 แอปฯ นี้ใช้คำนวณภาษีเฉพาะ ภ.ง.ด.90/94 เท่านั้น คือต้องมีรายได้จากเงินได้ เพียงอย่างเดียว ก็คือ
เงินได้พึงประเมินประเภทที่ 8 คือ เงินได้จากธุรกิจ การพาณิชย์ การเกษตร การอุตสาหกรรม การขนส่ง การขายอสังหาริมทรัพย์ การขายหน่วยลงทุนคืนให้แก่กองทุนรวมเพื่อการเลี้ยงชีพตามกฎหมายว่าด้วยหลักทรัพย์และตลาดหลักทรัพย์ ทั้งที่ได้รับยกเว้นภาษีเงินได้และที่ไม่ได้รับยกเว้นภาษีเงินได้ และเงินได้อื่นนอกจากเงินได้ประเภทที่ 1 ถึง 7 แต่หากมีรายได้จากช่องทางอื่น ๆ จะไม่สามารถคำนวณภาษีผ่านแอปฯ ได้ ต้องคำนวณภาษีด้วยวิธีอื่นแทน
                        {'\n'}    -	 แอปฯ นี้ใช้คำนวณภาษีแบบเหมาจ่าย 60% และแบบเขตพัฒนาเศรษฐกิจพิเศษ (5 จังหวัดภาคใต้ ได้แก่ จังหวัดนราธิวาส, ปัตตานี, สตูล, ยะลาและสงขลา เฉพาะอำเภอจะนะ, เทพา, นาทวีและสะบ้าย้อย)
                        {'\n'}    -	เงินได้พึงประเมินประเภทที่ 8 ที่สามารถเลือกหักค่าใช้จ่ายได้ทั้งตามจริงและแบบเหมาจ่าย 60% จะมีอยู่ทั้งหมด 43 ประเภทเงินได้ ได้แก่ 
{'\n'}(1) การเก็บค่าต๋งหรือค่าเกมจากการพนัน การแข่งขันหรือการเล่นต่าง ๆ 
{'\n'}(2) การถ่าย ล้าง อัด หรือขยายรูป ภาพยนตร์ รวมทั้งการขายส่วนประกอบ 
{'\n'}(3) การทำกิจการคานเรือ อู่เรือ หรือซ่อมเรือที่มิใช่ซ่อมเครื่องจักร เครื่องกล 
{'\n'}(4) การทำรองเท้า และเครื่องหนังแท้หรือหนังเทียม รวมทั้งการขายส่วนประกอบ 
{'\n'}(5) การตัด เย็บ ถัก ปักเสื้อผ้าหรือสิ่งอื่น ๆ รวมทั้งการขายส่วนประกอบ 
{'\n'}(6) การทำ ตกแต่ง หรือซ่อมแซมเครื่องเรือน รวมทั้งการขายส่วนประกอบ 
{'\n'}(7) การทำกิจการโรงแรมหรือภัตตาคาร หรือการปรุงอาหาร หรือเครื่องดื่มจําหน่าย 
{'\n'}(8) การดัด ตัด แต่งผม หรือตกแต่งร่างกาย 
{'\n'}(9) การทำสบู่ แชมพู หรือเครื่องสําอาง 
{'\n'}(10) การทำวรรณกรรม 
{'\n'}(11) การค้าเครื่องเงิน ทอง นาก เพชร พลอย หรืออัญมณีอื่น ๆ รวมทั้งการขายส่วนประกอบ 
{'\n'}(12) การทำกิจการสถานพยาบาลตามกฎหมายว่าด้วยสถานพยาบาลเฉพาะที่มีเตียงรับผู้ป่วยไว้ค้างคืน รวมทั้งการรักษาพยาบาลและการจําหน่ายยา 
{'\n'}(13) การโม่หรือย่อยหิน 
{'\n'}(14) การทำป่าไม้ สวนยาง หรือไม้ยืนต้น 
{'\n'}(15) การขนส่งหรือรับจ้างด้วยยานพาหนะ 
{'\n'}(16) การทำบล็อก และตรา การรับพิมพ์ หรือเย็บสมุด เอกสาร รวมทั้งการขายส่วนประกอบ 
{'\n'}(17) การทำเหมืองแร่ 
{'\n'}(18) การทำเครื่องดื่มตามกฎหมายว่าด้วยภาษีสรรพสามิต 
{'\n'}(19) การทำเครื่องกระเบื้อง เครื่องเคลือบ เครื่องซีเมนต์ หรือดินเผา 
{'\n'}(20) การทำหรือจําหน่ายกระแสไฟฟ้า 
{'\n'}(21) การทำน้ำแข็ง 
{'\n'}(22) การทำกาว แป้งเปียกหรือสิ่งที่มีลักษณะทํานองเดียวกันและการทำแป้งชนิดต่าง ๆ ที่มิใช่เครื่องสําอาง 
{'\n'}(23) การทำลูกโป่ง เครื่องแก้ว เครื่องพลาสติก หรือเครื่องยางสําเร็จรูป 
{'\n'}(24) การซักรีด หรือย้อมสี 
{'\n'}(25) การขายของนอกจากที่ระบุไว้ในข้ออื่นซึ่งผู้ขายมิได้เป็นผู้ผลิต 
{'\n'}(26) รางวัลที่เจ้าของม้าได้จากการส่งม้าเข้าแข่ง 
{'\n'}(27) การรับสินไถ่ทรัพย์สินที่ขายฝากหรือการได้กรรมสิทธิ์ในทรัพย์สินโดยเด็ดขาดจากการขายฝาก
{'\n'}(28) การรมยาง การทำยางแผ่น หรือยางอย่างอื่นที่มิใช่ยางสําเร็จรูป 
{'\n'}(29) การฟอกหนัง 
{'\n'}(30) การทำน้ำตาล หรือน้ำเหลืองของน้ำตาล 
{'\n'}(31) การจับสัตว์น้ำ
{'\n'}(32) การทำกิจการโรงเลื่อย 
{'\n'}(33) การกลั่นหรือหีบน้ำมัน
{'\n'}(34) การให้เช่าซื้อสังหาริมทรัพย์ที่ไม่เข้าลักษณะตามมาตรา 40 (5) แห่งประมวลรัษฎากรซึ่งแก้ไขเพิ่มเติมโดยพระราชบัญญัติแก้ไขเพิ่มเติมประมวลรัษฎากร (ฉบับที่ 16) พ.ศ. 2502 
{'\n'}(35) การทำกิจการโรงสีข้าว 
{'\n'}(36) การทำเกษตรกรรมประเภทไม้ล้มลุกและธัญชาติ 
{'\n'}(37) การอบหรือบ่มใบยาสูบ 
{'\n'}(38) การเลี้ยงสัตว์ทุกชนิด รวมทั้งการขายวัตถุพลอยได้ 
{'\n'}(39) การฆ่าสัตว์จําหน่าย รวมทั้งการขายวัตถุพลอยได้ 
{'\n'}(40) การทำนาเกลือ 
{'\n'}(41) การขายเรือกําปั่นหรือเรือที่มีระวางตั้งแต่หกตันขึ้นไป เรือกลไฟหรือเรือยนต์มีระวางตั้งแต่ห้าตันขึ้นไป หรือแพ 
{'\n'}(42) การขายที่ดินเงินผ่อนหรือการให้เช่าซื้อที่ดิน 
{'\n'}(43) การแสดงของนักแสดงละคร ภาพยนตร์ วิทยุหรือโทรทัศน์ นักร้อง นักดนตรี นักกีฬาอาชีพ
หรือนักแสดงเพื่อความบันเทิงใด ๆ
ดังนั้น ใครที่มีรายได้จากเงินได้ แต่เพียงอย่างเดียว และไม่ได้มีข้อจำกัดอย่างที่บอกไป สามารถใช้ช่องทางนี้ในการคำนวณภาษี แบบแสดงรายการภาษีเงินได้บุคคลธรรมดา

                        </Text>
                    </ScrollView>
                    <View style={{display:'flex',flexDirection:'row',justifyContent: 'center'}}>
                    <View style={{paddingBottom:10,paddingTop:10}}>
                        <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10}} onPress={() => not_accept()}>
                            <Text style={{fontSize:20,color:'white',padding:5,}}>ไม่ยอมรับ</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:90,paddingBottom:10,paddingTop:10}}>
                        <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10}} onPress={() => accept()}>
                            <Text style={{fontSize:20,color:'white',padding:5,}}>ยอมรับ</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RNModal>
            <View style={{paddingTop:230,paddingRight:30}}>
            <Text style={{fontSize:14,textAlign: 'center',paddingHorizontal:10}}>กรุณากดที่ข้อความด้านล่างเพื่ออ่านรายละเอียดยอมรับข้อกำหนดของเรา และดำเนินต่อ</Text>
            <View style={styles.checkboxContainer}>
        <CheckBox
          value={isAccept}
          onValueChange={()=>setShow(true)}
          style={styles.checkbox}
        />
        <Text style={{fontSize:16,}} onPress={() =>setShow(true)}>ฉันยอมรับ <Text style={{color:'#749d63'}}>ข้อกำหนดและเงื่อนไขในการใช้งาน</Text> จากทาง Taxcalculator</Text>
      </View>
            </View>
            <View style={{paddingHorizontal:10}}>
            { accepts == 1 ?

                <TouchableOpacity style={styles.loginButton,{backgroundColor:  '#ffcc00'}} onPress={() => navigation.replace('Login')}>
            <Text style={styles.loginButtonText}>เข้าสู่แอป</Text>
            </TouchableOpacity>
            :
            <View style={styles.loginButton,{backgroundColor: '#aaa'}} >
            <Text style={styles.loginButtonText}>เข้าสู่แอป</Text>
            </View>
            
            }
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        paddingHorizontal:20
      },
      loginButton: {
        
        marginTop: 8,
        paddingVertical: 10,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
    loginButtonText: {
        color: '#000',
        paddingVertical:5,
        textAlign: 'center',
        fontSize:18,
        color: '#000',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius:8,
        paddingHorizontal:10,
        paddingVertical:50,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5

    },
})
