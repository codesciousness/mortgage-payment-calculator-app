import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loansReducer from '../loansSlice';

export const store = configureStore({
  reducer: {
    loans: loansReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
