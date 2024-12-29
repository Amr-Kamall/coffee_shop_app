/* eslint-disable react/react-in-jsx-scope */
import {createContext, useContext, useState} from 'react';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import {ToastAndroid} from 'react-native';

const CoffeeContext = createContext();

function CoffeeProvider({children}) {
  const [coffeeList, setCoffeeList] = useState(CoffeeData);
  const [beansList, setBeansList] = useState(BeansData);
  const [cart, setCart] = useState([]);
  const [favouritesCoffee, setFavouritesCoffee] = useState([]);

  function addToCart(coffee) {
    setCart(currentCart => {
      const existingCoffee = currentCart.find(item => item.id === coffee.id);

      if (existingCoffee) {
        const sizeExists = existingCoffee.selectedSizes.some(
          size => size.size === coffee.selectedSizes.size,
        );

        if (!sizeExists) {
          // Create a new array for selectedSizes
          const updatedSizes = [
            ...existingCoffee.selectedSizes,
            coffee.selectedSizes,
          ];

          // Create a new coffee object
          const updatedCoffee = {
            ...existingCoffee,
            selectedSizes: updatedSizes,
          };

          // Replace the existing coffee with the updated one
          return currentCart.map(item =>
            item.id === coffee.id ? updatedCoffee : item,
          );
        }

        // If size already exists, return currentCart without modification
        return currentCart;
      }

      // If coffee is not in the cart, add it as a new entry
      return [
        ...currentCart,
        {...coffee, selectedSizes: [coffee.selectedSizes]},
      ];
    });

    ToastAndroid.showWithGravity(
      `${coffee.name} with size ${coffee.selectedSizes.size} added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  function addToFavourite(newFavourite) {
    setFavouritesCoffee(favourites => {
      const isCoffeeFavourite = favourites.some(
        favouriteItem => favouriteItem.id === newFavourite.id,
      );
      if (isCoffeeFavourite) {
        // Remove from favourites if already added
        return favourites.filter(
          favouriteItem => favouriteItem.id !== newFavourite.id,
        );
      } else {
        // Add to favourites
        return [...favourites, newFavourite];
      }
    });
    console.log('favourites:', favouritesCoffee);
  }

  function removeCoffeeItem(coffeeId) {
    setCart(coffees => coffees.filter(coffee => coffee.id !== coffeeId));
  }

  function getTotalPrice() {
    const prices = cart.map(cartItem =>
      cartItem.selectedSizes.reduce(
        (acc, cur) => acc + Number(cur.price) * cur.quantity,
        0,
      ),
    );
    return prices?.reduce((acc, cur) => acc + cur, 0);
  }
  console.log('price data amrooo:', getTotalPrice());

  // console.log('cart ahee:', cart);

  return (
    <CoffeeContext.Provider
      value={{
        coffeeList: coffeeList,
        beansList: beansList,
        addToCart: addToCart,
        addToFavourite: addToFavourite,
        favouritesCoffee: favouritesCoffee,
        cart: cart,
        setCart: setCart,
        removeCoffeeItem: removeCoffeeItem,
        getTotalPrice: getTotalPrice,
      }}>
      {children}
    </CoffeeContext.Provider>
  );
}

function useCoffeeContext() {
  const context = useContext(CoffeeContext);
  if (context === undefined) {
    throw new Error('Coffee context is used outside CoffeeProvider');
  }
  return context;
}

export {CoffeeProvider, useCoffeeContext};
