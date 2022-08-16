import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setLevelOptions, setBoom, setWin, resetGame } from './levelSlice';
import LevelOption from './LevelOption';

import styles from './styles.module.scss';

export const LEVEL_OPTIONS = {
  easy: {
    level: 'easy',
    mines: 10,
    fieldsetDimension: 10,
  },
  medium: {
    level: 'medium',
    mines: 40,
    fieldsetDimension: 16,
  },
  hard: {
    level: 'hard',
    mines: 99,
    fieldsetDimension: 22,
  },
};

const gameLevels = ['easy', 'medium', 'hard'];

const LevelSelector = () => {
  const { level } = useSelector((state) => state.levelSettings.levelOptions);
  const dispatch = useDispatch();

  const selectLevelHandler = (e) => {
    dispatch(setLevelOptions(LEVEL_OPTIONS[e?.target?.value]));
    dispatch(setBoom(false));
    dispatch(setWin(false));
    dispatch(resetGame(true));
  };

  return (
    <select onChange={(e) => selectLevelHandler(e)} value={level} className={styles.select}>
      {gameLevels.map((level) => (
        <LevelOption key={level} level={level} />
      ))}
    </select>
  );
};

export default LevelSelector;
