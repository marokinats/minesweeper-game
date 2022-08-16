import React from 'react';

import BoardNav from '../BoardNav';
import Fieldset from '../Fieldset';
import Notice from '../Notice';

import styles from './styles.module.scss';

const Board = () => {
  return (
    <div className={styles.board}>
      <BoardNav />
      <Fieldset />
      <Notice />
    </div>
  );
};

export default Board;
