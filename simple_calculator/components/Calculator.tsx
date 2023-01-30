import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { styles } from '../Styles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamsList, THistory } from '../types';

type Props = NativeStackScreenProps<StackParamsList, 'Calculator'>

export default function Calculator({ navigation }: Props) {
    const [uppreInput, setUpperInput] = useState<string>('');
    const [lowerInput, setLowerInput] = useState<string>('');
    const [result, setResult] = useState<number>(0);
    const [history, setHistory] = useState<THistory[]>([]);

    // Handles addition or subtraction.
    const handleMathematicalOperation = (operation: string) => {
        // If a decimal separator is a comma --> replace it with a dot. Change from a string to a number.
        const uppreInputAsNumber = Number(uppreInput.replace(',', '.'));
        const lowerInputAsNumber = Number(lowerInput.replace(',', '.'));
        // If the numbers are valid.
        if (isNumber(uppreInputAsNumber) && isNumber(lowerInputAsNumber)) {

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

    const isNumber = (num: number): boolean => {
        if (isNaN(num)) return false;
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
                <View style={{ width: 20 + '%' }} >
                    <Button
                        title='+'
                        onPress={() => handleMathematicalOperation('+')}
                    />
                </View>
                <View style={{ width: 20 + '%' }} >
                    <Button
                        title='-'
                        onPress={() => handleMathematicalOperation('-')}
                    />
                </View>
                <View style={{ width: 40 + '%' }} >
                    <Button
                        title='History'
                        onPress={() => navigation.navigate('History', history)}
                    />
                </View>
            </View>
        </View>
    );
}
