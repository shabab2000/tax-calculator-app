import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'

export default function Detail_receipt({route,navigation}) {
    return (
        <View style={styles.container}>
            <Image source={{uri:'https://taxcalculator.ml/receipt/'+route.params.img}} style={{width: '100%',height:'100%'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
