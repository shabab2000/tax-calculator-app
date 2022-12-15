import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";

const Otp = ({ route, navigation }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(route.params.email);
  const [ref, setRef] = useState("");
  const [otps, setOtps] = useState('');

  const load = async () => {
    try {
            fetch('https://taxcalculator.ml/otp.php?email='+email)
  .then((response) => response.json())
  .then((json) => setOtp(json))
  .catch((error) => console.error(error))
        
    } catch (err) {
        console.log(err);
    }
};

  const handlePress = async () => {
    try {
      if (!otps) {
        Alert.alert("แจ้งเตือน!", "กรุณากรอก OTP !");
      } else {
        fetch('https://taxcalculator.ml/check_otp.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
             
                email: email,
                otp:otps,
                ref:otp.ref

              })
            }).then((response) => response.json()) 
                  .then((responseJson) => {
            
                    if(responseJson === 'success')
                    {
                      navigation.replace('Resetpassword',{email:email});
                    }
                    else{
                      Alert.alert('แจ้งเตือน!',responseJson);
                    }
                  }).catch((error) => {
                    console.log(error);
                  });
      }
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    load()
  }, []);
  console.log(otp);

  return (
      <View style={styles.container}>
            
            <Text style={styles.resetpasswordTitleText}>OTP</Text>

            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10 , paddingBottom: 10}}>
                <Text style={{fontSize:25,}}>ยืนยันรหัส OTP</Text>
            </View>
            <View style={{paddingHorizontal: 40,paddingTop: 20,paddingBottom: 10}}>
            <View style={{alignItems: 'center'}}>
        <Text style={{alignItems: 'center',color: '#000',fontSize:16,paddingTop:10,}}>รหัสยืนยันตัวตนจะถูกส่งไปทางอีเมล</Text>
        <Text style={{alignItems: 'center',color: '#749d63',fontSize:18,paddingTop:10}}>{email}</Text>
        <Text style={{alignItems: 'center',color: '#000',fontSize:14,paddingBottom:30,paddingTop:10}}>รหัสอ้างอิง : { otp ? otp.ref : 5}</Text>
        
        
        
            <View style={styles.inputView}>
              <Text style={styles.inputLabel}>รหัส OTP :</Text>
              <TextInput
                placeholder="กรุณากรอกรหัส OTP"
                style={{fontSize:16}}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={6}
                textContentType="telephoneNumber"
                onChangeText={(otp) => setOtps(otp)}
              />
            </View>
            </View>

            <View style={{}}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handlePress}
            >
              <Text style={styles.resetpasswordButtonText}>รีเซ็ตรหัสผ่าน</Text>
            </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
            </View>

           
      </View>
      </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  centerizedView: {
    width: "100%",
    top: "30%",
  },
 
  resetpasswordTitleText: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: '#ffffff'
  },
  hrTop: {
    width: "80%",
    height: 2,
    backgroundColor: "#444",
    marginTop: 6,
  },
  hrLow: {
    width: "60%",
    height: 2,
    backgroundColor: "#444",
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
    paddingHorizontal: 50
  },
  inputLabel: {
    fontSize: 20,
    marginBottom: 6,
  },
  inputView: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4B4B4B',
    borderRadius: 10,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
},
loginButton: {
  backgroundColor: '#ffcc00',
  marginTop: 30,
  paddingVertical: 10,
  borderRadius: 25,
  shadowColor: '#000',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
},
  resetpasswordButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  resetpasswordlinkText: {
    textAlign: "center",
    fontSize: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },

  goBackimage: {
    width: 25,
    height: 25,
  },
});
