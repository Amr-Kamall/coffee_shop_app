import React from 'react';
import {View, StyleSheet} from 'react-native';
import PrimaryCoffeeButton from '../ui/PrimaryCoffeeButton';
import {useCoffeeContext} from '../../store/CoffeeContext';
import CoffeePrice from '../CoffeePrice';

function CoffeeTotalPrice({navigation}) {
  const {getTotalPrice} = useCoffeeContext();
  return (
    <View style={styles.pricingCoffee}>
      <CoffeePrice>{getTotalPrice().toFixed(2)}</CoffeePrice>
      <PrimaryCoffeeButton onPress={() => navigation.navigate('payment')}>
        Pay
      </PrimaryCoffeeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  pricingCoffee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginVertical: 10,
  },
});

export default CoffeeTotalPrice;
