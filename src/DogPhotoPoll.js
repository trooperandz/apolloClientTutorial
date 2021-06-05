import React from 'react';
import { gql, NetworkStatus, useQuery } from '@apollo/client';
import { Image, StyleSheet, Text, View } from 'react-native';

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

// TODO: never getting the poll network status back
export default function DogPhotoPoll({ breed }) {
  const { loading, error, data, networkStatus } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    notifyOnNetworkStatusChange: true,
    pollInterval: 1200,
  });

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  console.log({ networkStatus });
  return (
    <View style={styles.container}>
      {networkStatus === NetworkStatus.poll ? (
        <Text>Polling...</Text>
      ) : loading ? (
        <Text>Loading...</Text>
      ) : (
        <Image source={{ uri: data.dog.displayImage }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
});
