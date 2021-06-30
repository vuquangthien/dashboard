import { createSelector } from 'reselect';

const initialState = {
  configTheme: {
    bgColorBlockDetailBodyNumber1: 'black',
  },
};

const selectors = state => state.adminPage || initialState;

const makeSelectViewConfig = () =>
  createSelector(
    selectors,
    state => state.configTheme,
  );

const makeSelectCurrentUser = () =>
  createSelector(
    selectors,
    state => state.currentUser,
  );

export { makeSelectViewConfig, makeSelectCurrentUser };
