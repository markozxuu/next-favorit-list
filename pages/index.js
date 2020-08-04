import Link from 'next/link'
import slugify from '@sindresorhus/slugify'
import useWishlist from '../hooks/useWishList'
const Index = (props) => {
  const { allCharacter } = props
  const { wishlist, toggle } = useWishlist()

  return (
    <>
      <h1>Lista de personajes</h1>
      <Link href="/wishlist">
        <a>wishlist - {wishlist.length}</a>
      </Link>
      {allCharacter.map((item) => {
          console.log(item)
        return (
          <div key={item.id} style={{ textAlign: 'center' }}>
            <Link href="/[slug]" as={`/${slugify(item.name)}`}>
              <a>{item.name}</a>
            </Link>
            <br />
            <button
              style={{
                background: `${wishlist.includes(item.id) ? '#000' : 'green'}`,
                color: '#fff'
              }}
              onClick={() => toggle(item.id)}
            >
              Favorito
            </button>
          </div>
        )
      })}
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character/')
  const json = await res.json()
  const data = json.results
  data.map((item) => {
    item.isFavorite = false
    return item
  })
  return {
    props: {
      allCharacter: data
    }
  }
}
export default Index
