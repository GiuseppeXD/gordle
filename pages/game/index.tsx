import { useState, useEffect, } from 'react'
import Modal from 'react-modal';
import Link from 'next/link';
import Image from 'next/image'

import { ENGLISHWORDS, PORTUGUESEWORDS } from '../../constants/wordsList';
import { MAX_CHALLENGES, MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'
import { ToastContainer, toast } from 'react-toastify';

import Keyboard from '../../components/keyboard/Keyboard';
import Guesses from '../../components/guesses/Guesses';

import styles from '../../styles/Game.module.scss';
import modalStyles from '../../styles/Modal.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
  },
};

export default function Game() { 
  const [selectLanguageModalIsOpen, setSelectLanguageModalIsOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [words, setCurrentWords] = useState([]);
  const [word, setCurrentWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    console.log(words.length);
    if (words.length > 0) {
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }
  }, [words])

  function selectLanguage(language: string) {
    setSelectedLanguage(language);
    if (language === 'english') {
      setCurrentWords(ENGLISHWORDS);
    } else {
      setCurrentWords(PORTUGUESEWORDS);
    }
    setSelectLanguageModalIsOpen(false);
  }

  useEffect(() => {
    setIsGameStarted(true);
    setIsGameWon(false);
    setIsGameLost(false);
    setIsGameFinished(false);
    setGuesses([]);
    setCurrentGuess('');
    console.log('Started');
    console.log(word)
  }, [word])

  useEffect(() => {
  }, [isGameWon, isGameLost, isGameFinished])

  useEffect(() => {
    if (guesses.length == MAX_CHALLENGES) {
      setIsGameLost(true);
      setIsGameFinished(true);
    }
  }, [guesses])
  
  const getKeyStatus = (letter: string): string => {
    if (guesses.find(guess => guess.includes(letter))) {
      if (word.includes(letter.toLowerCase())) {
        return 'correct';
      }
      return 'incorrect';
    }
    return 'none';
  }

  const getGuessItemStatus = (guess: string, letter: string): string => {
    if (word.includes(letter.toLowerCase())) {
      if (guess.indexOf(letter) == word.indexOf(letter.toLowerCase())) {
        return 'correct';
      } else {
        return 'has-letter';
      }
    }
    return 'incorrect';
  }

  const onChar = (value: string) => {
    if (isGameFinished) {
      return;
    }

    if (currentGuess.length >= MAX_WORD_LENGTH) {
      return;
    }

    setCurrentGuess(currentGuess + value);
  }

  const onDelete = () => {
    if (isGameFinished) {
      return;
    }

    setCurrentGuess(currentGuess.slice(0, -1));
  }

  const onEnter = () => {
    if (isGameFinished) {
      return;
    }

    if (currentGuess.length != MAX_WORD_LENGTH) {
      toast.error("5 letters are required");
      return;
    }

    if (words.includes(currentGuess.toLowerCase())) {
      setIsRevealing(true);

      setTimeout(() => {
        setGuesses([...guesses, currentGuess]);
  
        setIsRevealing(false);
  
        if (currentGuess.toLowerCase() === word) {
          setCurrentGuess('');
          setIsGameWon(true);
          setIsGameFinished(true);
          return;
        }
  
        setCurrentGuess('');
  
      }, REVEAL_TIME_MS); 
    } else {
      toast.error("Word not found");
    }  
  }

  return (
    <div className={styles.container}>
      <Modal
        isOpen={selectLanguageModalIsOpen}
        style={customStyles}
        selectLanguage={selectLanguage}
        contentLabel="Select a language"
      >
        <div className={modalStyles.content}>
          <h2>Select a language to play</h2>
          <div className={modalStyles.options}>
            <button className={modalStyles.option} onClick={() => selectLanguage('english')}>
              <Image src="/flag_us.png" alt="Vercel Logo" width={70} height={50} />
              ENGLISH
            </button>
            <button className={modalStyles.option} onClick={() => selectLanguage('portuguese')}>
              <Image src="/flag_brazil.png" alt="Vercel Logo" width={70} height={50} />
              PORTUGUESE
            </button>
          </div>
        </div>
      </Modal>
      <div className={styles.header}>
        <h1>Gordle</h1>
      </div>
      <Guesses
        guesses={guesses}
        currentGuess={currentGuess}
        getGuessItemStatus={getGuessItemStatus}
        isRevealing={isRevealing}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        isRevealing={isRevealing}
        getKeyStatus={getKeyStatus}
      />
      <Modal
        isOpen={isGameFinished}
        style={customStyles}
        contentLabel="Finished"
      >
        <div className={modalStyles.content}>
          <h2>{ isGameWon ? selectedLanguage == 'english' ? 'Congratulations!' : 'Parabens!' : selectedLanguage == 'english' ? 'Defeated!' : 'Perdedor!'}</h2>
          <div className={modalStyles.finish}>
            { word }
            { selectedLanguage == 'english' ? (
              <Image src="/flag_us.png" alt="Vercel Logo" width={70} height={50} />
            ): (
              <Image src="/flag_brazil.png" alt="Vercel Logo" width={70} height={50} />
            )}
          </div>
        </div>
      </Modal>
      <ToastContainer theme="dark" />
      
    </div>
  )
};