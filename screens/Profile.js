import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Switch,
  RefreshControl,
  Button,
  SafeAreaView,
  Share,
  Linking
} from 'react-native';
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({route,navigation}) {
  
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    load()
    wait(2000).then(() => setRefreshing(false));
  }, []);

    const [Email , setEmail] = useState('');
    const [user , setUser] = useState('');

    const load = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
console.log('uid: '+uid);
            if(uid!== null) {
                //setEmail(email)
                fetch('https://taxcalculator.ml/profile.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => setUser(json))
        .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        try {
          await AsyncStorage.clear()
          setUser('')
          setEmail('')
          Alert.alert('สำเร็จ','ออกจากระบบแล้ว')
          navigation.replace('Login')
        } catch (e) {
          Alert.alert('Failed to clear the async storage.')
        }
      };

    useEffect(() => {
load()
const unsubscribe = navigation.addListener('focus', () => {
  {onRefresh()}{load()}
});
return unsubscribe;
}, [navigation]);

  return (
    <View style={styles.container}>
      
    <View style={{paddingTop:7}}>
    
    <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{paddingHorizontal:20}}>
          <View style={styles.userImage}>
            <Image source={ user ? {uri:user.img}: require('./img/profile.png')} style={{width: 100, height:100,borderRadius:50 }}/>
          </View>
          <View style={{justifyContent: 'center', alignItems:'center'}}>
         <Text style={{textAlign: 'center',fontSize:25,paddingHorizontal: 20}}>{user.name}</Text>
         <Text style={{textAlign: 'center',fontSize:16,paddingHorizontal: 20}}>{user.email}</Text>
          </View>
        </View>
        <Text style={{padding:10,paddingTop:30}}>บัญชี</Text>
        
      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Editprofile')}>
      <FontAwesome5 name="user" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>แก้ข้อมูลส่วนตัว</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Quiz')}>
      <FontAwesome5 name="play-circle" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>การเรียนรู้ในการลดหย่อน</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
{user.social == 'email' ?
      <ListItem  bottomDivider onPress={() => navigation.navigate('ChangePassword')}>
      <FontAwesome5 name="lock" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>เปลี่ยนรหัสผ่าน</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      :null}

      {/* <ListItem  bottomDivider onPress={() => navigation.navigate(user !== '' ? 'ChangePassword':'Login')}>
      <FontAwesome5 name="history" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{}}>รายงานผล</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem> */}

<View style={{padding:7,paddingTop:15}}>
{user !== '' ?
      <Button title="ออกจากระบบ" color="green"  onPress={() => logout()}/>
      :null}
</View>
<View style={{paddingBottom:60}}></View>

      </ScrollView>
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f8f7fd'
      },
    scroll: {
        backgroundColor: 'white',
      },
      userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
      },
      userImage: {
        marginRight: 12,
        alignItems: 'center',
        paddingTop:10,
      },
      listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
      },
  coverImage: { height: 300, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontSize: 26 },
  userBio: {
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontSize: 20 },
  countText: { fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {
    fontSize: 18,
  },
});