import { createContextFactory, createReducerFactory } from '../../../src';

import { initialState, State } from './state';
import { Action, LOADING, INCREMENT, DECREMENT } from './actions';

export const MyContext = createContextFactory<Action, State>(initialState);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case LOADING: return { ...state, loading: action.payload };
    case INCREMENT: return { ...state, count: (state.count ?? 0) + (action.payload ?? 1) };
    case DECREMENT: return { ...state, count: (state.count ?? 0) - (action.payload ?? 1) };
    default: return state;
  }
}

export const useMyReducer = createReducerFactory<Action, State>(reducer, initialState);
