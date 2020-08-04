import Link from 'next/link'
import slugify from '@sindresorhus/slugify'

// Hooks
import useWishList from '../hooks/useWishList'

const Character = (props) => {
  const { character } = props
  const { toggle, wishlist } = useWishList()

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hi {character.name}!</h1>
      <button
        style={{
          background: `${wishlist.includes(character.id) ? '#000' : 'green'}`,
          color: '#fff'
        }}
        onClick={() => toggle(character.id)}
      >
        Favorito
      </button>
      <div style={{ marginTop: 10 }}>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character/')
  const json = await res.json()
  const allCharacter = json.results
  return {
    paths: allCharacter.map((character) => `/${slugify(character.name)}`),
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch('https://rickandmortyapi.com/api/character/')
  const json = await res.json()
  const data = await json.results
  const onlyCharacter = data.find(
    (character) => slugify(character.name) === slug
  )
  return {
    props: {
      character: onlyCharacter
    }
  }
}

export default Character
