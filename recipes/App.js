import { Button, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [searchWord, setSearchWord] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(err => console.error(err))
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) =>
          <View style={{ height: 120, marginTop: 20 }} >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{item.strMeal}</Text>
            <Image
              style={styles.image}
              source={{
                uri: item.strMealThumb
              }}
            />
          </View>}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={input => setSearchWord(input)}
        value={searchWord}
      />
      <Button title='Search' onPress={handleSearch} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  image: {
    width: 100,
    height: 100
  }
});
