import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setBoom, setWin, resetGame } from '../LevelSelector/levelSlice';

import styles from './styles.module.scss';

const MESSAGES = {
  win: {
    easy: 'You are doing good!',
    medium: 'Amazing!!!',
    hard: 'Das ist fantastisch!!!!!',
  },
  boom: {
    easy: 'Oops... You lose.',
    medium: 'Oops... Need more practice.',
    hard: 'Oops... But it was great battle.',
  },
};

const Notice = () => {
  const { boom, win, levelOptions } = useSelector((state) => state.levelSettings);
  const { level } = levelOptions;
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const showPopupHandler = useCallback(() => {
    if (!popupRef) return;

    if (!win && !boom) {
      popupRef.current.style.display = 'none';
    } else {
      setTimeout(() => {
        popupRef.current.style.display = 'flex';
      }, 2000);
    }
  }, [win, boom]);

  const tryButtonHandler = () => {
    dispatch(setBoom(false));
    dispatch(setWin(false));
    dispatch(resetGame(true));
  };

  const noticeContent = useMemo(() => {
    if (win) {
      return <div>{MESSAGES.win[level]}</div>;
    }
    if (boom) {
      return <div>{MESSAGES.boom[level]}</div>;
    }
  }, [win, boom, level]);

  useEffect(() => {
    showPopupHandler();
  }, [showPopupHandler]);

  return (
    <div ref={popupRef} className={styles.notice}>
      {noticeContent}
      <button type="button" className={styles.button} onClick={tryButtonHandler}>
        Try again
      </button>
    </div>
  );
};

export default Notice;
