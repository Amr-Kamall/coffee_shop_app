/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import CartScreen from '../screens/CartScreen';
import {COLORS} from '../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlurView} from '@react-native-community/blur';
import {StyleSheet} from 'react-native';

const Tap = createBottomTabNavigator();

function HomeIcon({focused}) {
  return (
    <MaterialCommunityIcons
      name="home"
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
      size={25}
    />
  );
}

function CartIcon({focused}) {
  return (
    <MaterialCommunityIcons
      name="cart"
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
      size={25}
    />
  );
}

function HeartIcon({focused}) {
  return (
    <MaterialCommunityIcons
      name="heart"
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
      size={25}
    />
  );
}

function BellIcon({focused}) {
  return (
    <MaterialCommunityIcons
      name="bell"
      color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
      size={25}
    />
  );
}

function TapNavigator() {
  return (
    <Tap.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.primaryDarkGreyHex,
          elevation: 0,
          height: 60,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        // tabBarBackground: () => (
        //   <BlurView
        //     overlayColor="transparent"
        //     style={styles.blurView}
        //     blurType="light"
        //     blurAmount={10}
        //     reducedTransparencyFallbackColor="white"
        //   />
        // ),
      }}>
      <Tap.Screen
        component={HomeScreen}
        name="home"
        options={{tabBarIcon: HomeIcon}}
      />
      <Tap.Screen
        component={OrderHistoryScreen}
        name="orderHistory"
        options={{tabBarIcon: CartIcon}}
      />
      <Tap.Screen
        component={FavouritesScreen}
        name="favourites"
        options={{tabBarIcon: HeartIcon}}
      />
      <Tap.Screen
        component={CartScreen}
        name="bell"
        options={{tabBarIcon: BellIcon}}
      />
    </Tap.Navigator>
  );
}

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    ...StyleSheet.absoluteFillObject,
  },
});

export default TapNavigator;
