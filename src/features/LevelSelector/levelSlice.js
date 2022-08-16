import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levelOptions: {
    level: 'easy',
    mines: 10,
    fieldsetDimension: 10,
  },
  boom: false,
  win: false,
  reset: true,
};

export const levelSlice = createSlice({
  name: 'levelSettings',
  initialState,
  reducers: {
    setLevelOptions: (state, action) => {
      const { level, mines, fieldsetDimension } = action.payload;
      state.levelOptions.level = level;
      state.levelOptions.mines = mines;
      state.levelOptions.fieldsetDimension = fieldsetDimension;
    },
    setBoom: (state, action) => {
      state.boom = action.payload;
    },
    setWin: (state, action) => {
      state.win = action.payload;
    },
    resetGame: (state, action) => {
      state.reset = action.payload;
    },
  },
});

export const { setLevelOptions, setBoom, setWin, resetGame } = levelSlice.actions;

export default levelSlice.reducer;
