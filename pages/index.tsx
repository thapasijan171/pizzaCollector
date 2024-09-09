import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Link from 'next/link'

type CardType = {
  title: string
  image: string
  link: string
}

export default function Home() {
  const [cards, setCards] = useState<Array<CardType>>([
    {
      title: 'Sun',
      image: './images/sun.svg',
      link: '/visualizador/sol',
    },
    {
      title: 'Mercury',
      image: './images/mercury.svg',
      link: '/visualizador/mercurio',
    },
    {
      title: 'Venus',
      image: './images/venus.svg',
      link: '/visualizador/venus',
    },
    {
      title: 'Earth',
      image: './images/earth.svg',
      link: '/visualizador/tierra',
    },
    {
      title: 'Mars',
      image: './images/mars.svg',
      link: '/visualizador/marte',
    },
    {
      title: 'Jupiter',
      image: './images/jupiter.svg',
      link: '/visualizador/jupiter',
    },
    {
      title: 'Saturn',
      image: './images/saturn.svg',
      link: '/visualizador/saturno',
    },
    {
      title: 'Uranus',
      image: './images/uranus.svg',
      link: '/visualizador/urano',
    },
    {
      title: 'Neptune',
      image: './images/neptune.svg',
      link: '/visualizador/neptuno',
    },
    {
      title: 'Galaxys',
      image: './images/galaxys.png',
      link: '/visualizador/galaxia',
    },
    {
      title: 'Solar_system',
      image: './images/solar_system.svg',
      link: '/visualizador/sistema_solar',
    },
  ])
  return (
    <div className="container card_container">
      <div className="wrapper">
        <div className="card_title_container">
          <h1 className="planet_title">Made by </h1>
          <p className="planet_subtitle">Sijan Thapa</p>
        </div>
        <ul className="cards_container">
          {cards.map((card: CardType, index: number) => (
            <li key={index} className="card">
              <div className="card_image">
                <img src={card.image} alt={card.title} />
              </div>
              <p className="card_title">{card.title}</p>
              <Link href={`${card.link}`}>
                <button className="card_button">Visit</button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="footer">
        </div>
      </div>
    </div>
  )
}
