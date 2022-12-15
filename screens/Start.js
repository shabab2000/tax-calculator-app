import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView , StatusBar} from 'react-native'

export default function Start({navigation}) { //สร้าง function ชื่อ Start
      
    return (
        <SafeAreaView style={styles.containerstatusbar}>
        <View style={styles.container}>
        <StatusBar
        animated={true}
        backgroundColor="#000000"
        />
             <Image source={require('../src/assets/1.jpg')} style={{position: 'absolute',width: '100%',height: '100%'}}/> 
            <View style={{alignItems: 'center',paddingTop:25}}>
                 <Image source={require('../src/assets/logo.png')} style={{width: 210, height: 250}}/>
            </View>
            <View style={{paddingHorizontal:30,paddingTop:25}}>
            <View>
                <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textRegis}>สมัครสมาชิก</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop:25,paddingBottom:25}}>
                <TouchableOpacity style={{backgroundColor: '#749d63',borderRadius:10}} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textLogin}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>

            </View>
            {/* <Image source={require('./img/bottom.png')} style={{width: '100%', height: '20%'}}/> */}
        </View></SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerstatusbar: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor:'#f8f7fd',
        justifyContent: 'center'
    },
    textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
    },
    textLogin: {
        textAlign: 'center',
        color:'#FFFFFF',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
    }
})
