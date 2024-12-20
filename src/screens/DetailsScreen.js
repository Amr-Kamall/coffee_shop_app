import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import BackgroundCoffee from '../components/BackgroundCoffee';
import {COLORS} from '../theme/theme';

function DetailsScreen({route}) {
  const selectedCoffee = route.params.coffee;
  console.log(selectedCoffee);

  return (
    <View style={styles.container}>
      <BackgroundCoffee coffee={selectedCoffee} />
      <View style={styles.another}>
        <Text style={styles.coffeeDescriptionTitle}>description</Text>
        <Text style={styles.coffeeDescription}>
          {selectedCoffee.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  another: {
    flex: 0.5,
    backgroundColor: COLORS.primaryBlackHex,
    padding: 20,
  },
  coffeeDescriptionTitle: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: 18,
    fontWeight: '500',
  },
  coffeeDescription: {
    color: COLORS.primaryWhiteHex,
    marginVertical:10,
  },
});

export default DetailsScreen;
