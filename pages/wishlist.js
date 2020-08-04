import { useState ,useEffect } from 'react';
import useWishlist from '../hooks/useWishList';
import Link from 'next/link';

const WishList = () => {
    const [wishlist, setItem] = useState([]);
    const { removeWishlist } = useWishlist();
    useEffect(() => {
      if (localStorage.getItem('wishlist')) {
        const wishData = JSON.parse(localStorage.getItem('wishlist'));
        const onlyFavorites = wishData.filter((item) => item.isFavorite === true);
        setItem(onlyFavorites);
      }
    }, []);
    console.log(wishlist);
    return (
        <>
          <h1>Tu {wishlist.length ? 'wishlist' : 'wishlist esta vacio'}</h1>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
          {wishlist.map(({ id, name }) => (
            <div key={id}>
              <p>{name}</p>
              <button onClick={() => removeWishlist(id, wishlist, setItem)}>Remove wishlist</button>
            </div>
          ))}
        </>
    );
}

export default WishList;
