import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [item, setItem] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const addItemToItems = () => {
    setItems([...items, item]);
    setItem('');
  }

  const deleteItem = (indexFromList: number) => {
    setItems(
      items.filter((item, index) => index != indexFromList)
    );
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={item}
        onChangeText={input => setItem(input)}
      />
      <View
        style={{ flexDirection: 'row', marginTop: 20 }}
      >
        <Button
          onPress={addItemToItems}
          title='ADD' />
        <Button
          onPress={() => setItems([])}
          title='CLEAR' />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 25 }}>Shopping list</Text>
        <FlatList
          data={items}
          renderItem={({ item, index }) =>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
              <Text style={{ fontSize: 20 }}>{item}</Text>
              <View style={{ width: 70, height: 50 }}>
                <Button
                  title='Delete'
                  onPress={() => deleteItem(index)}
                />
              </View>
            </View>}
          keyExtractor={(item, index) => index.toString()}
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
    marginTop: 100
  },
  textInput: {
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  }
});
