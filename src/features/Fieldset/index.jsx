import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFields, getSiblingsIndexes } from './utils';

import { resetGame, setWin } from '../LevelSelector/levelSlice';
import { setFields, setMinesIndexes, resetIndexes } from './fieldsetSlice';
import Field from './Field';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';

let cx = classNames.bind(styles);

const Fieldset = () => {
  const { levelOptions, reset } = useSelector((state) => state.levelSettings);
  const { level, mines, fieldsetDimension } = levelOptions;
  const { fieldset, minesIndexes, openedIndexes } = useSelector((state) => state.fields);
  const dispatch = useDispatch();

  const className = cx({
    fieldset: true,
    [level]: true,
  });

  const randomMines = useCallback(() => {
    const max = Math.floor(Math.pow(fieldsetDimension, 2) - 1);
    let randomMines = [];

    for (let index = 0; index < mines; index++) {
      const randomInt = Math.floor(Math.random() * (max + 1));

      if (!randomMines.includes(randomInt)) {
        randomMines.push(randomInt);
      } else {
        index--;
      }
    }

    dispatch(setMinesIndexes(randomMines));

    return randomMines;
  }, [dispatch, mines, fieldsetDimension]);

  const getFieldset = useCallback(() => {
    const fields = getFields(fieldsetDimension);
    const minesArray = randomMines();

    let fieldsWithNumbers = [];

    minesArray.forEach((el) => {
      fields[el].mine = true;

      fieldsWithNumbers.push(...getSiblingsIndexes(fields[el], fieldsetDimension));
    });

    fieldsWithNumbers.forEach((el) => {
      if (!fields[el].mine) {
        fields[el].number = fields[el].number + 1;
      } else {
        fields[el].number = null;
      }
    });

    dispatch(setFields(fields));

    return fields;
  }, [fieldsetDimension, randomMines, dispatch]);

  useEffect(() => {
    if (Math.pow(fieldsetDimension, 2) - openedIndexes.length === minesIndexes.length) {
      dispatch(setWin(true));
    }
  }, [dispatch, fieldsetDimension, openedIndexes, minesIndexes]);

  useEffect(() => {
    if (!reset) return;

    dispatch(resetGame(false));
    dispatch(resetIndexes());
    getFieldset();
  }, [getFieldset, dispatch, reset]);

  return (
    <div className={className}>
      {fieldset.map((field) => (
        <Field
          key={field.index}
          index={field.index}
          mine={field.mine}
          number={field.number}
          numberValue={field.numberValue}
          flagged={field.flagged}
          explored={field.explored}
          opened={field.opened}
        />
      ))}
    </div>
  );
};

export default Fieldset;
