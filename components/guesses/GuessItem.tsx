import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings';

import styles from '../../styles/Guesses.module.scss';


type Props = {
  letter: string,
  position: number,
  status?: string,
  isRevealing?: boolean,
  isCompleted?: boolean,
}

export default function GuessItem({ letter, position, status, isRevealing, isCompleted }: Props) {
  const shouldReveal = isRevealing || isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const transitionDuration = isRevealing ? `${position * REVEAL_TIME_MS}ms` : '0ms';

  const classes = classnames(
    {
      'correct': status == 'correct' && shouldReveal,
      'incorrect': status == 'incorrect' && shouldReveal,
      'has-letter': status == 'has-letter' && shouldReveal,
    }
  );

  return ( 
    <div style={{ animationDelay, transitionDuration }} className={`${styles.letter} ${styles[classes]}`}>
      { letter != '#' ? letter : ' '}
    </div>
  );
}