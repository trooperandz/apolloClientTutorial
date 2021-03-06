import React from 'react';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

export default function DogPhotoRefetch({ breed }) {
  const { loading, error, data, networkStatus, refetch } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {networkStatus === NetworkStatus.refetch ? (
        <Text>Refetching...</Text>
      ) : loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Image source={{ uri: data.dog.displayImage }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={() => refetch()}>
            <Text style={styles.text}>Refetch</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4aa',
    width: 100,
    height: 30,
    borderRadius: 8,
    marginBottom: 6,
  },
  container: {
    alignItems: 'center',
    height: 152,
  },
  image: {
    height: 100,
    width: 100,
    margin: 8,

    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
