/* eslint-disable react/react-in-jsx-scope */
import {createContext, useContext, useState} from 'react';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

const CoffeeContext = createContext();

function CoffeeProvider({children}) {
  const cofeeList = CoffeeData;
  const beansList = BeansData;
  const [cart, setCart] = useState([]);

  function addToCart(coffee) {
    const isSelectedBefore = cart.find(coffeeItem => coffeeItem === coffee);
    if (!isSelectedBefore) {
      setCart(coffees => [...coffees, coffee]);
    }
  }
  console.log(cart);
  return (
    <CoffeeContext.Provider
      value={{
        cofeeList: cofeeList,
        beansList: beansList,
        addToCart: addToCart,
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
