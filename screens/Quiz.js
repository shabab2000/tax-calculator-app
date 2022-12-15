import { StyleSheet, Text, View,TouchableOpacity,Alert,ScrollView,ToastAndroid } from 'react-native'
import React,{useState,useEffect} from 'react'
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PieChart from 'react-native-pie-chart';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function Quiz({navigation}) {

    const [user,setUser] = useState('');
    const [q1,setQ1] = useState('');
    const [q2,setQ2] = useState('');
    const [q3,setQ3] = useState('');
    const [q4,setQ4] = useState('');
    const [q5,setQ5] = useState('');
    const [q6,setQ6] = useState('');
    const [q7,setQ7] = useState('');
    const [q8,setQ8] = useState('');
    const [q9,setQ9] = useState('');
    const [q10,setQ10] = useState('');
    const [num,setNum] = useState(0);
    const [score,setScore] = useState(0);
    const [test,setTest] = useState('ก่อน');
    const [before,setBefore] = useState(0);
    const series = [score, 5 - score];

    const Nets1 = ()=>{
        if(!q1){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ');
        }else{
            setNum(2);
        }
    }
    const Nets2 = ()=>{
        if(!q2){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(3);
        }
    }
    const Nets3 = ()=>{
        if(!q3){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(4);
        }
    }
    const Nets4 = ()=>{
        if(!q4){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(5)
        }
    }
    const Nets5 = ()=>{
        if(!q5){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(6)
        }
    }
    const Nets6 = ()=>{
        if(!q6){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(7)
        }
    }
    const Nets7 = ()=>{
        if(!q7){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(8)
        }
    }
    const Nets8 = ()=>{
        if(!q8){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(9)
        }
    }
    const Nets9 = ()=>{
        if(!q9){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(10)
        }
    }
    const Nets10 = async()=>{
        if(!q10){
            Alert.alert('แจ้งเตือน!','กรุณาเลือกคำตอบ')
        }else{
            setNum(20)
            scores();
            if(test == 'หลัง'){
                if(score>=5){
                let uid = await AsyncStorage.getItem("uid");
                        fetch('https://taxcalculator.ml/quizs.php', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                
                    befores : before,
                    after : score,
                    uid: uid,
                
                    })
                   
                  }).then((response) => response.json()) 
                        .then((responseJson) => {
                          if(responseJson === 'ทำแบบทดสอบสำเร็จ')
                          {
                            setNum(20)
                            ToastAndroid.show(responseJson,2000);
                          } else{
                            Alert.alert('แจ้งเตือน!',responseJson);
                          }
                        }).catch((error) => {
                          console.log(error);
                        });
        }}}
                    
                }
            
            
       


    const scores = ()=>{
        if(q1=='ข'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q2=='ค'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q3=='ข'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q4=='ง'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q5=='ข'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q6=='ข'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q7=='ค'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q8=='ข'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q9=='ก'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
        if(q10=='ก'){
            if(test =='ก่อน'){
                setBefore(prevCount => prevCount + 1);
            }else{
                setScore(prevCount => prevCount + 1);
            }
        }
    }

    const After = () => {
        setQ1('');
        setQ2('');
        setQ3('');
        setQ4('');
        setQ5('');
        setQ6('');
        setQ7('');
        setQ8('');
        setQ9('');
        setQ10('');
        setNum(0);
        setScore(0);
        setTest('หลัง');
    }

    const load = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
            if(uid!== null) {
                //setEmail(email)
                fetch('https://taxcalculator.ml/quiz.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => setUser(json))
        .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        load();
    })

  return (
    <View style={styles.container}>
        {user.status == 'ผ่าน'?
        <ScrollView>
            <View>
                <Text style={{textAlign:'center'}}>คุณทำแบบทดสอบแล้ว</Text>
            </View>
        </ScrollView>
        :
        <ScrollView>
            {test =='ก่อน'?
            <View>
          <Text style={{textAlign:'center',padding:10,paddingTop:30,fontSize:18}}>แบบทดสอบก่อนเรียน</Text>
          {num == 0 ?
          
            <View style={{paddingTop:170,paddingLeft:30,paddingRight:30}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> setNum(1) }>
                    <Text style={{textAlign:'center',paddingTop:50,paddingBottom:50,fontSize:20}}>เริ่มทำแบบทดสอบ</Text>
                </TouchableOpacity>
            </View>
          :num == 1 ?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 1 ค่าลดหย่อนส่วนตัวและครอบครัว หักค่าใช้จ่ายร้อยละกี่เปอร์เซ็นต์ ของเงินได้ ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q1 => setQ1(q1)} value={q1}>
                    <RadioButton.Item label="ก. 50%" value="ก" />
                    <RadioButton.Item label="ข. 60%" value="ข" />
                    <RadioButton.Item label="ค. 80%" value="ค" />
                    <RadioButton.Item label="ง. 90%" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets1() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num == 2 ?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 2 ลดหย่อนบุตรคนที่ 2 เกิดตั้งแต่ปี 2561 เป็นต้นไป ลดหย่อนคนละกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q2 => setQ2(q2)} value={q2}>
                    <RadioButton.Item label="ก. 30,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 50,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 60,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 80,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets2() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==3?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 3 ลดหย่อนคู่สมรส ที่จดทะเบียนสมรสกัน กรณีคู่สมรสไม่มีเงินได้ระหว่างปี ลดหย่อนได้กี่บาท ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q3 => setQ3(q3)} value={q3}>
                    <RadioButton.Item label="ก. 50,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 60,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 70,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 80,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets3() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==4?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 4 ลดหย่อนค่าฝากครรภ์-คลอดบุตร ลดหย่อนได้ไม่เกินกี่บาท ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q4 => setQ4(q4)} value={q4}>
                    <RadioButton.Item label="ก. 30,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 40,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 50,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 60,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets4() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==5?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 5 ลดหย่อนเบี้ยประกันสุขภาพของตัวเอง ลดหย่อนได้ไม่เกินกี่บาท ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q5 => setQ5(q5)} value={q5}>
                    <RadioButton.Item label="ก. 15,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 25,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 30,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 60,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets5() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==6?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 6 ลดหย่อนประกันสุขภาพของบิดามารดาที่ไม่มีเงินได้ สามารถลดหย่อนได้ไม่เกินกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q6 => setQ6(q6)} value={q6}>
                    <RadioButton.Item label="ก. 10,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 15,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 20,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 25,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets6() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==7?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 7 ลดหย่อนเงินสะสมกองทุนสำรองเลี้ยงชีพ สามารถใช้สิทธิได้ไม่เกินกี่เปอร์เซ็นต์ของเงินได้ และไม่เกินกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q7 => setQ7(q7)} value={q7}>
                    <RadioButton.Item label="ก. ไม่เกิน 5% ของเงินได้ และไม่เกิน 300,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. ไม่เกิน 10% ของเงินได้ และไม่เกิน 400,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. ไม่เกิน 15% ของเงินได้ และไม่เกิน 500,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. ไม่เกิน 20% ของเงินได้ และไม่เกิน 600,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets7() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==8?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 8 กองทุนรวมเพื่อการเลี้ยงชีพ RMF สามารถใช้สิทธิได้ไม่เกินกี่เปอร์เซ็นต์ของเงินได้ และไม่เกินกี่บาท   ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q8 => setQ8(q8)} value={q8}>
                    <RadioButton.Item label="ก. ไม่เกิน 20% ของเงินได้ และไม่เกิน 400,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. ไม่เกิน 30% ของเงินได้ และไม่เกิน 500,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. ไม่เกิน 40% ของเงินได้ และไม่เกิน 600,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. ไม่เกิน 50% ของเงินได้ และไม่เกิน 700,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets8() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==9?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 9 ลดหย่อนดอกเบี้ยกู้ยืมเพื่อซื้อหรือสร้างอาคารที่อยู่อาศัย ลดหย่อนได้ไม่เกินกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q9 => setQ9(q9)} value={q9}>
                    <RadioButton.Item label="ก. 100,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 200,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 300,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 400,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets9() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==10?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 10 เงินบริจาคเพื่อพรรคการเมือง ลดหย่อนได้สูงสุดกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q10 => setQ10(q10)} value={q10}>
                    <RadioButton.Item label="ก. 10,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 15,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 20,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 25,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets10() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ส่งแบบทดสอบ</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==20 ?
      <View>
      <View style={{alignItems:'center',padding:10,paddingTop:10}}>
      <Text style={{fontSize:20,paddingBottom:10,color:'#000'}}>ทำแบบทดสอบเสร็จแล้ว</Text>
      <Text style={{paddingBottom:10,fontSize:30,color:'blue'}}>ได้คะแนน { test=='ก่อน'? before : score}/10</Text>
      {before >=5 ?
      <View>
      <Text style={{paddingBottom:10,fontSize:35,color:'green'}}>ผ่าน</Text>
      </View>
      :
      <Text style={{paddingBottom:10,fontSize:35,color:'red'}}>ไม่ผ่าน</Text>
      }
      </View>
      <View style={{padding:10,}}>
      <View style={{backgroundColor:'#FFDA48',borderRadius:10}}>
      <Text  style={{textAlign:'center',padding:10,fontSize:16}}>สื่อในการเรียนรู้รายการลดหย่อน</Text>
      </View>
      </View>
      <View>
      <YoutubePlayer
        height={270}
        play={true}
        videoId={'IMFqs7oih9o'}
      />
      
      <Text  style={{textAlign:'center',padding:5,paddingBottom:20,fontSize:14}}>ขอบคุณช่องยูทูป Fah Money More ที่เป็นสื่อการเรียนรู้ในการลดหย่อน</Text>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> After() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>แบบทดสอบหลังเรียน</Text>
                </TouchableOpacity>
           
      </View>
      </View>
      :null}
  
      
      </View>
      :
      <View>
          <Text style={{textAlign:'center',padding:10,paddingTop:30,fontSize:18}}>แบบทดสอบหลังเรียน</Text>
          {num == 0 ?
          
            <View style={{paddingTop:170,paddingLeft:30,paddingRight:30}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> setNum(1) }>
                    <Text style={{textAlign:'center',paddingTop:50,paddingBottom:50,fontSize:20}}>เริ่มทำแบบทดสอบ</Text>
                </TouchableOpacity>
            </View>
          :num == 1 ?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 1 ค่าลดหย่อนส่วนตัวและครอบครัว หักค่าใช้จ่ายร้อยละกี่เปอร์เซ็นต์ ของเงินได้ ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q1 => setQ1(q1)} value={q1}>
                    <RadioButton.Item label="ก. 50%" value="ก" />
                    <RadioButton.Item label="ข. 60%" value="ข" />
                    <RadioButton.Item label="ค. 80%" value="ค" />
                    <RadioButton.Item label="ง. 90%" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets1() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num == 2 ?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 2 ลดหย่อนบุตรคนที่ 2 เกิดตั้งแต่ปี 2561 เป็นต้นไป ลดหย่อนคนละกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q2 => setQ2(q2)} value={q2}>
                    <RadioButton.Item label="ก. 30,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 50,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 60,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 80,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets2() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==3?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 3 ลดหย่อนคู่สมรส ที่จดทะเบียนสมรสกัน กรณีคู่สมรสไม่มีเงินได้ระหว่างปี ลดหย่อนได้กี่บาท ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q3 => setQ3(q3)} value={q3}>
                    <RadioButton.Item label="ก. 50,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 60,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 70,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 80,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets3() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==4?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 4 ลดหย่อนค่าฝากครรภ์-คลอดบุตร ลดหย่อนได้ไม่เกินกี่บาท ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q4 => setQ4(q4)} value={q4}>
                    <RadioButton.Item label="ก. 30,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 40,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 50,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 60,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets4() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==5?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 5 ลดหย่อนเบี้ยประกันสุขภาพของตัวเอง ลดหย่อนได้ไม่เกินกี่บาท ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q5 => setQ5(q5)} value={q5}>
                    <RadioButton.Item label="ก. 15,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 25,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 30,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 60,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets5() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==6?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 6 ลดหย่อนประกันสุขภาพของบิดามารดาที่ไม่มีเงินได้ สามารถลดหย่อนได้ไม่เกินกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q6 => setQ6(q6)} value={q6}>
                    <RadioButton.Item label="ก. 10,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 15,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 20,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 25,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets6() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==7?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 7 ลดหย่อนเงินสะสมกองทุนสำรองเลี้ยงชีพ สามารถใช้สิทธิได้ไม่เกินกี่เปอร์เซ็นต์ของเงินได้ และไม่เกินกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q7 => setQ7(q7)} value={q7}>
                    <RadioButton.Item label="ก. ไม่เกิน 5% ของเงินได้ และไม่เกิน 300,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. ไม่เกิน 10% ของเงินได้ และไม่เกิน 400,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. ไม่เกิน 15% ของเงินได้ และไม่เกิน 500,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. ไม่เกิน 20% ของเงินได้ และไม่เกิน 600,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets7() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==8?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 8 กองทุนรวมเพื่อการเลี้ยงชีพ RMF สามารถใช้สิทธิได้ไม่เกินกี่เปอร์เซ็นต์ของเงินได้ และไม่เกินกี่บาท   ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q8 => setQ8(q8)} value={q8}>
                    <RadioButton.Item label="ก. ไม่เกิน 20% ของเงินได้ และไม่เกิน 400,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. ไม่เกิน 30% ของเงินได้ และไม่เกิน 500,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. ไม่เกิน 40% ของเงินได้ และไม่เกิน 600,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. ไม่เกิน 50% ของเงินได้ และไม่เกิน 700,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets8() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==9?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 9 ลดหย่อนดอกเบี้ยกู้ยืมเพื่อซื้อหรือสร้างอาคารที่อยู่อาศัย ลดหย่อนได้ไม่เกินกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q9 => setQ9(q9)} value={q9}>
                    <RadioButton.Item label="ก. 100,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 200,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 300,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 400,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets9() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==10?
      <View style={{padding:30}}>
        <Text style={{color:'blue',fontSize:16}}>ข้อ 10 เงินบริจาคเพื่อพรรคการเมือง ลดหย่อนได้สูงสุดกี่บาท  ?</Text>
        <View style={{borderBottomWidth:1,padding:5,borderBottomColor:'#ccc'}}/>
            
            <View style={{paddingTop:5}}>
                <RadioButton.Group  onValueChange={q10 => setQ10(q10)} value={q10}>
                    <RadioButton.Item label="ก. 10,000 บาท" value="ก" />
                    <RadioButton.Item label="ข. 15,000 บาท" value="ข" />
                    <RadioButton.Item label="ค. 20,000 บาท" value="ค" />
                    <RadioButton.Item label="ง. 25,000 บาท" value="ง" />
                </RadioButton.Group>
            </View>
            
            <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> Nets10() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>ส่งแบบทดสอบ</Text>
                </TouchableOpacity>
            </View>
      </View>
      :num==20 ?
      <View style={{alignItems:'center',padding:10,paddingTop:30}}>
      <Text style={{paddingBottom:10,fontSize:30,color:'blue'}}>ได้คะแนน { score}/10</Text>
      {score >=5 ?
      <View>
      <Text style={{paddingBottom:10,fontSize:35,color:'green'}}>ผ่าน</Text>
      </View>
      :
      <Text style={{paddingBottom:10,fontSize:35,color:'red'}}>ไม่ผ่าน</Text>
      }
      <Text style={{textAlign:'center',padding:10,paddingTop:30,fontSize:18,color:'#000'}}>แบบทดสอบก่อนเรียน</Text>
      <Text style={{paddingBottom:10,fontSize:30,color:'blue'}}>ได้คะแนน { before}/10</Text>
      {before >=5 ?
      <View>
      <Text style={{paddingBottom:10,fontSize:35,color:'green'}}>ผ่าน</Text>
      </View>
      :
      <Text style={{paddingBottom:10,fontSize:35,color:'red'}}>ไม่ผ่าน</Text>
      }
      <View style={{paddingTop:20}}>
                <TouchableOpacity style={{backgroundColor:'#FFDA48',borderRadius:10}} onPress={()=> navigation.goBack() }>
                    <Text style={{textAlign:'center',padding:10,fontSize:16}}>กลับหน้าแรก</Text>
                </TouchableOpacity>
            </View>
      </View>
      :null}
      
      </View>
            }
      </ScrollView>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
    }
})