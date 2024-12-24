import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useCoffeeContext} from '../store/CoffeeContext';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/ui/CustomIcon';

function CartScreen() {
  const {cart, setCart, removeCoffeeItem} = useCoffeeContext();

  function handleIncreaseQuantity(cartItem, size) {
    setCart(coffees =>
      coffees.map(coffeeItem =>
        coffeeItem.id === cartItem.id
          ? {
              ...coffeeItem,
              selectedSizes: coffeeItem.selectedSizes.map(sizeItem =>
                sizeItem.size === size.size
                  ? {
                      ...sizeItem,
                      quantity: sizeItem.quantity + 1, // Prevent negative quantity
                    }
                  : sizeItem,
              ),
            }
          : coffeeItem,
      ),
    );
  }

  function handleDecreaseQuantity(cartItem, size) {
    if (size.quantity === 1) {
      // Remove the size item if the current quantity is 1
      const updatedSizes = cartItem.selectedSizes.filter(
        sizeItem => sizeItem.size !== size.size,
      );

      if (updatedSizes.length === 0) {
        // Remove the entire cart item if no sizes are left
        removeCoffeeItem(cartItem.id);
      } else {
        // Update the cart item with remaining sizes
        setCart(coffees =>
          coffees.map(coffeeItem =>
            coffeeItem.id === cartItem.id
              ? {...coffeeItem, selectedSizes: updatedSizes}
              : coffeeItem,
          ),
        );
      }
    } else {
      // Decrease quantity if it's greater than 1
      setCart(coffees =>
        coffees.map(coffeeItem =>
          coffeeItem.id === cartItem.id
            ? {
                ...coffeeItem,
                selectedSizes: coffeeItem.selectedSizes.map(sizeItem =>
                  sizeItem.size === size.size
                    ? {...sizeItem, quantity: sizeItem.quantity - 1}
                    : sizeItem,
                ),
              }
            : coffeeItem,
        ),
      );
    }
  }

  return (
    <View style={styles.cartScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {cart.length === 0 ? (
          <EmptyListAnimation title="cart is empty" />
        ) : (
          <>
            <HeaderBar title="cart" />
            <View style={styles.cartContainer}>
              {cart.map(cartItem => (
                <View style={styles.cartWrapper} key={cartItem.id}>
                  {cartItem.selectedSizes.length !== 1 ? (
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                      style={styles.CartItemLinearGradient}>
                      <View style={styles.CartItemRow}>
                        <Image
                          source={cartItem.imagelink_square}
                          style={styles.CartItemImage}
                        />
                        <View style={styles.CartItemInfo}>
                          <View>
                            <Text style={styles.CartItemTitle}>
                              {cartItem.name}
                            </Text>
                            <Text style={styles.CartItemSubtitle}>
                              {cartItem.special_ingredient}
                            </Text>
                          </View>
                          <View style={styles.CartItemRoastedContainer}>
                            <Text style={styles.CartItemRoastedText}>
                              {cartItem.roasted}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {cartItem.selectedSizes.map((data, index) => (
                        <View
                          key={index.toString()}
                          style={styles.CartItemSizeRowContainer}>
                          <View style={styles.CartItemSizeValueContainer}>
                            <View style={styles.SizeBox}>
                              <Text
                                style={[
                                  styles.SizeText,
                                  {
                                    fontSize:
                                      cartItem.type === 'Bean'
                                        ? FONTSIZE.size_12
                                        : FONTSIZE.size_16,
                                  },
                                ]}>
                                {data.size}
                              </Text>
                            </View>
                            <Text style={styles.SizeCurrency}>
                              {data.currency}
                              <Text style={styles.SizePrice}>
                                {' '}
                                {data.price *
                                  cartItem.selectedSizes[index].quantity}
                              </Text>
                            </Text>
                          </View>
                          <View style={styles.CartItemSizeValueContainer}>
                            <TouchableOpacity
                              style={styles.CartItemIcon}
                              onPress={() =>
                                handleDecreaseQuantity(cartItem, data)
                              }>
                              <CustomIcon
                                name="minus"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}
                              />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                              <Text style={styles.CartItemQuantityText}>
                                {data.quantity}
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={styles.CartItemIcon}
                              onPress={() => {
                                handleIncreaseQuantity(cartItem, data);
                              }}>
                              <CustomIcon
                                name="plus"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </LinearGradient>
                  ) : (
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                      style={styles.CartItemSingleLinearGradient}>
                      <View>
                        <Image
                          source={cartItem.imagelink_square}
                          style={styles.CartItemSingleImage}
                        />
                      </View>
                      <View style={styles.CartItemSingleInfoContainer}>
                        <View>
                          <Text style={styles.CartItemTitle}>
                            {cartItem.name}
                          </Text>
                          <Text style={styles.CartItemSubtitle}>
                            {cartItem.special_ingredient}
                          </Text>
                        </View>
                        <View style={styles.CartItemSingleSizeValueContainer}>
                          <View style={styles.SizeBox}>
                            <Text
                              style={[
                                styles.SizeText,
                                {
                                  fontSize:
                                    cartItem.type === 'Bean'
                                      ? FONTSIZE.size_12
                                      : FONTSIZE.size_16,
                                },
                              ]}>
                              {cartItem.selectedSizes[0].size}
                            </Text>
                          </View>
                          <Text style={styles.SizeCurrency}>
                            {cartItem.selectedSizes[0].currency}
                            <Text style={styles.SizePrice}>
                              {' '}
                              {cartItem.selectedSizes[0].price *
                                cartItem.selectedSizes[0].quantity}
                            </Text>
                          </Text>
                        </View>
                        <View style={styles.CartItemSingleQuantityContainer}>
                          <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() =>
                              handleDecreaseQuantity(
                                cartItem,
                                cartItem.selectedSizes[0],
                              )
                            }>
                            <CustomIcon
                              name="minus"
                              color={COLORS.primaryWhiteHex}
                              size={FONTSIZE.size_10}
                            />
                          </TouchableOpacity>
                          <View style={styles.CartItemQuantityContainer}>
                            <Text style={styles.CartItemQuantityText}>
                              {cartItem.selectedSizes[0].quantity}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() =>
                              handleIncreaseQuantity(
                                cartItem,
                                cartItem.selectedSizes[0],
                              )
                            }>
                            <CustomIcon
                              name="plus"
                              color={COLORS.primaryWhiteHex}
                              size={FONTSIZE.size_10}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </LinearGradient>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cartScreen: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  cartItem: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 20,
  },
  // ****************
  cartContainer: {
    marginBottom: 50,
  },
  cartWrapper: {
    marginVertical: 20,
  },
  CartItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CartItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1,
  },
  CartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CartItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  CartItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CartItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  CartItemRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    flex: 1,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  SizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  CartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  CartItemSingleQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default CartScreen;
