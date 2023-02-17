import React from 'react';
import { Header } from './Components/Header/Header'
import './main.module.css'
import { AvailableMeals } from './Components/MealsSection/AvailableMeals/AvailableMeals'
import { Cart } from './Components/Cart/Cart';
function App() {
  return (
    <>
      <Cart />
      <Header />
      <AvailableMeals />
    </>
  );
}

export default App;
