import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Link href='/product'>Check product</Link>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    alignItems:'center'
 }
});
