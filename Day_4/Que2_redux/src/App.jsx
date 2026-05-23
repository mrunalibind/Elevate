import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, resetCart } from './features/counter/counterSlice';

const App = () => {
  const count = useSelector((state) => state.counter.cartCount);
  const dispatch = useDispatch();

  function handleIncreament() {
    dispatch(addToCart())
  }

  function handleDecreament() {
    dispatch(removeFromCart())
  }

  function handleReset() {
    dispatch(resetCart())
  }

  return (
    <div>
      <h1>Redux Cart Counter</h1>
      <p>Cart Items: {count}</p>
      <button onClick={handleIncreament}>Add To Cart</button>
      <button onClick={handleDecreament}>Remove from Cart</button>
      <button onClick={handleReset}>Reset Cart</button>
    </div>
  )
}

export default App