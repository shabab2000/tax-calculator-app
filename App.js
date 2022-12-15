import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Index from './screens/Index';
import Start from './screens/Start';
import Home from './screens/Home';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import RegisConfirm from './screens/RegisConfirm';
import Google from './screens/Google';
import Facebook from './screens/Facebook';
import Forgotpassword from './screens/Forgotpassword';
import Profile from './screens/Profile';
import Editprofile from './screens/Editprofile';
import Otp from './screens/Otp';
import Resetpassword from './screens/Resetpassword';
import ChangePassword from './screens/ChangePassword';
import Store from './screens/Store';
import MenuStore from './screens/MenuStore';
import Customer from './screens/Customer';
import Wishlist from './screens/Wishlist';
import Wishlist1 from './screens/Wishlist1';
import Billsummary from './screens/Billsummary';
import Expenses from './screens/Expenses';
import ListPay from './screens/ListPay';
import SumPay from './screens/SumPay';
import EditPay from './screens/EditPay';
import EditSummary from './screens/EditSummary';
import Receipt from './screens/Receipt';
import Income from './screens/Income';
import Lodyon from './screens/Lodyon';
import Lodyon1 from './screens/Lodyon1';
import Lodyon2 from './screens/Lodyon2';
import Lodyon3 from './screens/Lodyon3';
import Lodyon4 from './screens/Lodyon4';
import Incomes from './screens/Incomes';
import Lodyons from './screens/Lodyons';
import Lodyons1 from './screens/Lodyons1';
import Lodyons2 from './screens/Lodyons2';
import Lodyons3 from './screens/Lodyons3';
import Lodyons4 from './screens/Lodyons4';
import SumLodyon from './screens/SumLodyon';
import Sumtax from './screens/Sumtax';
import Report from './screens/Report';
import Report_receipt from './screens/Report_receipt';
import Detail_receipt from './screens/Detail_receipt';
import Daily from './screens/Daily';
import Monthly from './screens/Monthly';
import Yearly from './screens/Yearly';
import List_tax from './screens/List_tax';
import Detail_tax from './screens/Detail_tax';
import Detail_notification from './screens/Detail_notification';
import Economy from './screens/Economy';
import Sumtaxe from './screens/Sumtaxe';
import Detail_taxe from './screens/Detail_taxe';
import Quiz from './screens/Quiz'

const Stack = createStackNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={horizontalAnimation}>
      <Stack.Screen name='Index' component={Index} options={{ 
        headerShown: false,
        title: 'หน้าแรก',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
          <Stack.Screen name='Login' component={Login} options={{ 
        headerShown: true,
        title: 'เข้าสู่ระบบ',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
          <Stack.Screen name='Register' component={Register} options={{ 
        headerShown: true,
        title: 'ลงทะเบียน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
          <Stack.Screen name='RegisConfirm' component={RegisConfirm} options={{ 
        headerShown: true,
        title: 'ลงทะเบียน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Google' component={Google} options={{ 
        headerShown: true,
        title: 'ลงทะเบียน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Facebook' component={Facebook} options={{ 
        headerShown: true,
        title: 'ลงทะเบียน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

      <Stack.Screen name='Forgotpassword' component={Forgotpassword} options={{ 
        headerShown: true,
        title: 'ลืมรหัสผ่าน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
          
          <Stack.Screen name='Home' component={Home} options={{ 
        headerShown: false,
        title: 'Home',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='HomeScreen' component={HomeScreen} options={{ 
        headerShown: true,
        title: 'หน้าแรก',
          headerStyle: {
          backgroundColor: '#fff'
          }}}/>

<Stack.Screen name='Profile' component={Profile} options={{ 
        headerShown: false,
        title: 'Profile',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Editprofile' component={Editprofile} options={{ 
        headerShown: true,
        title: 'แก้ไขโปรไฟล์',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Otp' component={Otp} options={{ 
        headerShown: true,
        title: 'ยืนยันรหัส OTP',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Resetpassword' component={Resetpassword} options={{ 
        headerShown: true,
        title: 'รีเซ็ตรหัสผ่าน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='ChangePassword' component={ChangePassword} options={{ 
        headerShown: true,
        title: 'เปลี่ยนรหัสผ่าน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Store' component={Store} options={{ 
        headerShown: true,
        title: 'กรอกข้อมูลผู้ประกอบการ',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
     
     <Stack.Screen name='MenuStore' component={MenuStore} options={{ 
        headerShown: true,
        title: 'รายรับ-รายจ่าย',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Customer' component={Customer} options={{ 
        headerShown: true,
        title: 'กรอกข้อมูลลูกค้า',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Wishlist' component={Wishlist} options={{ 
        headerShown: true,
        title: 'บันทึกรายรับ',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Wishlist1' component={Wishlist1} options={{ 
        headerShown: false,
        title: 'Wishlist1',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>

<Stack.Screen name='Billsummary' component={Billsummary} options={{ 
        headerShown: true,
        title: 'ใบเสร็จรับเงิน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='Expenses' component={Expenses} options={{ 
        headerShown: true,
        title: 'บันทึกรายจ่าย',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>

<Stack.Screen name='ListPay' component={ListPay} options={{ 
        headerShown: true,
        title: 'บันทึกรายจ่าย',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='SumPay' component={SumPay} options={{ 
        headerShown: true,
        title: 'รายการรายจ่าย',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='EditPay' component={EditPay} options={{ 
        headerShown: true,
        title: 'แก้ไขรายจ่าย',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='EditSummary' component={EditSummary} options={{ 
        headerShown: true,
        title: 'แก้ไขรายรับ',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Receipt' component={Receipt} options={{ 
        headerShown: false,
        title: 'ใบเสร็จรับเงิน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Income' component={Income} options={{ 
        headerShown: true,
        title: 'ภาษีเงินได้บุคคลธรรมดา',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyon' component={Lodyon} options={{ 
        headerShown: true,
        title: 'ภาษีเงินได้บุคคลธรรมดา',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyon1' component={Lodyon1} options={{ 
        headerShown: true,
        title: 'กลุ่มที่1 ค่าลดหย่อนส่วนตัวและครอบครัว',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyon2' component={Lodyon2} options={{ 
        headerShown: true,
        title: 'กลุ่มที่2 ค่าลดหย่อน/ยกเว้นด้านการออมและการลงทุน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyon3' component={Lodyon3} options={{ 
        headerShown: true,
        title: 'กลุ่มที่3 ค่าลดหย่อน/ยกเว้นจากสินทรัพย์ และมาตรการนโยบายภาครัฐ',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyon4' component={Lodyon4} options={{ 
        headerShown: true,
        title: 'กลุ่มที่4 เงินบริจาค',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Incomes' component={Incomes} options={{ 
        headerShown: true,
        title: 'ภาษีเงินได้บุคคลธรรมดา',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyons' component={Lodyons} options={{ 
        headerShown: true,
        title: 'ภาษีเงินได้บุคคลธรรมดา',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyons1' component={Lodyons1} options={{ 
        headerShown: true,
        title: 'กลุ่มที่1 ค่าลดหย่อนส่วนตัวและครอบครัว',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyons2' component={Lodyons2} options={{ 
        headerShown: true,
        title: 'กลุ่มที่2 ค่าลดหย่อน/ยกเว้นด้านการออมและการลงทุน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyons3' component={Lodyons3} options={{ 
        headerShown: true,
        title: 'กลุ่มที่3 ค่าลดหย่อน/ยกเว้นจากสินทรัพย์ และมาตรการนโยบายภาครัฐ',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Lodyons4' component={Lodyons4} options={{ 
        headerShown: true,
        title: 'กลุ่มที่4 เงินบริจาค',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='SumLodyon' component={SumLodyon} options={{
        headerShown: true,
        title: 'รวมรายการลดหย่อน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Sumtax' component={Sumtax} options={{
        headerShown: true,
        title: 'ภาษีเงินได้บุคคลธรรมดา',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Report' component={Report} options={{
        headerShown: true,
        title: 'รายงาน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Report_receipt' component={Report_receipt} options={{
        headerShown: true,
        title: 'รายงานใบเสร็จรับเงิน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Detail_receipt' component={Detail_receipt} options={{
        headerShown: true,
        title: 'รายละเอียดใบเสร็จรับเงิน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Daily' component={Daily} options={{
        headerShown: true,
        title: 'รายงานรายวัน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Monthly' component={Monthly} options={{
        headerShown: true,
        title: 'รายงานรายเดือน',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Yearly' component={Yearly} options={{
        headerShown: true,
        title: 'รายงานรายปี',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='List_tax' component={List_tax} options={{
        headerShown: true,
        title: 'รายงานข้อมูลภาษี',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Detail_tax' component={Detail_tax} options={{
        headerShown: true,
        title: 'รายงานข้อมูลภาษี',
          headerStyle: {
          backgroundColor: '#FFCC00'
          }}}/>
<Stack.Screen name='Detail_notification' component={Detail_notification} options={{
        headerShown: true,
        title: 'รายละเอียดการแจ้งเตือน',
          headerStyle: {
          backgroundColor: '#fff'
          }}}/>
<Stack.Screen name='Economy' component={Economy} options={{
        headerShown: true,
        title: 'เขตพัฒนาเศรษฐกิจพิเศษ',
          headerStyle: {
          backgroundColor: '#fff'
          }}}/>
<Stack.Screen name='Sumtaxe' component={Sumtaxe} options={{
        headerShown: true,
        title: 'ภาษีเขตพัฒนาเศรษฐกิจพิเศษ',
          headerStyle: {
          backgroundColor: '#fff'
          }}}/>
<Stack.Screen name='Detail_taxe' component={Detail_taxe} options={{
        headerShown: true,
        title: 'รายละเอียด',
          headerStyle: {
          backgroundColor: '#fff'
          }}}/>
<Stack.Screen name='Quiz' component={Quiz} options={{
        headerShown: true,
        title: 'แบบทดสอบ',
          headerStyle: {
          backgroundColor: '#fff'
          }}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


