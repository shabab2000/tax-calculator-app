import React, { useState } from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity, SafeAreaView, TextInput, Alert , StatusBar , ScrollView} from 'react-native'
import { Icon, Avatar, ListItem, Divider, CheckBox} from "react-native-elements";
import ActionSheet from '@grovertb/react-native-actionsheet'


export default function Wishlist1({ navigation }) {

    const [ circleCheckBoxValue , setCircleCheckBoxValue ] = useState(false);

    const actionSheetRef = React.useRef();

  const _handleShowActionSheet = () => {
    actionSheetRef.current.show()
  }
    
    return (
        <SafeAreaView style={styles.containerstatusbar}>
          
        <StatusBar
        animated={true}
        backgroundColor="#000000"
        />
        
        <View style={styles.container}>
             
             
                      <TouchableOpacity
                    onPress={() => {
                      navigation.replace("Customer");
                    }}
                    style={styles.goBackcontainer}
                  >
                    <Icon
                      style={styles.goBackimage}
                      name="angle-left"
                      type="font-awesome"
                      size={30}
                      color="#000000"
                    />
                  </TouchableOpacity>

              <View style={{paddingTop: 80}}></View>
             
             <View style={{paddingLeft: 30 , justifyContent: 'center' , alignItems: 'center'}}>
                    <View style={{backgroundColor: '#EC761C' , width:'40%' , alignItems: 'center' , paddingVertical: 8 }}>
                        <Text style={{}}>รายรับ - รายจ่าย</Text>
                    </View>
                    </View>
                
                    <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
            <View style={styles.hr}></View>
            </View>

    <View style={{paddingLeft: 20 , alignItems: 'center' , flexDirection: 'row'}}>
                    <Text>วันที่</Text>
                    <View style={{ left: 30 ,backgroundColor: '#7CCC92' , width:'81%' , alignItems: 'center' , paddingVertical: 8 }}>
                        <Text style={{}}>18 ก.ย. 2564</Text>
                    </View>
                    </View>


                    <View style={{paddingLeft: 20 , alignItems: 'center' ,flexDirection: 'row'}}>
                        <Text style={{  justifyContent: 'center'}}>ประเภท</Text>
                        <CheckBox
                        containerStyle={{ marginLeft: 10 , width: '81%' , paddingVertical: 6}}
                        title={'รายรับ'}
                        checked={circleCheckBoxValue}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        onPress={() => setCircleCheckBoxValue(!circleCheckBoxValue)}
                        />
                    </View>


                    <View style={{paddingLeft: 75 }}>
                    <TouchableOpacity onPress={_handleShowActionSheet} >    
                    <View style= {{backgroundColor: '#ffffff' , width:'94%' , paddingVertical: 6, borderRadius: 2 , paddingLeft: 46}}>
                         
                        <View style={{ flexDirection: 'row' , left: -37 ,alignItems: 'center'}}>
                        <Icon
                name='checkbox-blank-circle-outline'
                style={{
                    elevation: 1,
   
                    shadowOpacity: 1,
                    shadowRadius: 0.01,
                    shadowOffset: {
                        width: 0.1,
                        height: 0.1,
              }, }}
                type='material-community'
                color='#D4D4D4'
                size={24}
            />
      <Text style={{fontWeight: 'bold', left: 13 , fontSize: 14 }}>รายจ่าย</Text> 
      <ActionSheet
        ref={actionSheetRef}
        options={['ซื้อสินค้า', 'ค่าใช้จ่ายอื่นๆ' , 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) => { /* do something */ }}
      /></View>
      
    </View></TouchableOpacity>  
    </View>

  <View style={{ paddingHorizontal: 20}}>
    <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>รายการ</Text>
              <TextInput
                placeholder='กรุณากรอกรายการ'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='email-address'
                onChangeText={(list) => setList(list)}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>จำนวนสินค้า</Text>
              <TextInput
                placeholder='กรุณากรอกจำนวนสินค้า'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='numbers-and-punctuation'
                onChangeText={(numberProduct) => setNumberProduct(numberProduct)}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>จำนวนเงิน</Text>
              <TextInput
                placeholder='กรุณากรอกจำนวนเงิน'
                style={styles.input}
                autoCapitalize="none"
                keyboardType='numbers-and-punctuation'
                onChangeText={(itemMoney) => setItemMoney(itemMoney)}
              />
            </View>
            </View>
   
            <View style={{paddingTop: 80}}></View>
             
             <TouchableOpacity >
             <View style={{paddingLeft: 30 , justifyContent: 'center' , alignItems: 'flex-end' , right: 20}}>
                    <View style={{backgroundColor: '#EC761C' , width:'40%' , alignItems: 'center' , paddingVertical: 8}}>
                        <Text style={{}}>รายการถัดไป</Text>
                    </View>
                    </View></TouchableOpacity>

                    <View style={{paddingTop: 40}}></View>
                    
                    <View style={{flexDirection: 'row' , paddingHorizontal: 25}}>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Billsummary')}> 
            <Text style={styles.loginButtonText}>สรุปรายการ</Text>
            </TouchableOpacity>
            <View style={{paddingRight: 43}}></View>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Home')}> 
            <Text style={styles.loginButtonText}>กลับ</Text>
            </TouchableOpacity>
            </View>

                 </View>
                 </SafeAreaView>
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
    hr: {
        width: '90%',
        height: 2,
        backgroundColor: '#444',
        marginTop: 6,
    },
    inputBox: {
        marginTop: 10,
      },
      inputLabel: {
        fontSize: 14,
        marginBottom: 6,
      },
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#dfe4ea',
        borderRadius: 4,
        paddingHorizontal: 10,
        fontSize: 12
      },
      loginButton: {
          width: '45%',
        backgroundColor: '#004FFF',
        marginTop: 30,
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
        textAlign: 'center',
        fontSize:14,
        fontWeight: 'bold',
        color: '#000000',
    },
});
