import { AppState } from '../index-reducers';

export interface IState {
  store: AppState
}

export const loadState = ():AppState | undefined => {
  try {
    const serializedState = localStorage.getItem('state.store');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: IState): void => {
  try {
    const serializedState = JSON.stringify(state.store);
    localStorage.setItem('state.store', serializedState);
  } catch (err) {
  }
};
