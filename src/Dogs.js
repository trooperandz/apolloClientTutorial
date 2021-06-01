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
import DogPhotoPoll from './DogPhotoPoll';
import DogPhotoRefetch from './DogPhotoRefetch';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const Component = DogPhotoRefetch;

export default function Dogs() {
  const { loading, error, data } = useQuery(GET_DOGS);

  const [selectedBreeds, setSelectedBreeds] = useState([]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setSelectedBreeds([...selectedBreeds, item.breed])}>
      <Text style={styles.getItem(item.id, selectedBreeds)}>{item.breed}</Text>
      {selectedBreeds.includes(item.breed) ? (
        <Component breed={item.breed} />
      ) : null}
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
  getItem: (breed, selectedBreeds) => ({
    fontWeight: selectedBreeds.includes(breed) ? 'bold' : 'normal',
  }),
});
