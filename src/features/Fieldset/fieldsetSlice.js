import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fieldset: [],
  minesIndexes: [],
  openedIndexes: [],
  flags: 0,
};

export const fieldsetSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    setFields: (state, action) => {
      state.fieldset = [...action.payload];
    },
    setFlag: (state, action) => {
      const index = action.payload;
      state.fieldset[index].flagged = !state.fieldset[index].flagged;
      if (state.fieldset[index].flagged) {
        state.flags = state.flags + 1;
      }
      else {
        state.flags = state.flags - 1;
      }
    },
    setOpened: (state, action) => {
      const index = action.payload;
      state.fieldset[index].opened = true;
      if (!state.openedIndexes.includes(index)) {
        state.openedIndexes = [...state.openedIndexes, index];
      }
    },
    setExplored: (state, action) => {
      const index = action.payload;
      state.fieldset[index].explored = true;
    },
    setMinesIndexes: (state, action) => {
      state.minesIndexes = [...action.payload];
    },
    resetIndexes: (state) => {
      state.openedIndexes = [];
      state.minesIndexes = [];
      state.flags = 0;
    },
  },
});

export const { setFields, setFlag, setOpened, setExplored, setMinesIndexes, resetIndexes } =
  fieldsetSlice.actions;

export default fieldsetSlice.reducer;
