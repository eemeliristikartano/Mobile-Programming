import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  useState,
  useEffect
} from 'react';

export default function App() {
  const [correctNumber, setCorrectNumber] = useState<number>(-1);
  // There will be at least one guess in this game, so starting value is 1.
  const [guessCounter, setGuessCounter] = useState<number>(1);
  const [guess, setGuess] = useState<string>('');
  const [helperText, setHelperText] = useState<string>('');

  useEffect(() => {
    resetGame();
  }, []);

  // Handles resetting the game. 
  const resetGame = () => {
    setCorrectNumber(Math.floor(Math.random() * 100) + 1);
    // There will be at least one guess in this game, so starting value is 1.
    setGuessCounter(1);
    setHelperText('Guess a number between 1-100');
    setGuess('');

  }

  const handleGuess = () => {
    // Change type from string to a number
    const guessAsNumber = Number(guess.replace(',', '.'));
    // It the guess is a valid number
    if (!Number.isNaN(guessAsNumber)) {
      // Add one guess to the counter.
      setGuessCounter((prevCount) => prevCount + 1);
      // It the guess is correct.
      if (guessAsNumber === correctNumber) {
        Alert.alert('Correct!', `You guessed the number in ${guessCounter} guesses`);
        resetGame();
        // If the guess is too low.  
      } else if (guessAsNumber < correctNumber) {
        setHelperText(`Your guess ${guess} is too low`);
        // It the guess is too high.
      } else if (guessAsNumber > correctNumber) {
        setHelperText(`Your guess ${guess} is too high`);
      }
      // If the guess is not a valid guess.
    } else {
      Alert.alert('Guess must be a number', 'Please provide a valid guess.')
    }
  }



  return (
    <View style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text>{helperText}</Text>
      </View>
      <View style={{ padding: 10 }}>
        <TextInput
          style={styles.textInput}
          value={guess}
          onChangeText={input => setGuess(input)}
          keyboardType='number-pad'
        />
      </View>
      <View style={{ padding: 10 }}>
        <Button
          title='Make guess'
          onPress={handleGuess}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textInput: {
    borderColor: 'black',
    width: 200,
    borderRadius: 10,
    borderWidth: 1
  }
});
