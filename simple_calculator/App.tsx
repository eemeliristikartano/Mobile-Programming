import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

type THistory = {
  numA: number
  numB: number
  operation: string
  result: number
}

export default function App() {
  const [history, setHistory] = useState<THistory[]>([]);
  const [result, setResult] = useState<number>(0);
  const [uppreInput, setUpperInput] = useState<string>('');
  const [lowerInput, setLowerInput] = useState<string>('');

  // Handles addition or subtraction.
  const handleMathematicalOperation = (operation: string) => {
    // If a decimal separator is a comma --> replace it with a dot. Change from a string to a number.
    const uppreInputAsNumber = Number(uppreInput.replace(',', '.'));
    const lowerInputAsNumber = Number(lowerInput.replace(',', '.'));
    // If the numbers are valid.
    if (isNumbers(uppreInputAsNumber, lowerInputAsNumber)) {

      // If the operation is an addtion.
      if (operation === '+') {
        setResult(uppreInputAsNumber + lowerInputAsNumber);
        addToHistory(uppreInputAsNumber, lowerInputAsNumber, operation);
      }

      // Else it is subtraction.
      else {
        setResult(uppreInputAsNumber - lowerInputAsNumber);
        addToHistory(uppreInputAsNumber, lowerInputAsNumber);
      }

      // If the numbers are not valid.
    } else {
      // Alert user if there is a problem with the numbers.
      Alert.alert('Error', 'Input must be a number!');
    }
  }

  /*
  * Are the numbers valid.
  */
  const isNumbers = (numA: number, numB: number): boolean => {
    if (isNaN(numA) || isNaN(numB)) return false;
    return true;
  }

  /*
  * Add calculation to history.
  */

  const addToHistory = (numA: number, numB: number, operation?: string): void => {
    if (operation === '+') {
      setHistory([...history,
      {
        numA: numA,
        numB: numB,
        operation: '+',
        result: numA + numB
      }
      ]);
    } else {
      setHistory([...history,
      {
        numA: numA,
        numB: numB,
        operation: '-',
        result: numA - numB
      }
      ]);
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
            onPress={() => handleMathematicalOperation('+')}
          />
        </View>
        <View style={{ width: 40 + '%' }} >
          <Button
            title='-'
            onPress={() => handleMathematicalOperation('-')}
          />
        </View>
      </View>
      <Text style={{ fontSize: 25 }} >History</Text>
      <FlatList
        data={history}
        renderItem={({ item, index }) => <Text style={{ fontSize: 20 }} >{`${index + 1}.    ${item.numA} ${item.operation} ${item.numB} = ${item.result}`}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 80
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
