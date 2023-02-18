import React, { useContext } from 'react';
import { Header } from './Components/Header/Header'
import './main.module.css'
import { AvailableMeals } from './Components/MealsSection/AvailableMeals/AvailableMeals'
import { Cart } from './Components/Cart/Cart';
import Context from './Context/Context';
function App() {
  const contextAPI = useContext(Context);
  return (
    <>
      {contextAPI.isCartOpened && <Cart />}
      <Header />
      <AvailableMeals />
    </>
  );
}

export default App;
