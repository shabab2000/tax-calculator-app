import React,{ useState,useEffect}from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Lodyons({route,navigation}) {

    return (
        
        <View style={styles.container}>
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
            
          <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Lodyons1')}>
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>กลุ่มที่ 1 ค่าลดหย่อนส่วนตัวและครอบครัว</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Lodyons2')}>
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>กลุ่มที่ 2 ค่าลดหย่อน/ยกเว้นด้านการออมและการลงทุน</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Lodyons3')}>
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>กลุ่มที่ 3 ค่าลดหย่อน/ยกเว้นจากสินทรัพย์ และมาตรการนโยบายภาครัฐ</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Lodyons4')}>
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>กลุ่มที่ 4 เงินบริจาค</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      

            {/* <View style={{paddingHorizontal:15,paddingTop:10}}>
                <View style={{borderWidth:1,borderColor:'#aaa'}}/>
            </View> */}
            
        </View>
    )
}

const styles = StyleSheet.create({
     container: {
         flex: 1,
     }
})
