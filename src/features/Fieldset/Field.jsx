import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FcVlc } from 'react-icons/fc';
import { FaBomb } from 'react-icons/fa';

import { getSiblingsIndexes } from './utils';
import { setBoom } from '../LevelSelector/levelSlice';

import { setFlag, setOpened, setExplored } from './fieldsetSlice';

import classNames from 'classnames';
import styles from './styles.module.scss';

const Field = ({ index, mine, number, flagged, explored, opened }) => {
  const { fieldset, minesIndexes, flags } = useSelector((state) => state.fields);
  const { levelOptions, boom } = useSelector((state) => state.levelSettings);
  const { fieldsetDimension } = levelOptions;

  const dispatch = useDispatch();

  const flagHandler = (e, index) => {
    e.preventDefault();

    if (boom || opened || explored) return;
    if (flags >= minesIndexes.length && !flagged) return;

    dispatch(setFlag(index));
  };

  const emptyFieldHandler = () => {
    let checkedSiblings = [];

    const checkSiblings = (index) => {
      checkedSiblings.push(index);

      const siblingsIndexes = getSiblingsIndexes(fieldset[index], fieldsetDimension);

      siblingsIndexes.forEach((i) => {
        if (fieldset[i].mine || fieldset[index].flagged || fieldset[index].opened) return;
        dispatch(setOpened(i));
        if (!checkedSiblings.includes(i) && fieldset[i].number === 0) {
          return checkSiblings(i);
        }
      });
    };

    checkSiblings(index);
  };

  const fieldHandler = () => {
    if (boom) return;
    if (flagged || opened) return;

    if (mine) {
      dispatch(setExplored(index));
      dispatch(setBoom(true));

      minesIndexes.forEach((element) => {
        setTimeout(() => {
          dispatch(setExplored(element));
        }, 1000);
      });
      return;
    }
    dispatch(setOpened(index));

    if (number !== 0) return;

    emptyFieldHandler();
  };

  return (
    <button
      onContextMenu={(e) => flagHandler(e, index)}
      onClick={fieldHandler}
      type="button"
      className={classNames(styles.field, {
        [styles.fieldMine]: mine && explored,
        [styles.fieldFlag]: flagged,
        [styles.fieldNumber]: opened,
      })}
    >
      {flagged && <FcVlc />}
      {number > 0 && opened && <span>{number}</span>}
      {explored && !flagged && <FaBomb />}
    </button>
  );
};

export default Field;
