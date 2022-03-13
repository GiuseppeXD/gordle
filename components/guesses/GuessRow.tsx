import styles from '../../styles/Guesses.module.scss';

import GuessItem from './GuessItem';

type Props = {
  guess: string,
  isRevealing?: boolean,
  isCompleted?: boolean,
  getGuessItemStatus?: (guess: string, letter: string) => string,
}

const defaultFunc = (_) => {
  return ''
}

export default function GuessRow({ guess, isRevealing, isCompleted, getGuessItemStatus = defaultFunc }: Props) {
  const split = guess.split('');
  return ( 
    <div className={styles.word}>
      {split.map((letter, index) => (
        <GuessItem
          key={index}
          letter={letter}
          position={index + 1}
          isRevealing={isRevealing}
          isCompleted={isCompleted}
          status={getGuessItemStatus(guess, letter)}
        />
      ))}
    </div>
  );
}