import React, { useContext } from 'react';

import { MyContext, useMyReducer } from './context/reducer';
import { increment, incrementAsync, decrement, decrementAsync } from './context/actions';

const MyComponent = () => {
  const [state, dispatch] = useContext(MyContext);

  return (
    <>
      { state.loading ? <div>Loading, please wait!</div> : null }
      <div>Clicked {state.count} times!</div>
      <button disabled={state.loading} onClick={() => dispatch(increment())}>increment</button>
      <button disabled={state.loading} onClick={() => dispatch(increment(5))}>increment 5</button>
      <button disabled={state.loading} onClick={() => dispatch(incrementAsync())}>increment async</button>
      <button disabled={state.loading} onClick={() => dispatch(decrementAsync())}>decrement async</button>
      <button disabled={state.loading} onClick={() => dispatch(decrement(5))}>decrement 5</button>
      <button disabled={state.loading} onClick={() => dispatch(decrement())}>decrement</button>
    </>
  );
};

const MyComponentWithContext = () => {
  const [state, dispatch] = useMyReducer();

  return (<MyContext.Provider value={[state, dispatch]}><MyComponent /></MyContext.Provider>)
}

export default MyComponentWithContext;
