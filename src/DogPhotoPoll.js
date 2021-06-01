import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Image, StyleSheet, Text } from 'react-native';

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

export default function DogPhotoPoll({ breed }) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    pollInterval: 1000,
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return <Image source={{ uri: data.dog.displayImage }} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
