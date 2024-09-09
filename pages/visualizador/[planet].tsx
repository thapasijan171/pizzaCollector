import dynamic from 'next/dynamic'

const ExperienceThree = dynamic(
  () => import('../../components/Three/Planets/Experience'),
  {
    // suspense: true,
    ssr: false,
  }
)

const ExperienceGalaxy = dynamic(
  () => import('../../components/Three/Galaxy/Galaxy'),
  {
    ssr: false,
  }
)

type PlanetType = {
  title: string
  image: string
  link: string
}

type PlanetName = {
  name: string
}

export default function Planet({ name }: PlanetName) {
  return (
    <div className="Experience_container">
      {name === 'galaxia' ? (
        <ExperienceGalaxy />
      ) : (
        <ExperienceThree title={name} />
      )}
    </div>
  )
}

export async function getStaticPaths() {
  try {
    const planets: Array<PlanetType> = [
      {
        title: 'Sol',
        image: './',
        link: '/visualizador/sol',
      },
      {
        title: 'Mercurio',
        image: './',
        link: '/visualizador/mercurio',
      },
      {
        title: 'Venus',
        image: './',
        link: '/visualizador/venus',
      },
      {
        title: 'Tierra',
        image: './',
        link: '/visualizador/tierra',
      },
      {
        title: 'Marte',
        image: './',
        link: '/visualizador/marte',
      },
      {
        title: 'Jupiter',
        image: './',
        link: '/visualizador/jupiter',
      },
      {
        title: 'Saturno',
        image: './',
        link: '/visualizador/saturno',
      },
      {
        title: 'Urano',
        image: './',
        link: '/visualizador/urano',
      },
      {
        title: 'Neptuno',
        image: './',
        link: '/visualizador/neptuno',
      },
      {
        title: 'Galaxia',
        image: './',
        link: '/visualizador/galaxia',
      },
      {
        title: 'Sistema_Solar',
        image: './',
        link: '/visualizador/sistema_solar',
      },
    ]
    const paths = planets.map((card) => ({
      params: { planet: `${card.title.toLocaleLowerCase()}` },
    }))
    console.log(paths)
    return {
      paths,
      fallback: false,
    }
  } catch (error) {
    console.log(error)
  }
}

type Params = {
  params: {
    planet: string
  }
}

export const getStaticProps = ({ params }: Params) => {
  return {
    props: {
      name: params.planet,
    },
  }
}
