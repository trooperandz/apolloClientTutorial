import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {FlatList, SafeAreaView, StyleSheet, View, Text} from 'react-native';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export default function ExchangeRates() {
  const {loading, error, data} = useQuery(EXCHANGE_RATES);

  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  const renderItem = ({item, index}) => {
    return (
      <View key={index.toString()}>
        <Text>
          {item.currency}: {item.rate}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList data={data.rates} renderItem={renderItem} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
