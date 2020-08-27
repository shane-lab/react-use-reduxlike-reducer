# REACT-USE-REDUXLIKE-REDUCER

![NPM VERSION](https://img.shields.io/npm/v/react-use-reduxlike-reducer.svg)
![Dependencies](https://img.shields.io/badge/dependencies-none!%20%F0%9F%8E%89-lightgrey)

A factory to create a React `useReducer` Hook with [Redux](https://redux.js.org/basics/reducers)-like reducers and actions.

Available as [NPM package](https://www.npmjs.com/package/react-use-reduxlike-reducer).

## Why?

By default, `useReducer` does not provide an easy way to dispatch asynchronous actions or chaining multiple dispatches from a single action.

`react-use-reduxlike-reducer` is a package that exposes a factory method to create a wrapper around the `useReducer` hook that will make your actions behave like actions from React Redux or React Saga. This package is built with TypeScript and is completely typesafe.

```jsx

import { createReducerFactory } = from 'react-use-reduxlike-reducer';

const fetchMyData = async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  const myData = await myApiClient.getData();
  dispatch({ type: 'NEW_DATA', payload: myData });

  dispatch({ type: 'LOADING', payload: false });
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING': return { ...state, loading: action.payload };
    case 'NEW_DATA': return { ...state, data: action.payload };
    default: return state;
  }
};

const initialState = { loading: false, data: [] };

const useMyReducer = createReducerFactory(reducer, initialState);

const MyComponent = () => {
  const [state, dispatch] = useMyReducer();

  return (
    <>
      {state.loading ? <div>Loading, please wait!</div> : null }
      <ul>
        {state.data.map((item, i) => (<li key={i}>{item}</li>))}
      </ul>
      <button
        disabled={state.loading}
        onClick={() => dispatch(fetchData)}>
        load data
      </button>
    </>
  );
}

```

The second argument of an action is a method to get your current state. This way, you can get the changed state in between dispatches.

```js

const myAction = async (dispatch, getState) => {
  const stateBeforeDispatch = getState();
  
  dispatch({ ... });

  const stateAfterDispatch = getState();
};
```

See the examples folder for [an use case](./examples/counter/my-component.tsx) using reducer + context Hooks in combination with TypeScript.
