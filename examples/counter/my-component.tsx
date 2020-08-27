import React, { useContext } from 'react';

import { MyContext, useMyReducer } from './context/reducer';
import { increment, incrementAsync, decrement, decrementAsync } from './context/actions';

const MyComponent = () => {
  const [state, dispatch] = useContext(MyContext);
  return (
    <>
      <div>Clicked {state.count} times!</div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(increment(5))}>increment 5</button>
      <button onClick={() => dispatch(incrementAsync())}>increment async</button>
      <button onClick={() => dispatch(decrementAsync())}>decrement async</button>
      <button onClick={() => dispatch(decrement(5))}>decrement 5</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </>
  );
};

const MyComponentWithContext = () => {
  const [state, dispatch] = useMyReducer();

  return (<MyContext.Provider value={[state, dispatch]}><MyComponent /></MyContext.Provider>)
}

export default MyComponentWithContext;
