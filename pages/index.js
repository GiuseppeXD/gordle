import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Game from './game/index'

export default function Home() {
  return (
    <Game />
  )
}
