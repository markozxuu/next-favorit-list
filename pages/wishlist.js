import useWishList from '../hooks/useWishList';
import Link from 'next/link';

const WishList = (props) => {
    const { allCharacter } = props;
    const { wishlist, removeWishList } = useWishList();
    // new array matching the wishlist ID
    const res = wishlist.map((id) => allCharacter.find((item) => item.id === id));
    return (
        <>
          <h1>Tu {wishlist.length ? 'wishlist' : 'wishlist esta vacio'}</h1>
          {res.map((item) => (
            <div key={item.id}>
            <p>{item.name}</p>
            <button onClick={() => removeWishList(item.id)}>Remove wishlist</button>
          </div>
          ))}
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </>
    );
}

export const getStaticProps = async () => {
  const res = await fetch('https://rickandmortyapi.com/api/character/')
  const json = await res.json()
  const data = json.results
  return {
    props: {
      allCharacter: data
    }
  }
}

export default WishList;
