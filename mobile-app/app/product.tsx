import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Products = () => {
  return (
    <View>
      <Text style={styles.container}>Products</Text>
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        alignItems:'center'
     }
})