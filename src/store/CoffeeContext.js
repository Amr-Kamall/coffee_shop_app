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
        // Check if the size already exists
        const sizeExists = existingCoffee.selectedSizes.some(
          size => size.size === coffee.selectedSizes.size,
        );

        if (!sizeExists) {
          // Add the new size to the existing coffee item
          existingCoffee.selectedSizes.push(coffee.selectedSizes);
        }
        return [...currentCart];
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

  function addToFavourite(newFavourite, isFavourite) {
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
  }

  function removeCoffeeItem(coffeeId) {
    setCart(coffees => coffees.filter(coffee => coffee.id !== coffeeId));
  }

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
