/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import GradientIcon from './GradientIcon';
import {COLORS} from '../theme/theme';
import CustomIcon from './CustomIcon';
import {useNavigation} from '@react-navigation/native';

function BackgroundCoffee({coffee}) {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.backgroundImageContainer}
      source={coffee.imagelink_portrait}>
      {/* header background */}
      <View style={styles.backgroundHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <GradientIcon
            size={20}
            name="arrow-left"
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <GradientIcon size={20} name="heart" color={COLORS.primaryRedHex} />
        </TouchableOpacity>
      </View>
      {/* footer background */}
      <View style={styles.backgroundFooter}>
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.coffeeName}>{coffee.name}</Text>
            <Text style={styles.specialIngredient}>
              {coffee.special_ingredient}
            </Text>
          </View>
          <View style={styles.coffeeIconsContainer}>
            <View style={styles.coffeeIconContainer}>
              <Image
                style={styles.imageCoffeIcon}
                source={
                  coffee.type === 'Bean'
                    ? require('../assets/app_images/bean.png')
                    : require('../assets/app_images/beans.png')
                }
              />
              <Text style={styles.coffeeText}>{coffee.type}</Text>
            </View>
            <View style={styles.coffeeIconContainer}>
              <CustomIcon
                name={coffee.type === 'Bean' ? 'map-marker' : 'water'}
                size={24}
                color={COLORS.primaryOrangeHex}
              />
              <Text style={styles.coffeeText}>
                {coffee.type === 'Bean' ? coffee.origin : coffee.ingredients}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footerRow}>
          <View style={styles.ratingContainer}>
            <CustomIcon name="star" color={COLORS.primaryOrangeHex} size={24} />
            <Text style={styles.coffeeRate}>{coffee.average_rating}</Text>
            <Text style={styles.coffeeRateCount}>({coffee.ratings_count})</Text>
          </View>
          <View
            style={[
              styles.coffeeIconContainer,
              {width: 'auto', paddingHorizontal: 15},
            ]}>
            <Text style={styles.coffeeRoasted}>{coffee.roasted}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImageContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  imageCoffeIcon: {
    width: 25,
    height: 25,
  },
  backgroundFooter: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
    gap: 15,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  coffeeName: {
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
    fontSize: 23,
  },
  specialIngredient: {
    color: COLORS.secondaryLightGreyHex,
  },
  coffeeIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  coffeeIconContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 55,
    height: 55,
  },
  coffeeText: {
    color: COLORS.secondaryLightGreyHex,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  coffeeRate: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
  },
  coffeeRateCount: {
    color: COLORS.secondaryLightGreyHex,
  },
  coffeeRoasted: {
    color: COLORS.secondaryLightGreyHex,
  },
});

export default BackgroundCoffee;

//  name={type == 'Bean' ? 'location' : 'drop'}
//  name={type == 'Bean' ? 'bean' : 'beans'}
