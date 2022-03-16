import styles from '../../styles/Guesses.module.scss';
import { MAX_CHALLENGES } from '../../constants/settings';

import GuessRow from './GuessRow';

type Props = {
  guesses: string[],
  currentGuess: string,
  isRevealing?: boolean,
  getGuessItemStatus: (guess: string, letter: string, position: number) => string,
}

export default function Guesses({ guesses, currentGuess, isRevealing, getGuessItemStatus }: Props) {
  function FilledGuess(): string {
    return currentGuess + '#####'.substring(0, 5 - currentGuess.length);
  }

  function emptyGuesses(): string[] {
    let size = MAX_CHALLENGES - guesses.length - 1;
    return size > 0 ? Array(size).fill('#####') : [];
  }

  return ( 
    <div className={styles.container}>
      {guesses.map((guess, index) => (
        <GuessRow
          key={index}
          guess={guess}
          isRevealing={isRevealing}
          isCompleted={true}
          getGuessItemStatus={getGuessItemStatus}
        />
      ))}
      { guesses.length < MAX_CHALLENGES && (
        <GuessRow
          guess={FilledGuess()}
          isRevealing={isRevealing}
          isCompleted={isRevealing}
          getGuessItemStatus={getGuessItemStatus}
          />
      )}
      {emptyGuesses().map((guess, index) => (
        <GuessRow
          key={index}
          guess={guess}
          isRevealing={false}
          isCompleted={false}
        />
      ))}
    </div>
  );
}