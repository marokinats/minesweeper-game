import { configureStore } from '@reduxjs/toolkit';
import levelSlice from '../features/LevelSelector/levelSlice';
import fieldsetSlice from '../features/Fieldset/fieldsetSlice';

export const store = configureStore({
  reducer: {
    levelSettings: levelSlice,
    fields: fieldsetSlice,
  },
});
