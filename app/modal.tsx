import {Text , View, StyleSheet} from 'react-native'

export default function Modal(){
    return (
        <View style={styles.container}>
            <Text style={{fontSize:20}}>
                Esta es una pantalla modal de prueba..
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
