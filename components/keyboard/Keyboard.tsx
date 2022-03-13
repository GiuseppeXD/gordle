import { useEffect } from 'react'
import Key from './Key';

import styles from '../../styles/Keyboard.module.scss';

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  getKeyStatus: (value: string) => string
  isRevealing?: boolean
}

export default function Keyboard({ onChar, onDelete, onEnter, isRevealing, getKeyStatus }: Props) {
  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()

        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={getKeyStatus(key)}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className={styles.row}>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={getKeyStatus(key)}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className={styles.row}>
        <Key value="DELETE" onClick={onClick} />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={getKeyStatus(key)}
            isRevealing={isRevealing}
          />
        ))}
        <Key value="ENTER" onClick={onClick} />
      </div>
    </div>


  )
};