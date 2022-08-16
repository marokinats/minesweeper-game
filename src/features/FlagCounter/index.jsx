import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FcVlc } from 'react-icons/fc';

import styles from './styles.module.scss';

const FlagCounter = () => {
  const { minesIndexes, flags } = useSelector((state) => state.fields);

  const counterNumber = useMemo(() => {
    return minesIndexes.length - flags;
  }, [minesIndexes, flags]);

  return (
    <div className={styles.flagCounter}>
      <div className={styles.icon}>
        <FcVlc />
      </div>
      <div className={styles.number}>{counterNumber}</div>
    </div>
  );
};

export default FlagCounter;
