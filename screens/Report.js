import React,{ useState,useEffect} from 'react'
import { StyleSheet, Text, View,Alert } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import ActionSheet from '@grovertb/react-native-actionsheet'

export default function Report({ navigation }) {
  const [select,setSelected] = useState('');
  const actionSheetRef = React.useRef();
  const actionSheetRefm = React.useRef();
  const actionSheetRefy = React.useRef();

  const _handleShowActionSheet = () => {
    actionSheetRef.current.show()
  }

  const handlePress = index => {
    setSelected(index);
    if(index==0){
      navigation.navigate('Daily')
    }else if(index==1) {
      actionSheetRefm.current.show()
    }else if(index==3){
      actionSheetRefy.current.show()
    }else{

    }
  }

    const handlePressm = index => {
     if(index==0){
      navigation.navigate('Monthly',{m: 1})
    }else if(index==1) {
      navigation.navigate('Monthly',{m: 2})
    }else if(index==3){
      navigation.navigate('Monthly',{m: 3})
    }else if(index==4){
      navigation.navigate('Monthly',{m: 4})
    }else if(index==5){
      navigation.navigate('Monthly',{m: 5})
    }else if(index==6){
      navigation.navigate('Monthly',{m: 6})
    }else if(index==7){
      navigation.navigate('Monthly',{m: 7})
    }else if(index==8){
      navigation.navigate('Monthly',{m: 8})
    }else if(index==9){
      navigation.navigate('Monthly',{m: 9})
    }else if(index==10){
      navigation.navigate('Monthly',{m: 10})
    }else if(index==11){
      navigation.navigate('Monthly',{m: 11})
    }else if(index==12){
      navigation.navigate('Monthly',{m: 12})
    }else{

    }
    //navigation.navigate('Monthly',{m: index})
  }

  const handlePressy = index => {
    if(index==0){
     navigation.navigate('Yearly',{y: 2020})
   }else if(index==1) {
    navigation.navigate('Yearly',{y: 2021})
  }else if(index==2) {
    navigation.navigate('Yearly',{y: 2022})
  }else{

   }
   //navigation.navigate('Monthly',{m: index})
 }

    return (
        <View style={styles.container}>
            <Text style={{textAlign: 'center', fontSize: 18,paddingTop:10, paddingBottom: 10}}>รายงานผล</Text>
            <ListItem  bottomDivider topDivider onPress={() => _handleShowActionSheet()}>
      <FontAwesome5 name="money-check-alt" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>รายงานรายรับ-รายจ่าย</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ActionSheet
        ref={actionSheetRef}
        options={['รายวัน', 'รายเดือน' , 'ยกเลิก', 'รายปี']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePress(index) }
      />
      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Report_receipt')}>
      <FontAwesome5 name="receipt" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>รายงานใบเส็จรับเงิน</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('List_tax')}>
      <FontAwesome5 name="file-invoice" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>รายงานข้อมูลภาษี</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ActionSheet
        ref={actionSheetRefm}
        options={['มกราคม', 'กุมภาพันธ์' , 'ยกเลิก', 'มีนาคม', 'เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePressm(index) }
      />
      <ActionSheet
        ref={actionSheetRefy}
        options={['2563','2564','2565','ยกเลิก',]}
        cancelButtonIndex={4}
        destructiveButtonIndex={3}
        onPress={(index) =>  handlePressy(index) }
      />
        </View>
    )
}

const styles = StyleSheet.create({})
