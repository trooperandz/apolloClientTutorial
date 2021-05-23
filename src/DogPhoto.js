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

export default function DogPhoto({ breed }) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
  });

  if (loading) {
    return null;
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
