import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Notification from './Notification';

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
        
        tabBarOptions={{
       activeTintColor: 'blue',
       //inactiveTintColor: 'lightgray',
       //activeBackgroundColor: '#24AA0F',
       //inactiveBackgroundColor: '#6CA15E',
          // style: {
          //       backgroundColor: '#6CA15E',
           //      paddingBottom: 3
          // }
    }}
        >
            <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: 'หน้าแรก',
                headerShown: true,
                tabBarLabel: 'หน้าแรก',
                tabBarIcon: ({ color , size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                )
            }}
            />
            <Tab.Screen
            name="Notification"
            component={Notification}
            options={{
                title: 'การแจ้งเตือน',
                headerShown: true,
                tabBarLabel: 'การแจ้งเตือน',
                tabBarIcon: ({ color , size }) => (
                    <MaterialCommunityIcons name="bell" color={color} size={size} />
                )
            }}
            />
            <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
                title: 'โปรไฟล์',
                headerShown: true,
                tabBarLabel: 'โปรไฟล์',
                tabBarIcon: ({ color , size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                )
            }}
            />

        </Tab.Navigator>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
