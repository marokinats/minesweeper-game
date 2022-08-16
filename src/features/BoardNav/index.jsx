import React from 'react';
import { FaBomb } from 'react-icons/fa';

import LevelSelector from '../LevelSelector';
import FlagCounter from '../FlagCounter';

import styles from './styles.module.scss';

const BoardNav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.icon}><FaBomb /></div>
      <LevelSelector />
      <FlagCounter />
    </nav>
  );
};

export default BoardNav;
