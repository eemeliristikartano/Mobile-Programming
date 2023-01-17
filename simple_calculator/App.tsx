import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState<number>(0);
  const [uppreInput, setUpperInput] = useState<string>('');
  const [lowerInput, setLowerInput] = useState<string>('');

  // Handels addition or subtraction.
  const handleMathematicalOperation = (operation: string) => {
    // If a decimal separator is a comma --> replace it with a dot. Change from a string to a number.
    const uppreInputAsNumber = Number(uppreInput.replace(',', '.'));
    const lowerInputAsNumber = Number(lowerInput.replace(',', '.'));
    // It the numbers are valid.
    if (!Number.isNaN(uppreInputAsNumber) && !Number.isNaN(lowerInputAsNumber)) {
      // If the operation is an addtion.
      if (operation === 'addition') setResult(uppreInputAsNumber + lowerInputAsNumber);
      // Else it is subtraction.
      else setResult(uppreInputAsNumber - lowerInputAsNumber);
    } else {
      // Alert user if there is a problem with the numbers.
      Alert.alert('Error', 'Input must be a number!');
    }
  }


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }} >Result: {result.toFixed(2)}</Text>
      <View>
        <TextInput
          style={styles.textInput}
          value={uppreInput}
          onChangeText={input => setUpperInput(input)}
          keyboardType='number-pad'
        />
        <TextInput
          style={styles.textInput}
          value={lowerInput}
          onChangeText={input => setLowerInput(input)}
          keyboardType='number-pad'
        />
      </View>
      <View style={styles.buttonContainer} >
        <View style={{ width: 40 + '%' }} >
          <Button
            title='+'
            onPress={() => handleMathematicalOperation('addition')}
          />
        </View>
        <View style={{ width: 40 + '%' }} >
          <Button
            title='-'
            onPress={() => handleMathematicalOperation('subtraction')}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    borderColor: 'black',
    width: 200,
    borderRadius: 10,
    borderWidth: 1
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 200,
    marginTop: 20,
  }
});
