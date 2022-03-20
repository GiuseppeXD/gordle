import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings';
import Image from 'next/image'

import styles from '../../styles/Keyboard.module.scss';

type Props = {
  value: string
  width?: number
  status?: string
  onClick: (value: string) => void
  isRevealing?: boolean
}


export default function Key({ value, onClick, status, isRevealing }: Props) {
  const stylesDelay = {
    transitionDelay: isRevealing ? `${REVEAL_TIME_MS}ms` : 'unset',
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button style={stylesDelay} className={`${styles[status]} ${styles.letter}`} onClick={handleClick}>
      {value != 'DELETE' && value != 'ENTER' ? (value) :
      (<Image src={`/${value.toLowerCase()}.svg`} alt={`/${value.toLowerCase()} image`} width={10} height={10} />)
      }
    </button>
  )
}