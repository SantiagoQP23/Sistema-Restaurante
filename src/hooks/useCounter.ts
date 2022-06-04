import {useState} from 'react';

export const useCounter = (initialState = 1) => {
  const [state, setstate] = useState(initialState);

  const increment = () => {
    setstate( state + 1);
  }

  const decrement = () => {
    
    setstate(state > 0 ? state - 1 : 0);
  }

  return {
    state, increment, decrement
  }
  
}
