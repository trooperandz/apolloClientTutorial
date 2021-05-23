import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import DogPhoto from './DogPhoto';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

export default function Dogs() {
  const { loading, error, data } = useQuery(GET_DOGS);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setSelectedBreed(item.breed)}>
      <Text style={styles.getItem(item.id, selectedBreed)}>{item.breed}</Text>
      {selectedBreed === item.breed ? <DogPhoto breed={selectedBreed} /> : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <FlatList data={data.dogs} renderItem={renderItem} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getItem: (breed, selectedBreed) => ({
    fontWeight: breed === selectedBreed ? 'bold' : 'normal',
  }),
});
