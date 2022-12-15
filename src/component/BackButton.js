import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.goBackcontainer}>
      <Image
        style={styles.goBackimage}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  goBackcontainer: {
    position: 'absolute',
    top: 5 + getStatusBarHeight(),
    left: 25,
  },
  goBackimage: {
    width: 25,
    height: 25,
  },
})