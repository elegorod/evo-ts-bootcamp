import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import marsReducer from '../features/mars/marsSlice'

export const store = configureStore({
  reducer: {
    mars: marsReducer
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
