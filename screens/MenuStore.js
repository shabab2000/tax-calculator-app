import React, { useState } from 'react'
import { ScrollViewBase } from 'react-native';
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , StatusBar , ScrollView} from 'react-native'
import { Icon, Avatar, ListItem, Divider } from "react-native-elements";

export default function MenuStore({ navigation }) {
    return (
        
        <View style={styles.container}>
             
             <View style={{paddingLeft: 30,paddingTop:60}}>
                    <View style={{backgroundColor: '#FFCC00' , width:'40%' , alignItems: 'center' , paddingVertical: 8 , }}>
                        <Text style={{}}>รายรับ - รายจ่าย</Text>
                    </View>
                    <View style={{alignItems:'flex-end',paddingRight:10,marginTop:-30}}>
                    <Image source={require('./img/unnamed.png')} style={{width: 100, height: 100}}/>
                    </View>
                    </View>

    <View style={{paddingTop: 50}}>
                    <View style={{paddingHorizontal: 20 , paddingTop: 10}}>
                    <TouchableOpacity>
              <ListItem bottomDivider onPress={()=> navigation.navigate('Customer')}>
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    บันทึกรายรับ - รายจ่าย
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
              </TouchableOpacity>
              </View>



              <View style={{paddingHorizontal: 20 , paddingTop: 20}}>
                <TouchableOpacity>
              <ListItem
                bottomDivider         
              >
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 12 }}>
                    วิเคราะห์
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
              </TouchableOpacity>
              </View>

        </View>
        <View style={{paddingTop:80,paddingLeft:50}}>
          <Image source={require('./img/1.png')} style={{width: 150, height: 150}}/>
        </View>


                 </View>
    )
}

const styles = StyleSheet.create({
    containerstatusbar: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor:'#D4D4D4',

    },
    goBackcontainer: {
      left: 15,
      top: 15,
    },
    goBackimage: {
      width: 30,
      height: 30,
    },
 
});
