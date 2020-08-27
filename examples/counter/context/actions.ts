import { Dispatch } from 'react';

import { ReducerAction } from '../../../src';

export const LOADING = 'LOADING' as const;
export const INCREMENT = 'INCREMENT' as const;
export const DECREMENT = 'DECREMENT' as const;

type Nullable<T> = T | undefined | null;

export type Action =
  | ReducerAction<typeof LOADING, boolean>
  | ReducerAction<typeof INCREMENT, Nullable<number>>
  | ReducerAction<typeof DECREMENT, Nullable<number>>

type ActionDispatcher = Dispatch<Action>

export const increment = (payload?: Nullable<number>) =>
  (dispatch: ActionDispatcher) => dispatch({ type: INCREMENT, payload });

export const decrement = (payload?: Nullable<number>) =>
  (dispatch: ActionDispatcher) => dispatch({ type: DECREMENT, payload });

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export const incrementAsync = (payload?: Nullable<number>) =>
  async (dispatch: ActionDispatcher) => {
    dispatch({ type: LOADING, payload: true });

    await delay(1000);

    dispatch({ type: INCREMENT, payload });

    dispatch({ type: LOADING, payload: false });
  };

export const decrementAsync = (payload?: Nullable<number>) =>
  async (dispatch: ActionDispatcher) => {
    dispatch({ type: LOADING, payload: true });

    await delay(1000);

    dispatch({ type: DECREMENT, payload });

    dispatch({ type: LOADING, payload: false });
  };
