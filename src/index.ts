import { Reducer, Dispatch, createContext, useReducer } from 'react';

export type ReducerAction<TType, TPayload = {}> = { type: TType, payload: TPayload };

/**
 * allows for multiple (async) dispatches and fetching the current state
 */
declare type ActionHandler<TAction, TState> = (dispatch: Dispatch<TAction>, getState: () => TState) => void | Promise<void>;

declare type DispatchWrapper<TAction, TState> = (handler: ActionHandler<TAction, TState>) => ReturnType<ActionHandler<TAction, TState>>;

declare type ContextTuple<TAction, TState> = [TState, DispatchWrapper<TAction, TState>]

/**
 * Creates a typed context
 */
export const createContextFactory = <TAction, TState>(initialState: TState) =>
  createContext([initialState as TState, null as unknown as DispatchWrapper<TAction, TState>] as ContextTuple<TAction, TState>);

/**
 * Creates a redux style React reducer
 */
export const createReducerFactory = <TAction, TState>(reducer: Reducer<TState, TAction>, initialState: TState) => () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchAsync = async (actionHandler: ActionHandler<TAction, TState>) => Promise.resolve(
    await actionHandler(dispatch, () => Object.freeze(state)));

  return [state, dispatchAsync] as ContextTuple<TAction, TState>;
};
